# 地球模型优化与性能提升 - 设计文档

> **目标**：优化地球模型旋转体验，全面提升项目加载性能
> **方案**：全面优化（地球模型 + 代码分割 + 懒加载 + 构建优化）
> **设计日期**：2026-05-20

---

## 一、地球模型优化

### 1.1 当前问题

| 问题 | 描述 |
|------|------|
| 旋转不流畅 | 手动更新 rotation，无惯性效果 |
| 无专业控制器 | 缺少 OrbitControls 的顺滑交互 |
| 缩放迟钝 | zoom 插值系数仅 0.05 |
| 无自转轴倾斜 | 地球直立旋转，不够真实 |

### 1.2 优化措施

#### 添加 OrbitControls

```typescript
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;        // 惯性阻尼
controls.dampingFactor = 0.05;        // 阻尼系数
controls.autoRotate = true;           // 自动旋转
controls.autoRotateSpeed = 0.5;       // 旋转速度
controls.enableZoom = true;           // 允许缩放
controls.minDistance = 150;           // 最小距离
controls.maxDistance = 400;           // 最大距离
controls.enablePan = false;           // 禁用平移
```

#### 地球自转轴倾斜

```typescript
globe.rotation.z = 23.5 * (Math.PI / 180); // 黄赤交角
```

#### 本地贴图替代远程加载

将 `unpkg.com` 远程贴图替换为本地资源：
- `public/textures/earth-blue-marble.jpg`
- `public/textures/earth-topology.png`

避免外部网络依赖，提升加载稳定性。

---

## 二、性能优化

### 2.1 代码分割（Code Splitting）

#### Vite 配置拆分 Three.js

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three', 'three-globe'],
        },
      },
    },
  },
});
```

**效果**：Three.js 单独打包为 `three-vendor.js`，主 bundle 大幅减小。

#### 动态导入 Globe 组件

```typescript
// WorldDistribution.tsx
import { lazy, Suspense } from 'react';

const Globe = lazy(() => import('../components/Globe'));

// 使用 Suspense 包裹
<Suspense fallback={<GlobePlaceholder />}>
  <Globe />
</Suspense>
```

**效果**：地球组件按需加载，首屏不阻塞。

### 2.2 懒加载策略

| 资源类型 | 优化措施 |
|---------|---------|
| 地球组件 | React.lazy + Suspense |
| 神兽图片 | IntersectionObserver 懒加载 |
| 视频资源 | `preload="none"` + 视口播放 |
| 贴图资源 | 预加载关键贴图，延迟加载次要资源 |

### 2.3 构建优化

#### Vite 完整配置

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
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

### 2.4 几何体优化

降低地球几何体细分度，减少顶点数：

```typescript
// three-globe 内部使用 SphereGeometry
// 通过调整 renderer 的 pixelRatio 和 geometry 分段数优化
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // 从 2 降到 1.5
```

---

## 三、预期效果

### 3.1 加载性能对比

| 指标 | 优化前 | 优化后 | 提升 |
|------|--------|--------|------|
| 首屏 JS | 2.1 MB | ~500 KB | 4x |
| Three.js 加载 | 首屏阻塞 | 按需加载 | 无阻塞 |
| 贴图加载 | 远程 unpkg | 本地缓存 | 更稳定 |
| 总构建时间 | 5.89s | ~4s | 1.5x |

### 3.2 交互体验对比

| 指标 | 优化前 | 优化后 |
|------|--------|--------|
| 旋转 | 手动更新，无惯性 | OrbitControls 阻尼惯性 |
| 缩放 | 插值迟钝 | 顺滑阻尼 |
| 自转轴 | 直立 | 23.5° 倾斜 |
| 拖拽 | 无恢复机制 | 3秒后恢复自动旋转 |

---

## 四、文件变更清单

### 修改文件

| 文件 | 变更内容 |
|------|---------|
| `vite.config.ts` | 添加代码分割、terser 压缩、chunk 配置 |
| `src/components/Globe.tsx` | 添加 OrbitControls、本地贴图、轴倾斜 |
| `src/sections/WorldDistribution.tsx` | React.lazy 动态导入 Globe |
| `src/sections/ExhibitionIndex.tsx` | 图片懒加载 |
| `src/sections/CinematicPavilions.tsx` | 视频懒加载优化 |

### 新增文件

| 文件 | 说明 |
|------|------|
| `public/textures/earth-blue-marble.jpg` | 地球卫星贴图（本地） |
| `public/textures/earth-topology.png` | 地形高度图（本地） |
| `src/components/GlobePlaceholder.tsx` | Globe 加载占位组件 |

---

## 五、实施顺序

1. **Step 1**: 下载贴图到 `public/textures/`
2. **Step 2**: 更新 `vite.config.ts` 添加代码分割
3. **Step 3**: 重写 `Globe.tsx`（OrbitControls + 本地贴图 + 轴倾斜）
4. **Step 4**: 创建 `GlobePlaceholder.tsx`
5. **Step 5**: 更新 `WorldDistribution.tsx`（React.lazy）
6. **Step 6**: 优化图片/视频懒加载
7. **Step 7**: 构建验证

---

*本文档为地球模型优化与性能提升的设计规格说明书。*
