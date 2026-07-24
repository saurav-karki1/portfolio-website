document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Preloader ---
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 800);
    }

    // --- 2. Custom Cursor ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const interactables = document.querySelectorAll('[data-cursor="hover"], a, button, input, textarea');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('cursor-hover');
        });
    });

    // --- 3. Scroll Progress Indicator ---
    const scrollProgress = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollPx = document.documentElement.scrollTop;
        const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollLen = `${(scrollPx / winHeightPx) * 100}%`;
        scrollProgress.style.width = scrollLen;
    });

    // --- 4. Theme Toggle ---
    const themeToggle = document.querySelector('.theme-toggle');
    const htmlEl = document.documentElement;
    
    // Check local storage for theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlEl.setAttribute('data-theme', savedTheme);
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlEl.setAttribute('data-theme', targetTheme);
        localStorage.setItem('theme', targetTheme);
        
        // Update Three.js particle colors based on theme
        updateThreeTheme(targetTheme);
    });

    // --- 5. Mobile Navbar Navigation ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Sticky Navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.style.padding = '1rem 0';
        }
    });

    // --- 6. Counters Animation ---
    const counters = document.querySelectorAll('.counter');
    const counterOptions = { root: null, threshold: 0.5 };
    
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                let count = 0;
                const updateCount = () => {
                    const inc = target / 50; 
                    if(count < target) {
                        count += inc;
                        counter.innerText = Math.ceil(count);
                        setTimeout(updateCount, 40);
                    } else {
                        counter.innerText = target + '+';
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, counterOptions);

    counters.forEach(counter => counterObserver.observe(counter));

    // --- 7. Contact Form Submit (SheetDB) ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.querySelector('.form-status');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn span');
        const ogText = submitBtn.innerText;
        submitBtn.innerText = 'Sending...';

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Placeholder for SheetDB API URL
        const SHEETDB_URL = 'YOUR_SHEETDB_API_URL_HERE'; 
        
        if (SHEETDB_URL === 'YOUR_SHEETDB_API_URL_HERE') {
            setTimeout(() => {
                formStatus.innerText = "Message sent successfully! (Simulated)";
                formStatus.className = "form-status success";
                contactForm.reset();
                submitBtn.innerText = ogText;
                setTimeout(() => formStatus.innerText = '', 4000);
            }, 1000);
            return;
        }

        fetch(SHEETDB_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: [data] })
        })
        .then((response) => response.json())
        .then((data) => {
            formStatus.innerText = "Message sent successfully!";
            formStatus.className = "form-status success";
            contactForm.reset();
            submitBtn.innerText = ogText;
            setTimeout(() => formStatus.innerText = '', 4000);
        })
        .catch((error) => {
            formStatus.innerText = "Something went wrong. Please try again.";
            formStatus.className = "form-status error";
            submitBtn.innerText = ogText;
            setTimeout(() => formStatus.innerText = '', 4000);
        });
    });

    // --- 8. GSAP ScrollReveal Animations ---
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.utils.toArray('.gs-reveal').forEach(elem => {
        gsap.fromTo(elem, 
            { y: 50, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 1, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger: elem,
                    start: "top 85%", // when top of element hits 85% of viewport
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // --- 9. Three.js Hero Canvas background ---
    initThreeJS();
});

// Three.js Global reference for theme updates
let particlesMaterial;

function updateThreeTheme(theme) {
    if(!particlesMaterial) return;
    if(theme === 'dark') {
        particlesMaterial.color.setHex(0x6366f1);
    } else {
        particlesMaterial.color.setHex(0x0ea5e9);
    }
}

function initThreeJS() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 700;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const initialTheme = document.documentElement.getAttribute('data-theme');
    const particleColor = initialTheme === 'dark' ? 0x6366f1 : 0x0ea5e9;

    particlesMaterial = new THREE.PointsMaterial({
        size: 0.15,
        color: particleColor,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Floating shapes
    const geo1 = new THREE.IcosahedronGeometry(2, 0);
    const mat1 = new THREE.MeshBasicMaterial({ color: 0x6366f1, wireframe: true, transparent:true, opacity:0.15 });
    const mesh1 = new THREE.Mesh(geo1, mat1);
    mesh1.position.set(15, 10, -10);
    scene.add(mesh1);

    const geo2 = new THREE.TorusGeometry(3, 0.5, 16, 100);
    const mat2 = new THREE.MeshBasicMaterial({ color: 0x0ea5e9, wireframe: true, transparent:true, opacity:0.1 });
    const mesh2 = new THREE.Mesh(geo2, mat2);
    mesh2.position.set(-20, -15, -20);
    scene.add(mesh2);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        particlesMesh.rotation.y = elapsedTime * 0.05;
        particlesMesh.rotation.x = elapsedTime * 0.02;

        mesh1.rotation.y += 0.005;
        mesh1.rotation.x += 0.005;
        mesh2.rotation.y -= 0.003;
        mesh2.rotation.x -= 0.003;

        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;
        
        particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
        particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);

        renderer.render(scene, camera);
    }

    animate();
}
