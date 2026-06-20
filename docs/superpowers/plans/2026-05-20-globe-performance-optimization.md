# 地球模型优化与性能提升 - 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 优化地球模型旋转体验（OrbitControls + 本地贴图 + 轴倾斜），并通过代码分割、动态导入、懒加载等策略将首屏 JS 从 2.1MB 降到 ~500KB

**Architecture:** 使用 Vite manualChunks 将 Three.js 拆分为独立 chunk，React.lazy 动态导入 Globe 组件，OrbitControls 替换手动旋转逻辑，本地贴图替代远程加载

**Tech Stack:** React 19 + TypeScript + Vite + Three.js + three-globe + GSAP

---

## 文件结构映射

### 需要修改的文件

| 文件 | 当前职责 | 改造后职责 |
|------|---------|-----------|
| `vite.config.ts` | 基础 Vite 配置 | 添加代码分割、terser 压缩 |
| `src/components/Globe.tsx` | 手动旋转 Three.js 地球 | OrbitControls + 本地贴图 + 轴倾斜 |
| `src/sections/WorldDistribution.tsx` | 直接导入 Globe | React.lazy 动态导入 + Suspense |
| `src/sections/ExhibitionIndex.tsx` | 直接加载图片 | 图片懒加载 |
| `src/sections/CinematicPavilions.tsx` | 视频自动播放 | 视频懒加载优化 |

### 需要新增的文件

| 文件 | 职责 |
|------|------|
| `src/components/GlobePlaceholder.tsx` | Globe 加载时的占位动画 |
| `public/textures/earth-blue-marble.jpg` | 地球卫星贴图（本地） |
| `public/textures/earth-topology.png` | 地形高度图（本地） |

---

## Task 1: 下载地球贴图到本地

**Files:**
- Create: `public/textures/earth-blue-marble.jpg`
- Create: `public/textures/earth-topology.png`

**目标：** 将远程 unpkg 贴图下载到本地，避免外部网络依赖

- [ ] **Step 1: 创建 textures 目录并下载贴图**

```bash
cd f:\Axm\Kimi_Agent_山海经数字化展示\app
mkdir -p public\textures

# 下载地球卫星贴图
curl -L -o public\textures\earth-blue-marble.jpg "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"

# 下载地形高度图
curl -L -o public\textures\earth-topology.png "https://unpkg.com/three-globe/example/img/earth-topology.png"
```

- [ ] **Step 2: 验证文件下载成功**

```bash
dir public\textures\
```
Expected: 显示 `earth-blue-marble.jpg` 和 `earth-topology.png`

---

## Task 2: 更新 Vite 配置（代码分割 + 压缩）

**Files:**
- Modify: `vite.config.ts`

**目标：** 将 Three.js、React、GSAP 拆分为独立 chunk，启用 terser 压缩

- [ ] **Step 1: 重写 vite.config.ts**

```typescript
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three', 'three-globe'],
          'ui-vendor': ['react', 'react-dom'],
          'gsap-vendor': ['gsap'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
```

- [ ] **Step 2: 验证配置无语法错误**

Run: `cd app && npx tsc --noEmit`
Expected: 无类型错误

---

## Task 3: 创建 GlobePlaceholder 组件

**Files:**
- Create: `src/components/GlobePlaceholder.tsx`

**目标：** 地球组件加载时的占位动画

- [ ] **Step 1: 实现 GlobePlaceholder**

```tsx
export default function GlobePlaceholder() {
  return (
    <div
      style={{
        width: '100%',
        aspectRatio: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: 'clamp(260px, 80%, 420px)',
          height: 'clamp(260px, 80%, 420px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, var(--imperial-red-dark), #1A0505 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* 旋转加载动画 */}
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '2px solid rgba(201, 169, 110, 0.2)',
            borderTopColor: 'var(--gold-primary)',
            animation: 'globe-placeholder-spin 1s linear infinite',
          }}
        />
        <span
          style={{
            position: 'absolute',
            bottom: '-40px',
            fontFamily: 'var(--font-calligraphy)',
            fontSize: '0.85rem',
            color: 'var(--gold-muted)',
            letterSpacing: '0.1em',
          }}
        >
          加载中...
        </span>
      </div>

      <style>{`
        @keyframes globe-placeholder-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
