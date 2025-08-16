// Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
    }, 1000); // Simulate loading time
});

// Dark/Light Mode Switcher
const modeSwitcher = document.createElement('button');
modeSwitcher.textContent = 'Toggle Mode';
modeSwitcher.style.position = 'fixed';
modeSwitcher.style.top = '1rem';
modeSwitcher.style.right = '1rem';
modeSwitcher.style.zIndex = '1001';
document.body.appendChild(modeSwitcher);

modeSwitcher.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Placeholder for other animations
// Hero animation, gallery animations, etc.
// will be added here.

function initThreeJSBackground() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background

    document.getElementById('hero').appendChild(renderer.domElement);

    const particles = new THREE.Group();
    const particleGeometry = new THREE.SphereGeometry(0.02, 16, 16);
    const particleMaterial = new THREE.MeshBasicMaterial({ color: 0x6B4226 }); // Brown

    for (let i = 0; i < 500; i++) {
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        particle.position.x = (Math.random() - 0.5) * 10;
        particle.position.y = (Math.random() - 0.5) * 10;
        particle.position.z = (Math.random() - 0.5) * 10;
        particles.add(particle);
    }

    scene.add(particles);
    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        if (document.body.classList.contains('dark-mode')) {
            particleMaterial.color.setHex(0xF5DEB3); // Wheat
        } else {
            particleMaterial.color.setHex(0x6B4226); // Brown
        }
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.001;
        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

initThreeJSBackground();

function initContactAnimation() {
    const container = document.getElementById('contact-canvas-container');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.DodecahedronGeometry(1, 0);
    const material = new THREE.MeshBasicMaterial({ color: 0x8B4513 }); // SaddleBrown
    const dodecahedron = new THREE.Mesh(geometry, material);
    scene.add(dodecahedron);

    camera.position.z = 5;

    const mouse = new THREE.Vector2();
    const target = new THREE.Vector2();
    const windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);

    function onMouseMove(event) {
        mouse.x = (event.clientX - windowHalf.x);
        mouse.y = (event.clientY - windowHalf.y);
    }

    document.addEventListener('mousemove', onMouseMove, false);

    function animate() {
        target.x = (1 - mouse.x) * 0.0002;
        target.y = (1 - mouse.y) * 0.0002;

        if (document.body.classList.contains('dark-mode')) {
            material.color.setHex(0xF5DEB3); // Wheat
        } else {
            material.color.setHex(0x8B4513); // SaddleBrown
        }

        dodecahedron.rotation.x += 0.05 * (target.y - dodecahedron.rotation.x);
        dodecahedron.rotation.y += 0.05 * (target.x - dodecahedron.rotation.y);

        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
    });
}

initContactAnimation();

function initSoundEffects() {
    const hoverSound = document.getElementById('hover-sound');
    const clickSound = document.getElementById('click-sound');

    const interactiveElements = document.querySelectorAll('a, button, .card');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (hoverSound) {
                hoverSound.currentTime = 0;
                hoverSound.play();
            }
        });

        element.addEventListener('click', () => {
            if (clickSound) {
                clickSound.currentTime = 0;
                clickSound.play();
            }
        });
    });
}

initSoundEffects();
