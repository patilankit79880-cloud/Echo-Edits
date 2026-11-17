import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

interface CinemaCameraSceneProps {
  className?: string;
}

type FinishType = 'stealth' | 'titanium' | 'bronze';
type ViewAngleType = 'threeQuarter' | 'frontOptics' | 'sideOperator' | 'topRig';
type FlareColorType = 'orange' | 'cyan' | 'gold';

export const CinemaLensScene: React.FC<CinemaCameraSceneProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [finish, setFinish] = useState<FinishType>('stealth');
  const [viewAngle, setViewAngle] = useState<ViewAngleType>('threeQuarter');
  const [flareColor, setFlareColor] = useState<FlareColorType>('orange');
  const [isRecording, setIsRecording] = useState(true);
  const [isRotating, setIsRotating] = useState(true);

  // References for live animation loop variables
  const stateRef = useRef({
    finish: 'stealth' as FinishType,
    viewAngle: 'threeQuarter' as ViewAngleType,
    flareColor: 'orange' as FlareColorType,
    isRecording: true,
    isRotating: true,
    mouseTarget: { x: 0, y: 0 },
    mouseCurrent: { x: 0, y: 0 },
    cameraGroup: null as THREE.Group | null,
    frontGlassMat: null as THREE.MeshPhysicalMaterial | null,
    bodyMaterials: [] as THREE.MeshStandardMaterial[],
    flareLight: null as THREE.PointLight | null,
    updateScreenTextures: null as (() => void) | null,
    targetCamPos: new THREE.Vector3(3.6, 2.0, 6.4),
    targetCamLookAt: new THREE.Vector3(0, 0.1, 0.3),
  });

  // Keep stateRef in sync with state
  useEffect(() => {
    stateRef.current.finish = finish;
    stateRef.current.viewAngle = viewAngle;
    stateRef.current.flareColor = flareColor;
    stateRef.current.isRecording = isRecording;
    stateRef.current.isRotating = isRotating;

    // Update camera body materials color based on finish
    const bodyColor = finish === 'stealth' ? 0x14161a : finish === 'titanium' ? 0x2e3440 : 0x4a3a2a;
    const bodyMetalness = finish === 'stealth' ? 0.88 : finish === 'titanium' ? 0.95 : 0.82;
    const bodyRoughness = finish === 'stealth' ? 0.32 : finish === 'titanium' ? 0.22 : 0.28;

    stateRef.current.bodyMaterials.forEach((mat) => {
      mat.color.setHex(bodyColor);
      mat.metalness = bodyMetalness;
      mat.roughness = bodyRoughness;
    });

    // Update flare light
    if (stateRef.current.flareLight) {
      if (flareColor === 'orange') {
        stateRef.current.flareLight.color.setHex(0xff5500);
      } else if (flareColor === 'cyan') {
        stateRef.current.flareLight.color.setHex(0x00d2ff);
      } else {
        stateRef.current.flareLight.color.setHex(0xffaa22);
      }
    }

    // Update glass attenuation
    if (stateRef.current.frontGlassMat) {
      if (flareColor === 'orange') {
        stateRef.current.frontGlassMat.attenuationColor.setHex(0xff7722);
      } else if (flareColor === 'cyan') {
        stateRef.current.frontGlassMat.attenuationColor.setHex(0x22eeff);
      } else {
        stateRef.current.frontGlassMat.attenuationColor.setHex(0xffbb33);
      }
    }

    // Redraw HUD canvas textures
    if (stateRef.current.updateScreenTextures) {
      stateRef.current.updateScreenTextures();
    }

    // Set target camera position based on selected angle preset
    if (viewAngle === 'threeQuarter') {
      stateRef.current.targetCamPos.set(3.4, 1.8, 5.4);
      stateRef.current.targetCamLookAt.set(0, 0.1, 0.2);
    } else if (viewAngle === 'frontOptics') {
      stateRef.current.targetCamPos.set(0.0, 0.2, 5.2);
      stateRef.current.targetCamLookAt.set(0, 0.15, 1.2);
    } else if (viewAngle === 'sideOperator') {
      stateRef.current.targetCamPos.set(5.2, 0.8, 1.2);
      stateRef.current.targetCamLookAt.set(0, 0.15, 0.0);
    } else if (viewAngle === 'topRig') {
      stateRef.current.targetCamPos.set(0.1, 5.8, 0.4);
      stateRef.current.targetCamLookAt.set(0, 0.15, 0.2);
    }
  }, [finish, viewAngle, flareColor, isRecording, isRotating]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let frameId = 0;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

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
    scene.fog = new THREE.Fog(0x08090c, 10, 32);

    // Camera
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.copy(stateRef.current.targetCamPos);

    // Reusable vector for lookAt
    const currentLookAt = new THREE.Vector3(0, 0.2, 0.2);

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
    renderer.toneMappingExposure = 1.18;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Studio Environment reflection map
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Studio Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0x7590b0, 0x0f1115, 1.4);
    scene.add(hemiLight);

    const warmKeyLight = new THREE.DirectionalLight(0xfff0e2, 3.2);
    warmKeyLight.position.set(4.5, 5.5, 4.5);
    if (!isSoftwareGl) {
      warmKeyLight.castShadow = true;
      warmKeyLight.shadow.mapSize.width = 1024;
      warmKeyLight.shadow.mapSize.height = 1024;
      warmKeyLight.shadow.bias = -0.0005;
      warmKeyLight.shadow.normalBias = 0.02;
    }
    scene.add(warmKeyLight);

    const rimLight = new THREE.DirectionalLight(0xff5500, 3.8);
    rimLight.position.set(-5, 2, -4);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0x6080b0, 1.2);
    fillLight.position.set(-4, -1, 3);
    scene.add(fillLight);

    const opticalFlareLight = new THREE.PointLight(0xff5500, 2.8, 12);
    opticalFlareLight.position.set(0, 0.2, 2.5);
    scene.add(opticalFlareLight);
    stateRef.current.flareLight = opticalFlareLight;

    // Contact Ground Shadow Plane
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(128, 128, 20, 128, 128, 120);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.88)');
      grad.addColorStop(0.4, 'rgba(0, 0, 0, 0.45)');
      grad.addColorStop(0.8, 'rgba(0, 0, 0, 0.12)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    shadowTex.colorSpace = THREE.SRGBColorSpace;
    const shadowGeo = new THREE.PlaneGeometry(6, 6);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.15;
    scene.add(shadowMesh);

    // =========================================================================
    // PROCEDURAL 3D PRODUCTION CINEMA CAMERA (Composite 10-Part THREE.Group)
    // =========================================================================
    const cameraGroup = new THREE.Group();
    cameraGroup.scale.set(0.86, 0.86, 0.86);
    cameraGroup.position.set(0, -0.12, 0);
    scene.add(cameraGroup);
    stateRef.current.cameraGroup = cameraGroup;

    // PBR Materials
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x14161a,
      roughness: 0.32,
      metalness: 0.88,
    });
    stateRef.current.bodyMaterials.push(chassisMat);

    const anodizedBlackMat = new THREE.MeshStandardMaterial({
      color: 0x0f1114,
      roughness: 0.4,
      metalness: 0.8,
    });

    const brushedAlumMat = new THREE.MeshStandardMaterial({
      color: 0x242832,
      roughness: 0.28,
      metalness: 0.9,
    });

    const stainlessSteelMat = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      roughness: 0.14,
      metalness: 0.98,
    });

    const brassAccentMat = new THREE.MeshStandardMaterial({
      color: 0xd98822,
      roughness: 0.22,
      metalness: 0.92,
    });

    const carbonMat = new THREE.MeshStandardMaterial({
      color: 0x0d0e12,
      roughness: 0.65,
      metalness: 0.25,
    });

    const rubberMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a0c,
      roughness: 0.85,
      metalness: 0.05,
    });

    const opticalGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: isSoftwareGl ? 0 : 0.96,
      opacity: isSoftwareGl ? 0.35 : 1,
      transparent: true,
      roughness: 0.04,
      ior: 1.62,
      thickness: 1.4,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      attenuationColor: new THREE.Color(0xff7722),
      attenuationDistance: 1.8,
    });
    stateRef.current.frontGlassMat = opticalGlassMat;

    // -------------------------------------------------------------------------
    // 1. Camera Body Chassis (Primary silhouette)
    // -------------------------------------------------------------------------
    const bodyBoxGeo = new THREE.BoxGeometry(1.5, 1.4, 2.0);
    const bodyMesh = new THREE.Mesh(bodyBoxGeo, chassisMat);
    bodyMesh.position.set(0, 0.2, 0);
    cameraGroup.add(bodyMesh);

    // Body side cooling louvers / ventilation gill plates
    const ventPlateGeo = new THREE.BoxGeometry(0.04, 0.8, 1.2);
    const rightVent = new THREE.Mesh(ventPlateGeo, anodizedBlackMat);
    rightVent.position.set(-0.77, 0.2, -0.1);
    cameraGroup.add(rightVent);

    // ARRI Rosette on right side
    const rosetteGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.06, 32);
    const rosetteMesh = new THREE.Mesh(rosetteGeo, stainlessSteelMat);
    rosetteMesh.rotation.z = Math.PI / 2;
    rosetteMesh.position.set(-0.78, 0.2, 0.6);
    cameraGroup.add(rosetteMesh);

    // -------------------------------------------------------------------------
    // 2. Operator Side Digital Display (Procedural HUD Canvas Texture)
    // -------------------------------------------------------------------------
    const hudCanvas = document.createElement('canvas');
    hudCanvas.width = 512;
    hudCanvas.height = 256;
    const hudCtx = hudCanvas.getContext('2d');

    const drawSideHUD = () => {
      if (!hudCtx) return;
      // Background
      hudCtx.fillStyle = '#0a0c10';
      hudCtx.fillRect(0, 0, 512, 256);

      // Border frame
      hudCtx.strokeStyle = '#222838';
      hudCtx.lineWidth = 4;
      hudCtx.strokeRect(4, 4, 504, 248);

      // Top bar header
      hudCtx.fillStyle = '#141822';
      hudCtx.fillRect(8, 8, 496, 42);

      hudCtx.fillStyle = '#a0aec0';
      hudCtx.font = 'bold 18px monospace';
      hudCtx.fillText('ECHO CINEMA 8K LF', 20, 36);

      // Battery & FPS
      hudCtx.fillStyle = '#48bb78';
      hudCtx.font = '16px monospace';
      hudCtx.fillText('BAT: 14.8V (94%)', 320, 36);

      // REC / STBY Badge
      if (stateRef.current.isRecording) {
        hudCtx.fillStyle = '#e53e3e';
        hudCtx.fillRect(20, 62, 70, 30);
        hudCtx.fillStyle = '#ffffff';
        hudCtx.font = 'bold 18px monospace';
        hudCtx.fillText('● REC', 26, 84);
      } else {
        hudCtx.fillStyle = '#2d3748';
        hudCtx.fillRect(20, 62, 80, 30);
        hudCtx.fillStyle = '#ecc94b';
        hudCtx.font = 'bold 18px monospace';
        hudCtx.fillText('STBY', 34, 84);
      }

      // Timecode
      hudCtx.fillStyle = '#ffffff';
      hudCtx.font = 'bold 36px monospace';
      hudCtx.fillText('01:24:58:12', 120, 88);

      // Divider line
      hudCtx.strokeStyle = '#2d3748';
      hudCtx.lineWidth = 2;
      hudCtx.beginPath();
      hudCtx.moveTo(20, 110);
      hudCtx.lineTo(492, 110);
      hudCtx.stroke();

      // Main Exposure & Sensor Grid
      hudCtx.fillStyle = '#718096';
      hudCtx.font = '14px monospace';
      hudCtx.fillText('FPS', 30, 136);
      hudCtx.fillText('SHUTTER', 130, 136);
      hudCtx.fillText('EI/ISO', 260, 136);
      hudCtx.fillText('WB', 390, 136);

      hudCtx.fillStyle = '#ff5500';
      hudCtx.font = 'bold 24px monospace';
      hudCtx.fillText('24.000', 30, 168);

      hudCtx.fillStyle = '#ffffff';
      hudCtx.fillText('180.0°', 130, 168);
      hudCtx.fillText('800', 260, 168);
      hudCtx.fillText('5600K', 390, 168);

      // Audio Bars
      hudCtx.fillStyle = '#718096';
      hudCtx.font = '12px monospace';
      hudCtx.fillText('AUDIO CH1/2', 30, 206);

      // Channel 1 bar
      hudCtx.fillStyle = '#38a169';
      hudCtx.fillRect(130, 196, 220, 10);
      hudCtx.fillStyle = '#dd6b20';
      hudCtx.fillRect(350, 196, 50, 10);

      // Channel 2 bar
      hudCtx.fillStyle = '#38a169';
      hudCtx.fillRect(130, 212, 190, 10);
      hudCtx.fillStyle = '#dd6b20';
      hudCtx.fillRect(320, 212, 40, 10);

      // Codec
      hudCtx.fillStyle = '#a0aec0';
      hudCtx.font = '13px monospace';
      hudCtx.fillText('ProRes 4444 XQ • 4K UHD', 30, 242);
    };

    drawSideHUD();

    const hudTex = new THREE.CanvasTexture(hudCanvas);
    hudTex.colorSpace = THREE.SRGBColorSpace;
    hudTex.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const hudScreenGeo = new THREE.PlaneGeometry(1.2, 0.75);
    const hudScreenMat = new THREE.MeshBasicMaterial({
      map: hudTex,
      toneMapped: false,
      side: THREE.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    const hudScreenMesh = new THREE.Mesh(hudScreenGeo, hudScreenMat);
    hudScreenMesh.rotation.y = -Math.PI / 2;
    hudScreenMesh.position.set(0.765, 0.25, -0.05);
    cameraGroup.add(hudScreenMesh);

    // Operator side tactile buttons & jog wheel below screen
    const buttonGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.04, 16);
    for (let i = 0; i < 3; i++) {
      const btn = new THREE.Mesh(buttonGeo, anodizedBlackMat);
      btn.rotation.z = Math.PI / 2;
      btn.position.set(0.77, -0.28, -0.4 + i * 0.25);
      cameraGroup.add(btn);
    }

    const jogWheelGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.05, 32);
    const jogWheel = new THREE.Mesh(jogWheelGeo, stainlessSteelMat);
    jogWheel.rotation.z = Math.PI / 2;
    jogWheel.position.set(0.77, -0.28, 0.45);
    cameraGroup.add(jogWheel);

    // -------------------------------------------------------------------------
    // 3. Articulating Top Field Monitor (Live Viewfinder HUD)
    // -------------------------------------------------------------------------
    const monitorArmGeo = new THREE.BoxGeometry(0.1, 0.35, 0.1);
    const monitorArm = new THREE.Mesh(monitorArmGeo, brushedAlumMat);
    monitorArm.position.set(-0.45, 1.05, 0.6);
    monitorArm.rotation.z = 0.25;
    cameraGroup.add(monitorArm);

    const monitorHousingGeo = new THREE.BoxGeometry(1.3, 0.85, 0.15);
    const monitorHousing = new THREE.Mesh(monitorHousingGeo, anodizedBlackMat);
    monitorHousing.position.set(-0.65, 1.25, 0.6);
    monitorHousing.rotation.y = 0.35;
    monitorHousing.rotation.x = -0.15;
    cameraGroup.add(monitorHousing);

    // Monitor live viewfinder canvas texture
    const vfCanvas = document.createElement('canvas');
    vfCanvas.width = 512;
    vfCanvas.height = 320;
    const vfCtx = vfCanvas.getContext('2d');

    const drawViewfinder = () => {
      if (!vfCtx) return;
      // Viewfinder background scene gradient simulation
      const vfGrad = vfCtx.createLinearGradient(0, 0, 512, 320);
      vfGrad.addColorStop(0, '#0c121e');
      vfGrad.addColorStop(0.5, '#161d2d');
      vfGrad.addColorStop(1, '#090d14');
      vfCtx.fillStyle = vfGrad;
      vfCtx.fillRect(0, 0, 512, 320);

      // Safe area framing box
      vfCtx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      vfCtx.lineWidth = 1.5;
      vfCtx.strokeRect(40, 28, 432, 264);

      // Rule of thirds lines
      vfCtx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      vfCtx.lineWidth = 1;
      vfCtx.beginPath();
      // Verticals
      vfCtx.moveTo(184, 28);
      vfCtx.lineTo(184, 292);
      vfCtx.moveTo(328, 28);
      vfCtx.lineTo(328, 292);
      // Horizontals
      vfCtx.moveTo(40, 116);
      vfCtx.lineTo(472, 116);
      vfCtx.moveTo(40, 204);
      vfCtx.lineTo(472, 204);
      vfCtx.stroke();

      // Center crosshair
      vfCtx.strokeStyle = '#ff5500';
      vfCtx.lineWidth = 2;
      vfCtx.beginPath();
      vfCtx.moveTo(246, 160);
      vfCtx.lineTo(266, 160);
      vfCtx.moveTo(256, 150);
      vfCtx.lineTo(256, 170);
      vfCtx.stroke();

      // Viewfinder OSD Header
      vfCtx.fillStyle = stateRef.current.isRecording ? '#ff3b30' : '#30d158';
      vfCtx.beginPath();
      vfCtx.arc(58, 46, 6, 0, Math.PI * 2);
      vfCtx.fill();

      vfCtx.fillStyle = '#ffffff';
      vfCtx.font = 'bold 15px monospace';
      vfCtx.fillText(stateRef.current.isRecording ? 'REC' : 'STBY', 70, 51);

      vfCtx.fillText('TC 01:24:58:12', 170, 51);
      vfCtx.fillText('4K ANAMORPHIC', 350, 51);

      // Bottom Bar
      vfCtx.fillStyle = '#ff9500';
      vfCtx.font = '13px monospace';
      vfCtx.fillText('ISO 800  •  1/48  •  T1.4  •  ECHO COLOR', 50, 282);
    };

    drawViewfinder();

    const vfTex = new THREE.CanvasTexture(vfCanvas);
    vfTex.colorSpace = THREE.SRGBColorSpace;
    vfTex.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const vfScreenGeo = new THREE.PlaneGeometry(1.18, 0.72);
    const vfScreenMat = new THREE.MeshBasicMaterial({
      map: vfTex,
      toneMapped: false,
      side: THREE.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    const vfScreenMesh = new THREE.Mesh(vfScreenGeo, vfScreenMat);
    vfScreenMesh.position.set(0, 0, 0.082);
    monitorHousing.add(vfScreenMesh);

    // Static Red Studio Tally LED on rear of monitor
    const tallyGeo = new THREE.BoxGeometry(0.18, 0.08, 0.02);
    const tallyMat = new THREE.MeshBasicMaterial({
      color: 0xff3b30,
      toneMapped: false,
    });
    const tallyMesh = new THREE.Mesh(tallyGeo, tallyMat);
    tallyMesh.position.set(0, 0.32, -0.08);
    monitorHousing.add(tallyMesh);

    // Callback to update textures when state changes
    stateRef.current.updateScreenTextures = () => {
      drawSideHUD();
      hudTex.needsUpdate = true;
      drawViewfinder();
      vfTex.needsUpdate = true;
    };

    // -------------------------------------------------------------------------
    // 4. Top NATO Cheeseplate & Heavy-Duty Carry Handle
    // -------------------------------------------------------------------------
    const cheeseplateGeo = new THREE.BoxGeometry(1.1, 0.12, 1.8);
    const cheeseplate = new THREE.Mesh(cheeseplateGeo, brushedAlumMat);
    cheeseplate.position.set(0, 0.96, 0);
    cameraGroup.add(cheeseplate);

    // Handle front & rear riser brackets
    const riserGeo = new THREE.BoxGeometry(0.24, 0.45, 0.22);
    const frontRiser = new THREE.Mesh(riserGeo, anodizedBlackMat);
    frontRiser.position.set(0, 1.22, 0.5);
    cameraGroup.add(frontRiser);

    const rearRiser = new THREE.Mesh(riserGeo, anodizedBlackMat);
    rearRiser.position.set(0, 1.22, -0.5);
    cameraGroup.add(rearRiser);

    // Ergonomic Handle Grip Bar
    const handleGripGeo = new THREE.BoxGeometry(0.28, 0.2, 1.8);
    const handleGrip = new THREE.Mesh(handleGripGeo, rubberMat);
    handleGrip.position.set(0, 1.48, 0);
    cameraGroup.add(handleGrip);

    // Front accessory cold shoe mount on handle
    const coldShoeGeo = new THREE.BoxGeometry(0.22, 0.08, 0.22);
    const coldShoe = new THREE.Mesh(coldShoeGeo, stainlessSteelMat);
    coldShoe.position.set(0, 1.58, 0.7);
    cameraGroup.add(coldShoe);

    // -------------------------------------------------------------------------
    // 5. Front PL Mount & Anamorphic Cine Lens
    // -------------------------------------------------------------------------
    // Stainless steel PL-Mount positive lock collar
    const plMountGeo = new THREE.CylinderGeometry(0.68, 0.72, 0.22, 36);
    const plMount = new THREE.Mesh(plMountGeo, stainlessSteelMat);
    plMount.rotation.x = Math.PI / 2;
    plMount.position.set(0, 0.2, 1.1);
    cameraGroup.add(plMount);

    // Main Anamorphic Lens Barrel
    const lensBarrelGeo = new THREE.CylinderGeometry(0.65, 0.65, 1.5, 48);
    const lensBarrel = new THREE.Mesh(lensBarrelGeo, anodizedBlackMat);
    lensBarrel.rotation.x = Math.PI / 2;
    lensBarrel.position.set(0, 0.2, 1.85);
    cameraGroup.add(lensBarrel);

    // Focus Gear Ring (knurled teeth)
    const focusGearGeo = new THREE.CylinderGeometry(0.69, 0.69, 0.35, 64);
    const focusGear = new THREE.Mesh(focusGearGeo, brushedAlumMat);
    focusGear.rotation.x = Math.PI / 2;
    focusGear.position.set(0, 0.2, 1.6);
    cameraGroup.add(focusGear);

    // Aperture Iris Ring (with brass accent trim)
    const irisRingGeo = new THREE.CylinderGeometry(0.67, 0.67, 0.2, 48);
    const irisRing = new THREE.Mesh(irisRingGeo, brassAccentMat);
    irisRing.rotation.x = Math.PI / 2;
    irisRing.position.set(0, 0.2, 1.35);
    cameraGroup.add(irisRing);

    // Front Flared Bezel
    const frontBezelGeo = new THREE.CylinderGeometry(0.92, 0.68, 0.35, 48);
    const frontBezel = new THREE.Mesh(frontBezelGeo, anodizedBlackMat);
    frontBezel.rotation.x = Math.PI / 2;
    frontBezel.position.set(0, 0.2, 2.7);
    cameraGroup.add(frontBezel);

    // Curved Front Optical Glass Element
    const frontGlassGeo = new THREE.SphereGeometry(0.88, 36, 24, 0, Math.PI * 2, 0, Math.PI * 0.42);
    const frontGlass = new THREE.Mesh(frontGlassGeo, opticalGlassMat);
    frontGlass.position.set(0, 0.2, 2.65);
    cameraGroup.add(frontGlass);

    // -------------------------------------------------------------------------
    // 6. Carbon Fiber Matte Box & Adjustable Flags
    // -------------------------------------------------------------------------
    const matteBoxGeo = new THREE.BoxGeometry(2.3, 1.7, 0.18);
    const matteBoxMesh = new THREE.Mesh(matteBoxGeo, carbonMat);
    matteBoxMesh.position.set(0, 0.2, 2.9);
    cameraGroup.add(matteBoxMesh);

    // Matte Box Top French Flag
    const topFlagGeo = new THREE.BoxGeometry(2.4, 0.04, 0.8);
    const topFlagMesh = new THREE.Mesh(topFlagGeo, carbonMat);
    topFlagMesh.position.set(0, 1.12, 3.25);
    topFlagMesh.rotation.x = -0.22;
    cameraGroup.add(topFlagMesh);

    // Matte Box Left Flag
    const sideFlagGeo = new THREE.BoxGeometry(0.04, 1.6, 0.65);
    const leftFlagMesh = new THREE.Mesh(sideFlagGeo, carbonMat);
    leftFlagMesh.position.set(-1.22, 0.2, 3.15);
    leftFlagMesh.rotation.y = -0.28;
    cameraGroup.add(leftFlagMesh);

    // Matte Box Right Flag
    const rightFlagMesh = new THREE.Mesh(sideFlagGeo, carbonMat);
    rightFlagMesh.position.set(1.22, 0.2, 3.15);
    rightFlagMesh.rotation.y = 0.28;
    cameraGroup.add(rightFlagMesh);

    // -------------------------------------------------------------------------
    // 7. 15mm Studio Baseplate & Dual Iris Support Rods
    // -------------------------------------------------------------------------
    const baseplateGeo = new THREE.BoxGeometry(1.4, 0.22, 2.0);
    const baseplate = new THREE.Mesh(baseplateGeo, brushedAlumMat);
    baseplate.position.set(0, -0.6, 0);
    cameraGroup.add(baseplate);

    // Dual 15mm stainless steel rods running under the rig
    const rodGeo = new THREE.CylinderGeometry(0.075, 0.075, 3.8, 24);
    const leftRod = new THREE.Mesh(rodGeo, stainlessSteelMat);
    leftRod.rotation.x = Math.PI / 2;
    leftRod.position.set(-0.45, -0.82, 0.9);
    cameraGroup.add(leftRod);

    const rightRod = new THREE.Mesh(rodGeo, stainlessSteelMat);
    rightRod.rotation.x = Math.PI / 2;
    rightRod.position.set(0.45, -0.82, 0.9);
    cameraGroup.add(rightRod);

    // Front rod support bracket below matte box
    const rodBracketGeo = new THREE.BoxGeometry(1.2, 0.25, 0.15);
    const rodBracket = new THREE.Mesh(rodBracketGeo, anodizedBlackMat);
    rodBracket.position.set(0, -0.65, 2.7);
    cameraGroup.add(rodBracket);

    // -------------------------------------------------------------------------
    // 8. Rear Cinema V-Mount Battery Brick
    // -------------------------------------------------------------------------
    const batteryMountPlateGeo = new THREE.BoxGeometry(1.2, 1.1, 0.1);
    const batteryMountPlate = new THREE.Mesh(batteryMountPlateGeo, brushedAlumMat);
    batteryMountPlate.position.set(0, 0.2, -1.05);
    cameraGroup.add(batteryMountPlate);

    const vMountBatteryGeo = new THREE.BoxGeometry(1.25, 1.25, 0.65);
    const vMountBattery = new THREE.Mesh(vMountBatteryGeo, rubberMat);
    vMountBattery.position.set(0, 0.2, -1.45);
    cameraGroup.add(vMountBattery);

    // V-Mount release latch button (electric orange)
    const latchGeo = new THREE.BoxGeometry(0.18, 0.18, 0.08);
    const latchMesh = new THREE.Mesh(latchGeo, brassAccentMat);
    latchMesh.position.set(0.55, 0.65, -1.25);
    cameraGroup.add(latchMesh);

    // Battery fuel gauge 4-LED indicator bar
    const ledGaugeGeo = new THREE.BoxGeometry(0.08, 0.03, 0.02);
    const ledMat = new THREE.MeshBasicMaterial({ color: 0x38a169 });
    for (let i = 0; i < 4; i++) {
      const led = new THREE.Mesh(ledGaugeGeo, ledMat);
      led.position.set(-0.64, 0.35 - i * 0.06, -1.45);
      led.rotation.y = Math.PI / 2;
      cameraGroup.add(led);
    }

    // Pointer move tracking for mouse parallax
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      stateRef.current.mouseTarget.x = nx;
      stateRef.current.mouseTarget.y = ny;
    };
    window.addEventListener('pointermove', handlePointerMove);

    // Resize handler
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

    // High precision performance timing loop (avoiding THREE.Clock deprecation)
    let lastTime = performance.now();

    const tick = () => {
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const s = stateRef.current;

      // Exponential smooth damping for mouse parallax
      s.mouseCurrent.x += (s.mouseTarget.x - s.mouseCurrent.x) * (1 - Math.exp(-6 * dt));
      s.mouseCurrent.y += (s.mouseTarget.y - s.mouseCurrent.y) * (1 - Math.exp(-6 * dt));

      if (cameraGroup) {
        if (s.isRotating) {
          cameraGroup.rotation.y += 0.35 * dt;
        }
        // Parallax tilt
        cameraGroup.rotation.x = -s.mouseCurrent.y * 0.18 + 0.08;
        cameraGroup.rotation.z = -s.mouseCurrent.x * 0.12;
      }

      // Smooth camera interpolation towards angle preset
      camera.position.x += (s.targetCamPos.x - camera.position.x) * (1 - Math.exp(-4 * dt));
      camera.position.y += (s.targetCamPos.y - camera.position.y) * (1 - Math.exp(-4 * dt));
      camera.position.z += (s.targetCamPos.z - camera.position.z) * (1 - Math.exp(-4 * dt));

      currentLookAt.x += (s.targetCamLookAt.x - currentLookAt.x) * (1 - Math.exp(-4 * dt));
      currentLookAt.y += (s.targetCamLookAt.y - currentLookAt.y) * (1 - Math.exp(-4 * dt));
      currentLookAt.z += (s.targetCamLookAt.z - currentLookAt.z) * (1 - Math.exp(-4 * dt));
      camera.lookAt(currentLookAt);

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
    <div className={`relative w-full h-full min-h-[460px] md:min-h-[560px] select-none ${className}`}>
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Spec Badge */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#12141a]/95 border border-white/10 text-xs font-mono text-zinc-300 shadow-xl">
          <span className={`w-2 h-2 rounded-full ${isRecording ? 'bg-red-500' : 'bg-amber-400'}`} />
          <span className="font-semibold text-white">ECHO CINEMA 8K DIGITAL PRODUCTION CAMERA</span>
          <span className="text-zinc-500 hidden sm:inline">•</span>
          <span className="text-[#ff5500] font-semibold hidden sm:inline">4K UHD 24FPS</span>
        </div>
      </div>

      {/* Viewport-First Collapsible Bottom Control Dock (Zero Viewport Occlusion) */}
      <div
        className="absolute z-20 transition-all duration-300 ease-out"
        style={{
          bottom: isCollapsed ? '-94px' : '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: 'min(820px, 94vw)',
          width: '100%',
        }}
      >
        {/* Collapse / Expand Toggle Tab */}
        <div className="flex justify-center -mb-px">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center gap-1.5 px-3.5 py-1 text-xs font-mono tracking-wider uppercase rounded-t-md bg-[#161820] text-zinc-400 hover:text-white border-t border-x border-white/10 cursor-pointer shadow-lg"
          >
            {isCollapsed ? '▴ Show Camera Dock' : '▾ Hide Controls'}
          </button>
        </div>

        {/* Control Surface Dock (solid surface, zero backdrop-blur over WebGL canvas) */}
        <div className="px-4 py-3 rounded-xl bg-[#12141a] border border-white/10 shadow-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Camera View Angle Presets */}
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-400 font-mono text-[11px] uppercase mr-1">View:</span>
            {(
              [
                { id: 'threeQuarter', label: 'Studio 3/4' },
                { id: 'frontOptics', label: 'Front Lens' },
                { id: 'sideOperator', label: 'Side HUD' },
                { id: 'topRig', label: 'Top Rig' },
              ] as const
            ).map((v) => (
              <button
                key={v.id}
                onClick={() => setViewAngle(v.id)}
                className={`px-2.5 py-1 rounded font-mono transition-all cursor-pointer ${
                  viewAngle === v.id
                    ? 'bg-[#ff5500] text-white font-semibold shadow-sm'
                    : 'bg-[#1c1f28] text-zinc-300 hover:bg-[#252a36]'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>

          {/* Camera Chassis Finish Swatches */}
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-400 font-mono text-[11px] uppercase mr-1">Finish:</span>
            {(
              [
                { id: 'stealth', label: 'Stealth' },
                { id: 'titanium', label: 'Titanium' },
                { id: 'bronze', label: 'Bronze' },
              ] as const
            ).map((f) => (
              <button
                key={f.id}
                onClick={() => setFinish(f.id)}
                className={`px-2 py-1 rounded font-mono transition-all cursor-pointer ${
                  finish === f.id
                    ? 'bg-zinc-200 text-black font-semibold'
                    : 'bg-[#1c1f28] text-zinc-300 hover:bg-[#252a36]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Lens Anamorphic Optical Flare Tint */}
          <div className="flex items-center gap-2">
            <span className="text-zinc-400 font-mono text-[11px] uppercase">Flare:</span>
            <button
              onClick={() => setFlareColor('orange')}
              title="Electric Orange Flare"
              className={`w-5 h-5 rounded-full bg-[#ff5500] transition-transform cursor-pointer ${
                flareColor === 'orange' ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'
              }`}
            />
            <button
              onClick={() => setFlareColor('cyan')}
              title="Anamorphic Cyan Streak"
              className={`w-5 h-5 rounded-full bg-[#00d2ff] transition-transform cursor-pointer ${
                flareColor === 'cyan' ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'
              }`}
            />
            <button
              onClick={() => setFlareColor('gold')}
              title="Imperial Golden Flare"
              className={`w-5 h-5 rounded-full bg-[#ffaa22] transition-transform cursor-pointer ${
                flareColor === 'gold' ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'
              }`}
            />
          </div>

          {/* Record / Standby Mode Toggle */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`px-2.5 py-1 rounded font-mono text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                isRecording
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isRecording ? 'bg-red-500' : 'bg-emerald-400'}`} />
              {isRecording ? 'RECORDING' : 'STANDBY'}
            </button>
          </div>

          {/* Rotation Toggle */}
          <div className="flex items-center">
            <button
              onClick={() => setIsRotating(!isRotating)}
              className="px-2.5 py-1 rounded bg-[#1c1f28] text-zinc-300 hover:text-white hover:bg-[#252a36] font-mono text-[11px] cursor-pointer"
            >
              {isRotating ? 'Pause Orbit' : 'Resume Orbit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
