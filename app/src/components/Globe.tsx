import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
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
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sceneThreeRef = useRef<THREE.Scene | null>(null);
  const globeObjRef = useRef<ThreeGlobe | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!sceneRef.current) return;

    const container = sceneRef.current;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Scene
    const scene = new THREE.Scene();
    sceneThreeRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 280;
    cameraRef.current = camera;

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

    // Globe
    const globe = new ThreeGlobe()
      .globeImageUrl('./textures/earth-blue-marble.jpg')
      .bumpImageUrl('./textures/earth-topology.png')
      .showAtmosphere(true)
      .atmosphereColor('#c9a96e')
      .atmosphereAltitude(0.15);

    globe.showGraticules(true);

    // Earth axial tilt
    globe.rotation.z = 23.5 * (Math.PI / 180);

    // Add markers
    globe
      .pointsData(MARKERS)
      .pointAltitude(0.03)
      .pointColor(() => '#c9a96e')
      .pointRadius(0.5)
      .pointResolution(32);

    scene.add(globe);
    globeObjRef.current = globe;

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
      window.removeEventListener('resize', onResize);

      controls.dispose();

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
      cameraRef.current = null;
      sceneThreeRef.current = null;
      globeObjRef.current = null;
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
