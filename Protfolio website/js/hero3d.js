// js/hero3d.js — Interactive 3D WebGL Hero Scene
// Uses global THREE (loaded via three.min.js script tag)

'use strict';

(function () {
  const isMobile = window.innerWidth < 768;
  const isLowEnd = isMobile || (navigator.hardwareConcurrency != null && navigator.hardwareConcurrency <= 2);

  function initHero3D() {
    if (!window.THREE) {
      console.warn('Three.js not loaded');
      return;
    }

    const canvas = document.getElementById('hero-canvas');
    if (!canvas) {
      console.warn('hero-canvas not found');
      return;
    }

    const THREE = window.THREE;

    // ── Renderer ────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isLowEnd,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // fully transparent background

    // ── Scene & Camera ───────────────────────────────────────────────
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 6);

    // ── Main 3D Group ────────────────────────────────────────────────
    const group = new THREE.Group();

    // Position: right-side on desktop, behind middle photo area on mobile
    const getBasePos = (w) => new THREE.Vector3(w < 768 ? 0 : 3.2, w < 768 ? -0.3 : 0.0, w < 768 ? -2.5 : -1.0);
    let basePos = getBasePos(window.innerWidth);
    group.position.copy(basePos);
    scene.add(group);

    const detail = isLowEnd ? 0 : 1;

    // ── ICOSAHEDRON wireframe (ambient on mobile, vibrant on desktop) ─
    const icoGeo = new THREE.IcosahedronGeometry(1.8, detail);
    group.add(new THREE.Mesh(icoGeo, new THREE.MeshBasicMaterial({
      color: 0x4fd8ff,
      wireframe: true,
      transparent: true,
      opacity: isMobile ? 0.22 : 0.55,
    })));

    // Solid inner fill (very subtle)
    group.add(new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.78, detail),
      new THREE.MeshBasicMaterial({ color: 0x9b7bff, transparent: true, opacity: 0.06, side: THREE.BackSide })
    ));

    // ── OUTER WIREFRAME SHELL (bigger, dimmer, different axis tilt) ──
    const outerShell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.4, detail),
      new THREE.MeshBasicMaterial({ color: 0x9b7bff, wireframe: true, transparent: true, opacity: 0.12 })
    );
    outerShell.rotation.y = Math.PI / 3;
    group.add(outerShell);

    // ── TORUS RINGS (clearly visible) ───────────────────────────────
    function makeTorus(radius, tube, color, opacity, rotX, rotY) {
      const mesh = new THREE.Mesh(
        new THREE.TorusGeometry(radius, tube, 8, 100),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity })
      );
      mesh.rotation.x = rotX;
      mesh.rotation.y = rotY;
      group.add(mesh);
      return mesh;
    }

    const ring1 = makeTorus(2.5,  0.012, 0x9b7bff, 0.45, Math.PI * 0.28, 0);
    const ring2 = makeTorus(2.85, 0.008, 0x4fd8ff, 0.30, -Math.PI * 0.15, Math.PI * 0.22);
    const ring3 = makeTorus(2.2,  0.006, 0xffb454, 0.25, Math.PI * 0.5,  Math.PI * 0.1);

    // ── PARTICLES (floating dots) ────────────────────────────────────
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
      const pts = new THREE.Points(geo, new THREE.PointsMaterial({
        color, size, transparent: true, opacity, sizeAttenuation: true
      }));
      pts.position.copy(group.position);
      scene.add(pts);
      return pts;
    }

    const particles1 = makeParticles(isLowEnd ? 600 : 1800, 3.5, 7.5, 0x9b7bff, isLowEnd ? 0.03 : 0.022, 0.5);
    const particles2 = isLowEnd ? null : makeParticles(800, 6, 13, 0x4fd8ff, 0.016, 0.35);

    // ── Mouse & Scroll tracking ──────────────────────────────────────
    let scrollY = 0, targetMX = 0, targetMY = 0, smoothMX = 0, smoothMY = 0;

    window.addEventListener('scroll',    () => { scrollY = window.scrollY; }, { passive: true });
    window.addEventListener('mousemove', e  => {
      targetMX = (e.clientX / window.innerWidth  - 0.5) * 2;
      targetMY = -(e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    // ── Resize ───────────────────────────────────────────────────────
    window.addEventListener('resize', () => {
      const w = window.innerWidth, h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      basePos = getBasePos(w);
      group.position.copy(basePos);
      particles1.position.copy(basePos);
      if (particles2) particles2.position.copy(basePos);
    }, { passive: true });

    // ── Animation loop ───────────────────────────────────────────────
    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);

      // Pause deep into page
      if (scrollY > window.innerHeight * 2.5) {
        return;
      }

      const t = clock.getElapsedTime();

      // Smooth mouse lerp
      smoothMX += (targetMX - smoothMX) * 0.05;
      smoothMY += (targetMY - smoothMY) * 0.05;

      const scrollFrac = Math.min(scrollY / window.innerHeight, 1.5);

      // Group moves deeper + down on scroll
      group.position.x = basePos.x + scrollFrac * (isMobile ? -0.3 : -1.5);
      group.position.y = basePos.y + scrollFrac * (isMobile ? -1.5 : -3.0);
      group.position.z = basePos.z + scrollFrac * -5.0;

      particles1.position.copy(group.position);
      if (particles2) particles2.position.copy(group.position);

      // Continuous rotation + mouse-reactive tilt
      group.rotation.y = t * 0.14 + smoothMX * 0.5 + scrollFrac * 2.0;
      group.rotation.x = t * 0.08 + smoothMY * 0.3 + scrollFrac * 1.0;
      group.rotation.z = t * 0.03 + scrollFrac * 0.6;

      // Outer shell counter-rotates for depth
      outerShell.rotation.y = -t * 0.09 + smoothMX * 0.2;
      outerShell.rotation.x = -t * 0.06;

      // Rings orbit independently
      ring1.rotation.z =  t * 0.18;
      ring2.rotation.z = -t * 0.12;
      ring3.rotation.y =  t * 0.10;

      // Particle field slowly drifts
      particles1.rotation.y =  t * 0.04;
      particles1.rotation.x = Math.sin(t * 0.1) * 0.08;
      if (particles2) particles2.rotation.y = -t * 0.025;

      // Breathing pulsation
      const breathe = 1 + Math.sin(t * 0.6) * 0.02;
      group.scale.setScalar(breathe);

      renderer.render(scene, camera);
    }

    animate();

    // Reveal canvas immediately
    canvas.classList.add('loaded');
    console.log('hero3d initialized successfully');
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initHero3D, 100));
  } else {
    setTimeout(initHero3D, 100);
  }
})();
