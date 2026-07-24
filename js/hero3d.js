// js/hero3d.js — Interactive 3D WebGL Hero Scene (CORS-safe global Three.js implementation)

'use strict';

(function () {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile      = window.innerWidth < 768;
  const isLowEnd      = isMobile || (navigator.hardwareConcurrency != null && navigator.hardwareConcurrency <= 2);

  function initHero3D() {
    if (!window.THREE) return;

    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const THREE = window.THREE;

    // ── Renderer ────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isLowEnd,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isLowEnd ? 1 : 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // ── Scene & Camera ───────────────────────────────────────────────
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 6);

    // ── Icosahedron group ────────────────────────────────────────────
    const group = new THREE.Group();
    // Offset right on desktop to sit behind photo, center on mobile
    const getBasePosition = (w, h) => {
      const mobile = w < 768;
      return new THREE.Vector3(mobile ? 0 : 3.8, mobile ? 1.0 : 0, -1);
    };
    let basePos = getBasePosition(window.innerWidth, window.innerHeight);
    group.position.copy(basePos);
    scene.add(group);

    const detail  = isLowEnd ? 0 : 1;
    const icoGeo  = new THREE.IcosahedronGeometry(1.8, detail);

    // Wireframe shell (cyan)
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x4fd8ff,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    group.add(new THREE.Mesh(icoGeo, wireMat));

    // Solid back-face (violet, very dim)
    const solidMat = new THREE.MeshBasicMaterial({
      color: 0x9b7bff,
      transparent: true,
      opacity: 0.02,
      side: THREE.BackSide,
    });
    group.add(new THREE.Mesh(new THREE.IcosahedronGeometry(1.78, detail), solidMat));

    // Inner glow sphere (desktop only)
    if (!isLowEnd) {
      const glowMat = new THREE.MeshBasicMaterial({
        color: 0x4fd8ff,
        transparent: true,
        opacity: 0.022,
      });
      group.add(new THREE.Mesh(new THREE.SphereGeometry(1.38, 16, 16), glowMat));
    }

    // ── Orbital torus rings ──────────────────────────────────────────
    function makeTorus(radius, tube, color, opacity, rotX, rotY) {
      const geo = new THREE.TorusGeometry(radius, tube, 6, 64);
      const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = rotX;
      mesh.rotation.y = rotY;
      group.add(mesh);
      return mesh;
    }

    const ring1 = makeTorus(2.45, 0.006, 0x9b7bff, 0.15, Math.PI * 0.28, 0);
    const ring2 = makeTorus(2.7,  0.004, 0x4fd8ff, 0.08, -Math.PI * 0.15, Math.PI * 0.22);

    // ── Particle field ───────────────────────────────────────────────
    function makeParticles(count, rMin, rMax, color, size, opacity) {
      const pos = [];
      for (let i = 0; i < count; i++) {
        const r     = rMin + Math.random() * (rMax - rMin);
        const theta = Math.random() * Math.PI * 2;
        const phi   = Math.acos(2 * Math.random() - 1);
        pos.push(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        );
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ color, size, transparent: true, opacity, sizeAttenuation: true });
      const pts = new THREE.Points(geo, mat);
      pts.position.copy(group.position);
      scene.add(pts);
      return pts;
    }

    const p1Count = isLowEnd ? 700  : 2200;
    const p2Count = isLowEnd ? 0    : 1000;

    const particles1 = makeParticles(p1Count, 4, 8,  0x9b7bff, isLowEnd ? 0.028 : 0.019, 0.22);
    const particles2 = p2Count > 0
      ? makeParticles(p2Count, 7, 14, 0x4fd8ff, 0.014, 0.10)
      : null;

    // ── Scroll & Mouse tracking ───────────────────────────────────────
    let scrollY = 0;
    let targetMX = 0, targetMY = 0;
    let smoothMX = 0, smoothMY = 0;

    window.addEventListener('scroll', () => {
      scrollY = window.scrollY;
    }, { passive: true });

    window.addEventListener('mousemove', e => {
      targetMX = (e.clientX / window.innerWidth  - 0.5) * 2;
      targetMY = -(e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    // ── Resize ───────────────────────────────────────────────────────
    window.addEventListener('resize', () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      basePos = getBasePosition(w, h);
      group.position.copy(basePos);
      particles1.position.copy(basePos);
      if (particles2) particles2.position.copy(basePos);
    }, { passive: true });

    // ── Animation loop ───────────────────────────────────────────────
    const clock = new THREE.Clock();

    function animate() {
      if (reducedMotion) {
        // Just render static scene once and stop loops
        renderer.render(scene, camera);
        return;
      }
      requestAnimationFrame(animate);

      // Stop rendering if user has scrolled past hero/about sections
      const renderLimit = window.innerHeight * 2.2;
      if (scrollY > renderLimit) return;

      const t = clock.getElapsedTime();

      // Smooth mouse lerp
      smoothMX += (targetMX - smoothMX) * 0.04;
      smoothMY += (targetMY - smoothMY) * 0.04;

      const scrollFraction = Math.min(scrollY / window.innerHeight, 1.8);

      // Translate group & particles in 3D space on scroll (physical displacement)
      const shiftX = scrollFraction * (isMobile ? -0.4 : -1.8);
      const shiftY = scrollFraction * (isMobile ? -1.8 : -3.5);
      const shiftZ = scrollFraction * -5.5;

      group.position.x = basePos.x + shiftX;
      group.position.y = basePos.y + shiftY;
      group.position.z = basePos.z + shiftZ;

      particles1.position.copy(group.position);
      if (particles2) particles2.position.copy(group.position);

      // Apply rotation: ambient speed + mouse tilt + scroll spin
      group.rotation.y = t * 0.11 + smoothMX * 0.45 + scrollFraction * 2.2;
      group.rotation.x = t * 0.07 + smoothMY * 0.28 + scrollFraction * 1.2;
      group.rotation.z = scrollFraction * 0.8;

      // Rings orbit independently
      ring1.rotation.z =  t * 0.14;
      ring2.rotation.z = -t * 0.09;

      // Particle clouds drift
      particles1.rotation.y =  t * 0.035;
      particles1.rotation.x = Math.sin(t * 0.12) * 0.06;
      if (particles2) {
        particles2.rotation.y = -t * 0.02;
      }

      // Breathing scale (subtle pulsation)
      const breathe = 1 + Math.sin(t * 0.55) * 0.016;
      group.scale.setScalar(breathe);

      renderer.render(scene, camera);
    }

    animate();

    // Reveal canvas with fade
    canvas.classList.add('loaded');
  }

  // Load implementation
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(initHero3D, 200);
    });
  } else {
    setTimeout(initHero3D, 200);
  }
})();
