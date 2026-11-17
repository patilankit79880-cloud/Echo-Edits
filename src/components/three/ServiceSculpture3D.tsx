import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SculptureShape } from '../../types';

interface ServiceSculpture3DProps {
  shape: SculptureShape;
  className?: string;
  isHovered?: boolean;
}

export const ServiceSculpture3D: React.FC<ServiceSculpture3DProps> = ({
  shape,
  className = '',
  isHovered = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(isHovered);

  useEffect(() => {
    hoverRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let frameId = 0;
    const width = container.clientWidth || 320;
    const height = container.clientHeight || 200;

    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 0, 3.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    // Studio Lights
    const hemiLight = new THREE.HemisphereLight(0x8B5CF6, 0x09090F, 1.5);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xF5F1FF, 2.8);
    dirLight.position.set(3, 4, 3);
    scene.add(dirLight);

    const purplePoint = new THREE.PointLight(0x8B5CF6, 3, 8);
    purplePoint.position.set(-2, -1, 2);
    scene.add(purplePoint);

    const goldPoint = new THREE.PointLight(0xD6B77A, 2.5, 8);
    goldPoint.position.set(2, -1.5, 1);
    scene.add(goldPoint);

    // PBR Materials
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xEEF2F7,
      roughness: 0.14,
      metalness: 0.95,
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xD6B77A,
      roughness: 0.22,
      metalness: 0.92,
    });

    const violetGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xC5A3FF,
      transmission: isSoftwareGl ? 0 : 0.88,
      opacity: isSoftwareGl ? 0.35 : 1,
      transparent: true,
      roughness: 0.08,
      ior: 1.55,
      thickness: 1.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });

    // Create 3D geometry based on shape
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    switch (shape) {
      case 'floating-monolith': {
        // Political PR: Sleek beveled obsidian/chrome monolith with gold accent trim
        const monolithGeo = new THREE.BoxGeometry(0.75, 1.6, 0.45);
        const monolith = new THREE.Mesh(monolithGeo, chromeMat);
        sculptureGroup.add(monolith);

        const goldTrimGeo = new THREE.BoxGeometry(0.8, 0.08, 0.48);
        const goldTrim = new THREE.Mesh(goldTrimGeo, goldMat);
        goldTrim.position.y = 0.3;
        sculptureGroup.add(goldTrim);
        break;
      }
      case 'kinetic-sphere': {
        // Social Media: Dynamic gyroscope sphere with orbital concentric rings
        const sphereGeo = new THREE.SphereGeometry(0.7, 32, 24);
        const sphere = new THREE.Mesh(sphereGeo, violetGlassMat);
        sculptureGroup.add(sphere);

        const ring1Geo = new THREE.TorusGeometry(1.05, 0.05, 16, 48);
        const ring1 = new THREE.Mesh(ring1Geo, chromeMat);
        sculptureGroup.add(ring1);

        const ring2Geo = new THREE.TorusGeometry(1.2, 0.04, 16, 48);
        const ring2 = new THREE.Mesh(ring2Geo, goldMat);
        ring2.rotation.x = Math.PI / 2;
        sculptureGroup.add(ring2);
        break;
      }
      case 'torus-ring': {
        // Instagram/FB: Interlocking infinity rings
        const ringGeo = new THREE.TorusGeometry(0.85, 0.22, 24, 64);
        const ringMesh = new THREE.Mesh(ringGeo, chromeMat);
        ringMesh.rotation.x = 0.5;
        sculptureGroup.add(ringMesh);

        const innerRing = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.12, 16, 48), goldMat);
        innerRing.rotation.y = Math.PI / 2;
        sculptureGroup.add(innerRing);
        break;
      }
      case 'gold-reel': {
        // Video Production: Cinema 35mm optical reel sculpture
        const outerReelGeo = new THREE.CylinderGeometry(1.0, 1.0, 0.2, 32);
        const outerReel = new THREE.Mesh(outerReelGeo, goldMat);
        outerReel.rotation.x = Math.PI / 2;
        sculptureGroup.add(outerReel);

        const hubGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.28, 24);
        const hub = new THREE.Mesh(hubGeo, chromeMat);
        hub.rotation.x = Math.PI / 2;
        sculptureGroup.add(hub);
        break;
      }
      case 'chrome-knot': {
        // Reels & Short-Form: Dynamic twisted trefoil knot
        const knotGeo = new THREE.TorusKnotGeometry(0.7, 0.22, 80, 24, 2, 3);
        const knot = new THREE.Mesh(knotGeo, chromeMat);
        sculptureGroup.add(knot);
        break;
      }
      case 'glass-prism': {
        // Photography & Events: Faceted optical glass prism dispersing light
        const prismGeo = new THREE.OctahedronGeometry(0.95, 0);
        const prism = new THREE.Mesh(prismGeo, violetGlassMat);
        sculptureGroup.add(prism);

        const cageGeo = new THREE.OctahedronGeometry(1.1, 0);
        const cageMat = new THREE.MeshStandardMaterial({
          color: 0xD6B77A,
          wireframe: true,
          metalness: 0.9,
          roughness: 0.2,
        });
        const cage = new THREE.Mesh(cageGeo, cageMat);
        sculptureGroup.add(cage);
        break;
      }
      case 'crystal-icosa': {
        // Creative Design & Branding: Multi-faceted crystalline icosahedron
        const icosaGeo = new THREE.IcosahedronGeometry(0.9, 0);
        const icosa = new THREE.Mesh(icosaGeo, chromeMat);
        sculptureGroup.add(icosa);

        const innerIcosaGeo = new THREE.IcosahedronGeometry(0.5, 0);
        const innerIcosa = new THREE.Mesh(innerIcosaGeo, goldMat);
        sculptureGroup.add(innerIcosa);
        break;
      }
      case 'wave-artifact':
      default: {
        // Corporate Media: Sleek architectural ribbon wave sculpture
        const curve = new THREE.TorusGeometry(0.8, 0.26, 24, 60, Math.PI * 1.6);
        const wave = new THREE.Mesh(curve, chromeMat);
        wave.rotation.z = Math.PI / 4;
        sculptureGroup.add(wave);

        const core = new THREE.Mesh(new THREE.DodecahedronGeometry(0.45), goldMat);
        sculptureGroup.add(core);
        break;
      }
    }

    // Animation Loop
    let lastTime = performance.now();

    const tick = () => {
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const speedMultiplier = hoverRef.current ? 2.2 : 0.7;
      sculptureGroup.rotation.y += 0.8 * speedMultiplier * dt;
      sculptureGroup.rotation.x = Math.sin(now * 0.001) * 0.2;

      if (hoverRef.current) {
        sculptureGroup.scale.lerp(new THREE.Vector3(1.12, 1.12, 1.12), 0.1);
      } else {
        sculptureGroup.scale.lerp(new THREE.Vector3(1.0, 1.0, 1.0), 0.1);
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [shape]);

  return (
    <div
      ref={mountRef}
      className={`w-full h-44 sm:h-48 overflow-hidden flex items-center justify-center pointer-events-none select-none ${className}`}
    />
  );
};
