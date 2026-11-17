import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

interface ImmersiveHero3DProps {
  className?: string;
}

type PalettePreset = 'midnight-violet' | 'champagne-gold' | 'stealth-chrome';

export const ImmersiveHero3D: React.FC<ImmersiveHero3DProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);
  const [palette, setPalette] = useState<PalettePreset>('midnight-violet');
  const [sculptureMode, setSculptureMode] = useState<'knot' | 'torus' | 'crystal'>('knot');
  const [isRotating, setIsRotating] = useState(true);

  const stateRef = useRef({
    palette: 'midnight-violet' as PalettePreset,
    sculptureMode: 'knot' as 'knot' | 'torus' | 'crystal',
    isRotating: true,
    mouseTarget: { x: 0, y: 0 },
    mouseCurrent: { x: 0, y: 0 },
    mainSculptureGroup: null as THREE.Group | null,
    knotMesh: null as THREE.Mesh | null,
    torusMesh: null as THREE.Mesh | null,
    crystalMesh: null as THREE.Mesh | null,
    chromeMat: null as THREE.MeshStandardMaterial | null,
    goldMat: null as THREE.MeshStandardMaterial | null,
    particlesGeo: null as THREE.BufferGeometry | null,
    accentLight: null as THREE.PointLight | null,
    fillLight: null as THREE.PointLight | null,
  });

  useEffect(() => {
    stateRef.current.palette = palette;
    stateRef.current.sculptureMode = sculptureMode;
    stateRef.current.isRotating = isRotating;

    if (stateRef.current.accentLight && stateRef.current.fillLight) {
      if (palette === 'midnight-violet') {
        stateRef.current.accentLight.color.setHex(0x8B5CF6);
        stateRef.current.fillLight.color.setHex(0xC5A3FF);
      } else if (palette === 'champagne-gold') {
        stateRef.current.accentLight.color.setHex(0xD6B77A);
        stateRef.current.fillLight.color.setHex(0xE6C88B);
      } else {
        stateRef.current.accentLight.color.setHex(0xE2E8F0);
        stateRef.current.fillLight.color.setHex(0x94A3B8);
      }
    }

    if (stateRef.current.knotMesh && stateRef.current.torusMesh && stateRef.current.crystalMesh) {
      stateRef.current.knotMesh.visible = sculptureMode === 'knot';
      stateRef.current.torusMesh.visible = sculptureMode === 'torus';
      stateRef.current.crystalMesh.visible = sculptureMode === 'crystal';
    }
  }, [palette, sculptureMode, isRotating]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let frameId = 0;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x09090F, 8, 26);

    // Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 6.2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    container.appendChild(renderer.domElement);

    // Studio Environment map
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Studio Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0x3B2D60, 0x09090F, 1.2);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xF5F1FF, 2.8);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x8B5CF6, 3.4);
    rimLight.position.set(-5, -2, -3);
    scene.add(rimLight);

    const accentLight = new THREE.PointLight(0x8B5CF6, 3.5, 12);
    accentLight.position.set(2, 2, 2);
    scene.add(accentLight);
    stateRef.current.accentLight = accentLight;

    const fillLight = new THREE.PointLight(0xD6B77A, 2.2, 10);
    fillLight.position.set(-2, -1.5, 1.5);
    scene.add(fillLight);
    stateRef.current.fillLight = fillLight;

    // Soft Radial Contact Shadow
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(64, 64, 10, 64, 64, 60);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
      grad.addColorStop(0.5, 'rgba(23, 19, 41, 0.4)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(6, 6);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.6;
    scene.add(shadowMesh);

    // =========================================================================
    // 3D CHROME SCULPTURE & FLOATING ARTIFACTS
    // =========================================================================
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    stateRef.current.mainSculptureGroup = mainGroup;

    // Chrome PBR Material
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xE8EDF5,
      roughness: 0.12,
      metalness: 0.96,
    });
    stateRef.current.chromeMat = chromeMat;

    // Champagne Gold PBR Material
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xD6B77A,
      roughness: 0.22,
      metalness: 0.92,
    });
    stateRef.current.goldMat = goldMat;

    // Optical Glass Shards Material
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xC5A3FF,
      transmission: isSoftwareGl ? 0 : 0.92,
      opacity: isSoftwareGl ? 0.35 : 1,
      transparent: true,
      roughness: 0.05,
      ior: 1.58,
      thickness: 1.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      attenuationColor: new THREE.Color(0x8B5CF6),
      attenuationDistance: 2.0,
    });

    // 1. Chrome Torus Knot Sculpture
    const knotGeo = new THREE.TorusKnotGeometry(1.2, 0.38, 128, 32, 2, 3);
    const knotMesh = new THREE.Mesh(knotGeo, chromeMat);
    mainGroup.add(knotMesh);
    stateRef.current.knotMesh = knotMesh;

    // 2. Interlocking Torus Rings
    const torusGeo = new THREE.TorusGeometry(1.3, 0.32, 32, 100);
    const torusMesh = new THREE.Mesh(torusGeo, chromeMat);
    torusMesh.visible = false;
    mainGroup.add(torusMesh);
    stateRef.current.torusMesh = torusMesh;

    // Inner gold ring for Torus mode
    const innerRingGeo = new THREE.TorusGeometry(0.85, 0.16, 24, 80);
    const innerRingMesh = new THREE.Mesh(innerRingGeo, goldMat);
    innerRingMesh.rotation.x = Math.PI / 2;
    torusMesh.add(innerRingMesh);

    // 3. Faceted Crystalline Icosahedron
    const crystalGeo = new THREE.IcosahedronGeometry(1.4, 0);
    const crystalMesh = new THREE.Mesh(crystalGeo, chromeMat);
    crystalMesh.visible = false;
    mainGroup.add(crystalMesh);
    stateRef.current.crystalMesh = crystalMesh;

    // Floating Glass Orbital Shards (6 orbital pieces)
    const shards: THREE.Mesh[] = [];
    const shardGeos = [
      new THREE.OctahedronGeometry(0.35, 0),
      new THREE.TetrahedronGeometry(0.4, 0),
      new THREE.IcosahedronGeometry(0.3, 0),
    ];

    for (let i = 0; i < 6; i++) {
      const geo = shardGeos[i % shardGeos.length];
      const mesh = new THREE.Mesh(geo, i % 2 === 0 ? glassMat : goldMat);
      const angle = (i / 6) * Math.PI * 2;
      const radius = 2.4 + (i % 3) * 0.3;
      mesh.position.set(
        Math.cos(angle) * radius,
        (i % 2 === 0 ? 1 : -1) * 0.8 + Math.sin(angle * 2) * 0.4,
        Math.sin(angle) * radius * 0.6
      );
      mesh.rotation.set(angle, angle * 1.5, angle * 0.5);
      mainGroup.add(mesh);
      shards.push(mesh);
    }

    // Floating Luminous 3D Particles Cloud
    const particleCount = 200;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cViolet = new THREE.Color(0x8B5CF6);
    const cGold = new THREE.Color(0xD6B77A);
    const cLavender = new THREE.Color(0xC5A3FF);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 12;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      const pick = Math.random();
      const col = pick < 0.5 ? cViolet : pick < 0.8 ? cLavender : cGold;
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    stateRef.current.particlesGeo = particlesGeo;

    const particlesMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleSystem);

    // Mouse Tracking for Smooth Parallax
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      stateRef.current.mouseTarget.x = nx;
      stateRef.current.mouseTarget.y = ny;
    };
    window.addEventListener('pointermove', handlePointerMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    // Software WebGL pacing helper
    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    let lastTime = performance.now();

    const tick = () => {
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const s = stateRef.current;

      // Exponential damping on mouse movement
      s.mouseCurrent.x += (s.mouseTarget.x - s.mouseCurrent.x) * (1 - Math.exp(-5 * dt));
      s.mouseCurrent.y += (s.mouseTarget.y - s.mouseCurrent.y) * (1 - Math.exp(-5 * dt));

      if (mainGroup) {
        if (s.isRotating) {
          mainGroup.rotation.y += 0.45 * dt;
          mainGroup.rotation.x = Math.sin(now * 0.0008) * 0.15;
        }
        // Parallax tilt from user cursor
        mainGroup.rotation.x += -s.mouseCurrent.y * 0.25 * dt;
        mainGroup.rotation.z = -s.mouseCurrent.x * 0.2;
      }

      // Rotate shards individually
      shards.forEach((shard, idx) => {
        shard.rotation.x += (0.5 + idx * 0.1) * dt;
        shard.rotation.y += (0.4 + idx * 0.15) * dt;
        shard.position.y += Math.sin(now * 0.0015 + idx) * 0.002;
      });

      // Slowly rotate particle field
      particleSystem.rotation.y += 0.08 * dt;

      // Camera parallax drift
      camera.position.x = s.mouseCurrent.x * 0.4;
      camera.position.y = 0.5 + s.mouseCurrent.y * 0.3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    tick();

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      if (isSoftwareGl) {
        clearTimeout(frameId);
      } else {
        cancelAnimationFrame(frameId);
      }
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={`relative w-full h-full min-h-[500px] select-none ${className}`}>
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top 3D Spec Pill */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#171329]/90 border border-[#8B5CF6]/30 text-xs font-mono text-zinc-300 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
          <span className="text-white font-semibold">ECHO 3D CHROME SCULPTURE</span>
          <span className="text-zinc-500">•</span>
          <span className="text-[#C5A3FF] uppercase">{sculptureMode}</span>
        </div>
      </div>

      {/* Viewport-First Collapsible Bottom Control Dock (Zero Viewport Occlusion) */}
      <div
        className="absolute z-20 transition-all duration-300 ease-out"
        style={{
          bottom: isDockCollapsed ? '-86px' : '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: 'min(780px, 94vw)',
          width: '100%',
        }}
      >
        {/* Collapse / Expand Toggle Tab */}
        <div className="flex justify-center -mb-px">
          <button
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            className="flex items-center gap-1.5 px-3.5 py-1 text-xs font-mono tracking-wider uppercase rounded-t-md bg-[#171329] text-zinc-300 hover:text-white border-t border-x border-[#8B5CF6]/30 cursor-pointer shadow-lg"
          >
            {isDockCollapsed ? '▴ Show 3D Dock' : '▾ Hide Controls'}
          </button>
        </div>

        {/* Control Surface Dock (solid background, zero backdrop-filter over WebGL canvas) */}
        <div className="px-4 py-3 rounded-xl bg-[#12101E] border border-[#8B5CF6]/25 shadow-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Sculpture Geometry Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-400 font-mono text-[11px] uppercase mr-1">Sculpture:</span>
            {(
              [
                { id: 'knot', label: 'Torus Knot' },
                { id: 'torus', label: 'Interlock Rings' },
                { id: 'crystal', label: 'Faceted Crystal' },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                onClick={() => setSculptureMode(item.id)}
                className={`px-2.5 py-1 rounded font-mono transition-all cursor-pointer ${
                  sculptureMode === item.id
                    ? 'bg-[#8B5CF6] text-white font-semibold shadow-sm'
                    : 'bg-[#1C1833] text-zinc-300 hover:bg-[#282247]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Luxury Lighting Palette Swatches */}
          <div className="flex items-center gap-2">
            <span className="text-zinc-400 font-mono text-[11px] uppercase">Aura:</span>
            <button
              onClick={() => setPalette('midnight-violet')}
              title="Midnight Violet"
              className={`w-5 h-5 rounded-full bg-[#8B5CF6] transition-transform cursor-pointer ${
                palette === 'midnight-violet' ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'
              }`}
            />
            <button
              onClick={() => setPalette('champagne-gold')}
              title="Champagne Gold"
              className={`w-5 h-5 rounded-full bg-[#D6B77A] transition-transform cursor-pointer ${
                palette === 'champagne-gold' ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'
              }`}
            />
            <button
              onClick={() => setPalette('stealth-chrome')}
              title="Stealth Platinum"
              className={`w-5 h-5 rounded-full bg-[#E2E8F0] transition-transform cursor-pointer ${
                palette === 'stealth-chrome' ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'
              }`}
            />
          </div>

          {/* Orbit Rotation Toggle */}
          <div className="flex items-center">
            <button
              onClick={() => setIsRotating(!isRotating)}
              className="px-2.5 py-1 rounded bg-[#1C1833] text-zinc-300 hover:text-white hover:bg-[#282247] font-mono text-[11px] cursor-pointer"
            >
              {isRotating ? 'Pause Orbit' : 'Resume Orbit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