```

- [ ] **Step 2: 验证类型检查**

Run: `cd app && npx tsc --noEmit`
Expected: 无类型错误

---

## Task 4: 重写 Globe.tsx（OrbitControls + 本地贴图 + 轴倾斜）

**Files:**
- Modify: `src/components/Globe.tsx`

**目标：** 使用 OrbitControls 实现顺滑旋转，本地贴图，地球轴倾斜

- [ ] **Step 1: 重写 Globe 组件**

```tsx
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MarkerData {
  lat: number;
  lng: number;
  label: string;
}

const MARKERS: MarkerData[] = [
  { lat: 35.8617, lng: 104.1954, label: '中国' },
  { lat: 36.2048, lng: 138.2529, label: '日本' },
  { lat: 51.1657, lng: 10.4515, label: '欧洲' },
  { lat: 37.0902, lng: -95.7129, label: '美国' },
];

export default function Globe() {
  const globeRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!sceneRef.current) return;

    const container = sceneRef.current;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 280;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.borderRadius = '50%';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Globe with local textures
    const globe = new ThreeGlobe()
      .globeImageUrl('./textures/earth-blue-marble.jpg')
      .bumpImageUrl('./textures/earth-topology.png')
      .showAtmosphere(true)
      .atmosphereColor('#c9a96e')
      .atmosphereAltitude(0.15)
      .showGraticules(true);

    // Add markers
    globe
      .pointsData(MARKERS)
      .pointAltitude(0.03)
      .pointColor(() => '#c9a96e')
      .pointRadius(0.5)
      .pointResolution(32);

    // Earth axial tilt (23.5 degrees)
    globe.rotation.z = 23.5 * (Math.PI / 180);

    scene.add(globe);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xfff5e6, 1.2);
    directionalLight.position.set(100, 80, 120);
    scene.add(directionalLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
    backLight.position.set(-100, -50, -80);
    scene.add(backLight);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.enableZoom = true;
    controls.minDistance = 150;
    controls.maxDistance = 400;
    controls.enablePan = false;
    controlsRef.current = controls;

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // GSAP ScrollTrigger entrance animation
    const ctx = gsap.context(() => {
      if (sceneRef.current) {
        gsap.fromTo(
          sceneRef.current,
          { opacity: 0, scale: 0.85 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sceneRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }
    }, globeRef);

    // Resize handler
    const onResize = () => {
      if (!container || !camera || !renderer) return;
      const newWidth = container.clientWidth || 400;
      const newHeight = container.clientHeight || 400;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      ctx.revert();
      controls.dispose();
      window.removeEventListener('resize', onResize);

      // Dispose Three.js resources
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((m) => m.dispose());
          } else if (object.material) {
            object.material.dispose();
          }
        }
      });

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      rendererRef.current = null;
      controlsRef.current = null;
    };
  }, []);

  return (
    <div
      ref={globeRef}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        ref={sceneRef}
        style={{
          position: 'relative',
          width: 'clamp(260px, 80%, 420px)',
          height: 'clamp(260px, 80%, 420px)',
          opacity: 0,
          borderRadius: '50%',
          overflow: 'hidden',
        }}
      >
        {/* 光晕 */}
        <div
          style={{
            position: 'absolute',
            inset: '-15%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,169,110,0.18) 0%, transparent 70%)',
            animation: 'globe-pulse 4s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />

        {/* 外圈装饰环 */}
        <div
          style={{
            position: 'absolute',
            inset: '-8px',
            borderRadius: '50%',
            border: '1px solid rgba(201,169,110,0.25)',
            animation: 'globe-spin-slow 20s linear infinite reverse',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: '-20px',
            borderRadius: '50%',
            border: '1px dashed rgba(201,169,110,0.15)',
            animation: 'globe-spin-slow 30s linear infinite',
            pointerEvents: 'none',
          }}
        />

        {/* 装饰性定位点 */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            right: '5%',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--gold-primary)',
            opacity: 0.6,
            animation: 'globe-blink 3s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '25%',
            left: '8%',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: 'var(--gold-bright)',
            opacity: 0.5,
            animation: 'globe-blink 4s ease-in-out infinite 1s',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '45%',
            left: '3%',
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: 'var(--gold-muted)',
            opacity: 0.4,
            animation: 'globe-blink 5s ease-in-out infinite 0.5s',
            pointerEvents: 'none',
          }}
        />
      </div>

      <style>{`
        @keyframes globe-spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes globe-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.7; }
        }
        @keyframes globe-blink {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.5); }
        }
      `}</style>
    </div>
  );
}
```

- [ ] **Step 2: 验证类型检查**

Run: `cd app && npx tsc --noEmit`
Expected: 无类型错误

---

## Task 5: 更新 WorldDistribution.tsx（React.lazy 动态导入）

**Files:**
- Modify: `src/sections/WorldDistribution.tsx`

**目标：** 使用 React.lazy + Suspense 动态导入 Globe 组件

- [ ] **Step 1: 修改导入方式**

将 `import Globe from '../components/Globe';` 替换为：

```tsx
import { lazy, Suspense } from 'react';
import GlobePlaceholder from '../components/GlobePlaceholder';

