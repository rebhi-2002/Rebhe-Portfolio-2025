/**
 * Main JavaScript file for website animations and interactivity
 * Features: GSAP animations, THREE.js effects, responsive navigation, theme toggle, and more
 * Last updated: May 07, 2025
 */

document.addEventListener('DOMContentLoaded', () => {
    // ===========================================================================
    // GLOBAL VARIABLES AND SETUP
    // ===========================================================================
    let lastScroll = 0; // Tracks last scroll position for header behavior
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /**
     * Initializes core functionality
     */
    function init() {
        adjustNavbarPosition();
        setupHeaderScroll();
        setupThemeToggle();
        setupMobileMenu();
        setupSmoothScroll();
        setupMouseTrail();
        setupLanguageToggle();
        setupDropdowns();
        setupActiveSectionHighlight();
        if (!prefersReducedMotion) {
            initProfileImageEffects();
            initHeroParticles();
            initHeroCanvasWaves();
            initGlowingParticles();
            initSectionAnimations();
            initSectionBackgrounds();
            initCtaButtonPulse();
            initClickParticles();
        }
    }

    // ===========================================================================
    // HEADER & NAVBAR
    // ===========================================================================
    /**
     * Adjusts navbar position based on header height
     */
    function adjustNavbarPosition() {
        const topHeader = document.querySelector('.top-header');
        const navbar = document.querySelector('#navbar');
        if (topHeader && navbar) {
            const topHeaderHeight = topHeader.offsetHeight;
            navbar.style.top = `${topHeaderHeight}px`;
            document.documentElement.style.setProperty('--top-header-height', `${topHeaderHeight}px`);
        }
    }

    /**
     * Manages header and navbar behavior on scroll
     */
    function setupHeaderScroll() {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            const header = document.querySelector('.top-header');
            const navbar = document.querySelector('#navbar');

            if (!header || !navbar) return;

            header.style.transition = 'transform 0.3s ease-out';
            navbar.style.transition = 'all 0.3s ease-out';

            if (currentScroll > lastScroll && currentScroll > 50) {
                header.style.transform = 'translateY(-100%)';
                header.classList.add('compact');
                navbar.style.top = '0';
                navbar.style.background = 'linear-gradient(to right, #1e293b, #2d3e50)';
                navbar.style.boxShadow = '0 10px 40px rgba(124, 58, 237, 0.7), 0 0 20px rgba(124, 58, 237, 0.3)';
                navbar.style.backdropFilter = 'blur(5px)';
            } else {
                header.style.transform = 'translateY(0)';
                header.classList.remove('compact');
                navbar.style.top = 'var(--top-header-height)';
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                navbar.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.7)';
                navbar.style.backdropFilter = 'none';
            }
            lastScroll = Math.max(currentScroll, 0);
        });

        window.addEventListener('resize', adjustNavbarPosition);
        window.addEventListener('load', adjustNavbarPosition);
    }

    // ===========================================================================
    // THEME TOGGLE
    // ===========================================================================
    /**
     * Toggles between light and dark themes with notification
     */
		function setupThemeToggle() {
		     const themeToggle = document.getElementById('theme-toggle');
		     const notification = document.getElementById('theme-notification');

		     if (!themeToggle || !notification) return;

		     const icon = themeToggle.querySelector('i');
		     if (!icon) return;

		     themeToggle.addEventListener('click', () => {
		         document.body.classList.toggle('light-mode');
		         icon.classList.toggle('fa-moon');
		         icon.classList.toggle('fa-sun');

		         // // Show notification only when switching to light mode
		         // if (document.body.classList.contains('light-mode')) {showThemeNotification();}
						 if (document.body.classList.contains('light-mode') && !sessionStorage.getItem('themeNotificationShown')) {
							showThemeNotification();
							// sessionStorage.setItem('themeNotificationShown', 'true');
						 }

		         if (typeof gsap !== 'undefined') {
		             document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
		             gsap.fromTo(document.body,
		                 { opacity: 0.8 },
		                 { opacity: 1, duration: 0.5, ease: 'power2.out' }
		             );
		         }
		     });

		     // Attach close button event listener
		     const closeBtn = notification.querySelector('.close-btn');
		     if (closeBtn) {
		         closeBtn.addEventListener('click', closeThemeNotification);
		     }
		 }

    /**
     * Shows theme notification with animation
     */
    function showThemeNotification() {
        const notification = document.getElementById('theme-notification');
        if (!notification) return;

        notification.classList.add('show');

        if (typeof gsap !== 'undefined') {
            gsap.fromTo(notification,
                { scale: 0.8, opacity: 0, y: 50 },
                { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' }
            );
        }

        // Auto-hide after 5 seconds
        setTimeout(closeThemeNotification, 5000);
    }

    /**
     * Closes theme notification with animation
     */
    function closeThemeNotification() {
        const notification = document.getElementById('theme-notification');
        if (!notification) return;

        if (typeof gsap !== 'undefined') {
            gsap.to(notification, {
                scale: 0.8,
                opacity: 0,
                y: 50,
                duration: 0.4,
                ease: 'power2.in',
                onComplete: () => {
                    notification.classList.remove('show');
                }
            });
        } else {
            notification.classList.remove('show');
        }
    }

    // ===========================================================================
    // MOBILE MENU
    // ===========================================================================
    /**
     * Sets up mobile menu toggle with animations
     */
    function setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        if (!hamburger) return;

        function toggleMenu() {
            const menu = document.getElementById('nav-menu');
            if (!menu) return;

            const isActive = menu.classList.contains('active');

            if (typeof gsap === 'undefined') {
                menu.classList.toggle('active');
                hamburger.classList.toggle('active');
                menu.style.display = isActive ? 'none' : 'flex';
                return;
            }

            gsap.killTweensOf('.nav-menu li');

            if (!isActive) {
                menu.style.display = 'flex';
                menu.classList.add('active');
                hamburger.classList.add('active');
                gsap.fromTo('.nav-menu li',
                    { opacity: 0, y: 50, scale: 0.9, rotationX: -15 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        rotationX: 0,
                        stagger: 0.1,
                        duration: 0.6,
                        ease: 'back.out(1.2)',
                        overwrite: 'auto'
                    }
                );
            } else {
                gsap.to('.nav-menu li', {
                    opacity: 0,
                    y: 50,
                    scale: 0.9,
                    rotationX: 15,
                    stagger: 0.1,
                    duration: 0.6,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        menu.classList.remove('active');
                        hamburger.classList.remove('active');
                        menu.style.display = 'none';
                        gsap.set('.nav-menu li', { clearProps: 'all' });
                    }
                });
            }
        }

        hamburger.addEventListener('click', toggleMenu);

        // Close menu on link click
        document.querySelectorAll('.nav-menu .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                const menu = document.getElementById('nav-menu');
                if (menu?.classList.contains('active')) {
                    gsap.to('.nav-menu li', {
                        opacity: 0,
                        y: 50,
                        scale: 0.9,
                        stagger: 0.1,
                        duration: 0.6,
                        ease: 'power2.out',
                        onComplete: () => {
                            menu.classList.remove('active');
                            hamburger.classList.remove('active');
                            menu.style.display = 'none';
                        }
                    });
                }
            });
        });
    }

    // ===========================================================================
    // SMOOTH SCROLL
    // ===========================================================================
    /**
     * Handles smooth scrolling for navigation links
     */
    function setupSmoothScroll() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (!targetElement) return;

                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                if (typeof gsap !== 'undefined' && typeof gsap.plugins.scrollTo !== 'undefined') {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: { y: targetElement, offsetY: 70 },
                        ease: 'power2.out'
                    });
                } else {
                    window.location.hash = targetId;
                }
            });
        });
    }

    // ===========================================================================
    // MOUSE TRAIL
    // ===========================================================================
    /**
     * Creates a glowing mouse trail effect
     */
    function setupMouseTrail() {
        document.addEventListener('mousemove', (e) => {
            if (prefersReducedMotion) return;

            const trail = document.createElement('div');
            trail.className = 'trail';
            trail.style.left = `${e.pageX}px`;
            trail.style.top = `${e.pageY}px`;
            trail.style.background = 'rgba(124, 58, 237, 0.7)';
            document.body.appendChild(trail);

            if (typeof gsap !== 'undefined') {
                gsap.to(trail, {
                    scale: 2.5,
                    opacity: 0,
                    x: (Math.random() - 0.5) * 20,
                    y: (Math.random() - 0.5) * 20,
                    duration: 0.7,
                    ease: 'power2.out',
                    onComplete: () => trail.remove()
                });
            } else {
                setTimeout(() => trail.remove(), 700);
            }
        });
    }

    // ===========================================================================
    // LANGUAGE TOGGLE
    // ===========================================================================
    /**
     * Switches between English and Arabic
     */
    function setupLanguageToggle() {
        const languageToggle = document.getElementById('language-toggle');
        if (!languageToggle) return;

        languageToggle.addEventListener('change', (e) => {
            const lang = e.target.value;
            document.querySelectorAll('[data-en][data-ar]').forEach(element => {
                element.textContent = lang === 'ar' ? element.getAttribute('data-ar') : element.getAttribute('data-en');
            });
            document.body.style.direction = lang === 'ar' ? 'rtl' : 'ltr';
            document.body.style.fontFamily = lang === 'ar' ? "'Tajawal', sans-serif" : "'Poppins', sans-serif'";

            // Show notification when switching to Arabic
            if (lang === 'ar') {
                showNotification();
            }

            if (typeof gsap !== 'undefined') {
                gsap.fromTo('body > *',
                    { opacity: 0.5 },
                    { opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out' }
                );
            }
        });
    }

    /**
     * Shows language notification with animation
     */
    function showNotification() {
        const notification = document.getElementById('lang-notification');
        if (!notification) return;

        notification.classList.add('active');

        if (typeof gsap !== 'undefined') {
            gsap.fromTo(notification,
                { scale: 0.8, opacity: 0, y: 50 },
                { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' }
            );
        }

        // Auto-hide after 5 seconds
        setTimeout(closeNotification, 5000);
    }

    /**
     * Closes language notification with animation
     */
    function closeNotification() {
        const notification = document.getElementById('lang-notification');
        if (!notification) return;

        if (typeof gsap !== 'undefined') {
            gsap.to(notification, {
                scale: 0.8,
                opacity: 0,
                y: 50,
                duration: 0.4,
                ease: 'power2.in',
                onComplete: () => {
                    notification.classList.remove('active');
                }
            });
        } else {
            notification.classList.remove('active');
        }
    }

    // Attach close button event listener
    const closeBtn = document.querySelector('#lang-notification .close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeNotification);
    }

    // ===========================================================================
    // DROPDOWN MENUS
    // ===========================================================================
    /**
     * Manages dropdown menus for mobile and desktop
     */
    function setupDropdowns() {
        function populateDropdown() {
            const dropdownContent = document.querySelector('.dropdown-content');
            const dropdownItems = document.querySelectorAll('.dropdown-item .nav-link');
            if (window.innerWidth >= 769 && dropdownContent) {
                dropdownContent.innerHTML = '';
                dropdownItems.forEach(item => {
                    const clone = item.cloneNode(true);
                    dropdownContent.appendChild(clone);
                });
            }
        }

        window.addEventListener('load', populateDropdown);
        window.addEventListener('resize', populateDropdown);

        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.addEventListener('click', (e) => {
                if (window.innerWidth <= 991) {
                    const content = dropdown.querySelector('.dropdown-content');
                    if (!content) return;

                    dropdown.classList.toggle('active');
                    const isOpen = dropdown.classList.contains('active');

                    if (typeof gsap !== 'undefined') {
                        gsap.to(content, {
                            height: isOpen ? 'auto' : 0,
                            opacity: isOpen ? 1 : 0,
                            duration: 0.4,
                            ease: 'power2.out',
                            onStart: () => { if (isOpen) content.style.display = 'block'; },
                            onComplete: () => { if (!isOpen) content.style.display = 'none'; }
                        });
                    } else {
                        content.style.display = isOpen ? 'block' : 'none';
                    }
                    e.preventDefault();
                }
            });

            if (typeof gsap !== 'undefined') {
                dropdown.addEventListener('mouseenter', () => {
                    if (window.innerWidth > 991) {
                        gsap.to(dropdown, { boxShadow: '0 0 15px rgba(124, 58, 237, 0.4)', duration: 0.3 });
                    }
                });
                dropdown.addEventListener('mouseleave', () => {
                    gsap.to(dropdown, { boxShadow: 'none', duration: 0.3 });
                });
            }
        });
    }

    // ===========================================================================
    // HERO ANIMATIONS
    // ===========================================================================
    /**
     * Initializes hero section animations
     */
    function initHeroAnimations() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        gsap.registerPlugin(ScrollTrigger);

        const heroImg = document.querySelector('.animate-hero img');
        const heroH1 = document.querySelector('.animate-hero h1');
        const heroP = document.querySelector('.animate-hero p');
        const heroA = document.querySelector('.animate-hero a');

        gsap.timeline()
            .fromTo(heroImg,
                { opacity: 0, scale: 0.5, y: -100, rotation: 10 },
                { opacity: 1, scale: 1, y: 0, rotation: 0, duration: 2.5, ease: 'elastic.out(1, 0.3)' }
            )
            .from(heroH1,
                { opacity: 0, y: 150, skewY: 15, scale: 0.8 },
                { opacity: 1, y: 0, skewY: 0, scale: 1, duration: 1.8, ease: 'power4.out' }, '-=2'
            )
            .from(heroP,
                { opacity: 0, y: 100, filter: 'blur(5px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power4.out' }, '-=1.5'
            )
            .from(heroA,
                { opacity: 0, y: 50, rotation: -30, scale: 0.7 },
                { opacity: 1, y: 0, rotation: 0, scale: 1, duration: 1.2, ease: 'back.out(1.7)' }, '-=1'
            );
    }

    // ===========================================================================
    // PROFILE IMAGE EFFECTS
    // ===========================================================================
    /**
     * Adds 3D and energy wave effects to profile image
     */
    function initProfileImageEffects() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        const profileImg = document.querySelector('.profile-img');
        if (!profileImg) return;

        // 3D Effect
        gsap.to(profileImg, {
            y: () => -window.innerHeight * 0.1,
            rotationY: () => Math.sin(window.scrollY * 0.008) * 20,
            rotationX: () => Math.cos(window.scrollY * 0.008) * 15,
            scale: 1.15,
            transform: 'perspective(1000px) translateZ(50px)',
            filter: 'drop-shadow(0 0 35px rgba(0, 209, 235, 0.8)) brightness(1.2)',
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 0.6
            }
        });

        // Energy Waves
        const energyWaves = document.createElement('div');
        energyWaves.className = 'energy-waves';
        profileImg.parentElement.appendChild(energyWaves);

        gsap.to(energyWaves, {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top center',
                end: 'bottom top',
                scrub: 1
            },
            width: '150%',
            height: '150%',
            opacity: 0.8,
            duration: 3,
            ease: 'sine.inOut'
        });
    }

    // ===========================================================================
    // HERO PARTICLES (THREE.JS)
    // ===========================================================================
    /**
     * Adds interactive particle system to hero section
     */
    function initHeroParticles() {
        if (typeof THREE === 'undefined') return;

        const hero = document.querySelector('.hero');
        if (!hero) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        hero.appendChild(renderer.domElement);

        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 2000;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.025,
            color: new THREE.Color(0x00ddeb),
            transparent: true,
            blending: THREE.AdditiveBlending
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);
        camera.position.z = 5;

        const pointLight = new THREE.PointLight(0x7c3aed, 1.5);
        pointLight.position.set(2, 3, 4);
        scene.add(pointLight);

        document.addEventListener('mousemove', (e) => {
            particlesMesh.rotation.x = (e.clientY / window.innerHeight) * 2;
            particlesMesh.rotation.y = (e.clientX / window.innerWidth) * 2;
        });

        function animate() {
            requestAnimationFrame(animate);
            particlesMesh.rotation.y += 0.001;
            renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        });
    }

    // ===========================================================================
    // HERO CANVAS WAVES
    // ===========================================================================
    /**
     * Creates wave effect in hero section
     */
    function initHeroCanvasWaves() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const heroCanvas = document.createElement('canvas');
        heroCanvas.className = 'hero-waves absolute left-0';
        heroCanvas.style.cssText = `
            top: 40% !important;
        `;
        hero.prepend(heroCanvas);
        const ctx = heroCanvas.getContext('2d');
        if (!ctx) return;

        function resizeHeroCanvas() {
            heroCanvas.width = heroCanvas.offsetWidth;
            heroCanvas.height = heroCanvas.offsetHeight;
        }
        resizeHeroCanvas();
        window.addEventListener('resize', resizeHeroCanvas);

        let time = 0;
        function drawWaves() {
            ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
            time += 0.05;
            for (let i = 0; i < 3; i++) {
                let radius = 50 + Math.sin(time + i) * 20;
                ctx.beginPath();
                ctx.arc(heroCanvas.width / 2, heroCanvas.height / 2, radius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(124, 58, 237, ${0.5 - i * 0.1})`;
                ctx.lineWidth = 2;
                ctx.stroke();
            }
            requestAnimationFrame(drawWaves);
        }
        drawWaves();
    }

    // ===========================================================================
    // GLOWING PARTICLES
    // ===========================================================================
    /**
     * Creates glowing particles effect on canvas
     */
    function initGlowingParticles() {
        const canvas = document.getElementById('canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles = [];
        const particleCount = 150;

        function resizeCanvas() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.brightness = Math.random() * 0.5 + 0.5;
            }

            update(scrollProgress) {
                this.x += this.speedX;
                this.y += this.speedY + scrollProgress * 2;
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
                this.brightness = Math.sin(Date.now() * 0.002 + this.x * 0.01) * 0.3 + 0.7;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 209, 235, ${this.brightness})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const scrollProgress = window.scrollY / (document.querySelector('.hero')?.offsetHeight || 1);
            particles.forEach(particle => {
                particle.update(scrollProgress);
                particle.draw();
            });
            requestAnimationFrame(animateParticles);
        }
        animateParticles();

        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            particles.forEach(particle => {
                const dx = particle.x - mouseX;
                const dy = particle.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    particle.speedX += dx * 0.001;
                    particle.speedY += dy * 0.001;
                }
            });
        });
    }

    // ===========================================================================
    // THREE.JS BACKGROUND
    // ===========================================================================
    /**
     * Initializes 3D background with torus knot and particles
     */
    function initThreeJsBackground() {
        const canvas = document.getElementById('canvas');
        if (!canvas || typeof THREE === 'undefined') return;
        if (canvas && typeof THREE !== 'undefined') {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);

            const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
            const material = new THREE.MeshPhongMaterial({ color: 0x7c3aed, wireframe: true, emissive: 0x4a00b5 });
            const torusKnot = new THREE.Mesh(geometry, material);
            scene.add(torusKnot);

            const light = new THREE.PointLight(0xffffff, 1, 100);
            light.position.set(0, 0, 30);
            scene.add(light);

            const particlesGeometry = new THREE.BufferGeometry();
            const particlesCount = 5000;
            const posArray = new Float32Array(particlesCount * 3);
            const velocities = new Float32Array(particlesCount * 3);
            for (let i = 0; i < particlesCount * 3; i++) {
                posArray[i] = (Math.random() - 0.5) * 500;
                velocities[i] = (Math.random() - 0.5) * 0.1;
            }
            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            const particlesMaterial = new THREE.PointsMaterial({
                size: 1.5,
                color: 0x00ddeb,
                transparent: true,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            });
            const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
            scene.add(particlesMesh);

            camera.position.z = 30;

            let mouseX = 0, mouseY = 0;
            document.addEventListener('mousemove', (e) => {
                mouseX = (e.clientX / window.innerWidth) * 2 - 1;
                mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
            });

            function animate() {
                requestAnimationFrame(animate);
                torusKnot.rotation.x += 0.01;
                torusKnot.rotation.y += 0.01;

                const positions = particlesMesh.geometry.attributes.position.array;
                for (let i = 0; i < particlesCount * 3; i += 3) {
                    positions[i] += velocities[i] + mouseX * 0.02;
                    positions[i + 1] += velocities[i + 1] + mouseY * 0.02;
                    positions[i + 2] += velocities[i + 2];
                    if (Math.abs(positions[i]) > 250) velocities[i] *= -1;
                    if (Math.abs(positions[i + 1]) > 250) velocities[i + 1] *= -1;
                }
                particlesMesh.geometry.attributes.position.needsUpdate = true;
                particlesMesh.rotation.y += 0.002;

                renderer.render(scene, camera);
            }
            animate();

            window.addEventListener('resize', () => {
                renderer.setSize(window.innerWidth, window.innerHeight);
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
            });
        }
    }

    // ===========================================================================
    // SECTION ANIMATIONS
    // ===========================================================================
    /**
     * Initializes animations for sections
     */
    function initSectionAnimations() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        gsap.utils.toArray('.animate-section').forEach((el, i) => {
            gsap.from(el, {
                opacity: 0,
                y: 150,
                scale: 0.9,
                rotation: i % 2 === 0 ? -10 : 10,
                duration: 1.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.from(title, {
                opacity: 0,
                y: 200,
                scale: 0.8,
                duration: 1.8,
                ease: 'power4.out',
                scrollTrigger: { trigger: title, start: 'top 80%' }
            });
        });

        gsap.from('.footer-col', {
            opacity: 0,
            y: 80,
            duration: 0, // 1.5
            stagger: { amount: 0.5, from: 'center' },
            ease: 'sine.out',
            scrollTrigger: { trigger: '.main-footer', start: 'top 80%' }
        });

        gsap.utils.toArray('section').forEach(section => {
            const elements = section.querySelectorAll('.animate-section, .section-title');
            gsap.from(elements, {
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    }

    // ===========================================================================
    // SECTION BACKGROUNDS
    // ===========================================================================
    /**
     * Adds 3D particle backgrounds to sections
     */
    function initSectionBackgrounds() {
        if (typeof THREE === 'undefined') return;

        document.querySelectorAll('section').forEach(section => {
            const canvas = document.createElement('canvas');
            canvas.className = 'section-bg';
            section.style.position = 'relative';
            canvas.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: -1;
            `;
            section.prepend(canvas);

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, section.offsetWidth / section.offsetHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
            renderer.setSize(section.offsetWidth, section.offsetHeight);

            const particlesGeometry = new THREE.BufferGeometry();
            const particlesCount = 1000;
            const posArray = new Float32Array(particlesCount * 3);
            for (let i = 0; i < particlesCount * 3; i++) {
                posArray[i] = (Math.random() - 0.5) * 100;
            }
            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            const particlesMaterial = new THREE.PointsMaterial({
                size: 0.5,
                color: 0x7c3aed,
                transparent: true,
                blending: THREE.AdditiveBlending
            });
            const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
            scene.add(particlesMesh);

            camera.position.z = 50;

            function animate() {
                requestAnimationFrame(animate);
                particlesMesh.rotation.y += 0.001;
                renderer.render(scene, camera);
            }
            animate();

            window.addEventListener('resize', () => {
                renderer.setSize(section.offsetWidth, section.offsetHeight);
                camera.aspect = section.offsetWidth / section.offsetHeight;
                camera.updateProjectionMatrix();
            });
        });
    }

    // ===========================================================================
    // ACTIVE SECTION HIGHLIGHT
    // ===========================================================================
    /**
     * Highlights active navigation link based on scroll position
     */
    function setupActiveSectionHighlight() {
        if (typeof ScrollTrigger === 'undefined') return;

        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        sections.forEach(section => {
            ScrollTrigger.create({
                trigger: section,
                start: 'top 20%',
                end: 'bottom 20%',
                onEnter: () => {
                    const id = section.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                },
                onEnterBack: () => {
                    const id = section.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }

    // ===========================================================================
    // CTA BUTTON ANIMATION
    // ===========================================================================
    /**
     * Adds pulsing effect to CTA button
     */
    function initCtaButtonPulse() {
        const ctaButton = document.querySelector('.animate-hero a');
        if (!ctaButton || typeof gsap === 'undefined') return;

        gsap.to(ctaButton, {
            boxShadow: '0 0 10px rgba(124, 58, 237, 0.5), 0 0 20px rgba(124, 58, 237, 0.3)',
            repeat: -1,
            yoyo: true,
            duration: 1.5,
            ease: 'sine.inOut'
        });
    }

    // ===========================================================================
    // CLICK PARTICLES
    // ===========================================================================
    /**
     * Creates particle burst on click
     */
    function initClickParticles() {
        document.addEventListener('click', (e) => {
            if (prefersReducedMotion || typeof gsap === 'undefined') return;

            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'trail';
                particle.style.left = `${e.pageX}px`;
                particle.style.top = `${e.pageY}px`;
                particle.style.background = `hsl(${Math.random() * 360}, 70%, 50%)`;
                document.body.appendChild(particle);

                gsap.to(particle, {
                    x: (Math.random() - 0.5) * 100,
                    y: (Math.random() - 0.5) * 100,
                    scale: 0,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    onComplete: () => particle.remove()
                });
            }
        });
    }

    // ===========================================================================
    // PERFORMANCE OPTIMIZATIONS
    // ===========================================================================
    if (prefersReducedMotion) {
        const canvas = document.getElementById('canvas');
        if (canvas) canvas.style.display = 'none';
        if (typeof gsap !== 'undefined') {
            gsap.set('.profile-img', { filter: 'drop-shadow(0 0 10px rgba(0, 209, 235, 0.5))' });
            gsap.globalTimeline.timeScale(2);
        }
        document.querySelectorAll('.section-bg').forEach(canvas => canvas.remove());
    }

    // Initialize everything
    init();
});