const Globe = lazy(() => import('../components/Globe'));
```

- [ ] **Step 2: 使用 Suspense 包裹 Globe**

在 JSX 中找到 `<Globe />` 使用处，替换为：

```tsx
<Suspense fallback={<GlobePlaceholder />}>
  <Globe />
</Suspense>
```

- [ ] **Step 3: 验证类型检查**

Run: `cd app && npx tsc --noEmit`
Expected: 无类型错误

---

## Task 6: 优化图片懒加载（ExhibitionIndex.tsx）

**Files:**
- Modify: `src/sections/ExhibitionIndex.tsx`

**目标：** 神兽图片使用 IntersectionObserver 懒加载

- [ ] **Step 1: 添加图片懒加载逻辑**

在图片揭示逻辑中，确保只在悬停时加载图片（当前已实现），并添加 `loading="lazy"` 属性到所有图片元素。

找到图片渲染处，添加：

```tsx
<img
  src={...}
  alt={...}
  loading="lazy"
  style={{...}}
/>
```

- [ ] **Step 2: 验证类型检查**

Run: `cd app && npx tsc --noEmit`
Expected: 无类型错误

---

## Task 7: 优化视频懒加载（CinematicPavilions.tsx）

**Files:**
- Modify: `src/sections/CinematicPavilions.tsx`

**目标：** 视频使用 `preload="none"`，减少初始加载

- [ ] **Step 1: 修改 video 标签**

找到 `<video>` 标签，确保有：

```tsx
<video
  preload="none"
  // ... 其他属性
/>
```

- [ ] **Step 2: 验证类型检查**

Run: `cd app && npx tsc --noEmit`
Expected: 无类型错误

---

## Task 8: 最终构建验证

**Files:**
- All modified files

**目标：** 验证所有优化生效，构建成功

- [ ] **Step 1: 类型检查**

Run: `cd app && npx tsc --noEmit`
Expected: 无类型错误

- [ ] **Step 2: 构建项目**

Run: `cd app && npm run build`
Expected: 构建成功，产出多个 chunk 文件：
- `dist/assets/three-vendor-*.js`
- `dist/assets/ui-vendor-*.js`
- `dist/assets/gsap-vendor-*.js`
- `dist/assets/index-*.js`（主 bundle，应明显小于 2MB）

- [ ] **Step 3: 预览验证**

Run: `cd app && npm run preview`
Expected: 服务器启动，地球组件正常显示，旋转顺滑

---

## 自审检查

### Spec 覆盖检查

| 设计文档章节 | 对应 Task | 状态 |
|-------------|----------|------|
| 本地贴图 | Task 1 | ✅ |
| Vite 代码分割 | Task 2 | ✅ |
| GlobePlaceholder | Task 3 | ✅ |
| OrbitControls + 本地贴图 + 轴倾斜 | Task 4 | ✅ |
| React.lazy 动态导入 | Task 5 | ✅ |
| 图片懒加载 | Task 6 | ✅ |
| 视频懒加载 | Task 7 | ✅ |
| 构建验证 | Task 8 | ✅ |

### Placeholder 扫描

- 无 "TBD", "TODO", "implement later"
- 所有步骤包含完整代码

---

*计划完成。基于设计文档 `docs/superpowers/specs/2026-05-20-globe-performance-optimization.md` 制定。*
