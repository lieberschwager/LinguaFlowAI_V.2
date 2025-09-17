// main.js - Komplette, finale Version mit allen Anpassungen

import * as THREE from './libs/three.module.js';

// --- Modul zur Steuerung der Benutzeroberfläche ---
const uiManager = (() => {
    const setupNavigation = () => {
        const navButtons = document.querySelectorAll('.nav-btn');
        const modules = document.querySelectorAll('.app-module');
        const exploreBtn = document.getElementById('btn-explore-language');

        navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const targetModuleId = e.currentTarget.dataset.target;

                modules.forEach(module => {
                    if (module.id === targetModuleId) {
                        module.classList.add('active');
                    } else {
                        module.classList.remove('active');
                    }
                });

                navButtons.forEach(btn => btn.classList.remove('active'));
                e.currentTarget.classList.add('active');

                // Spezielle Aktion beim Wechsel zum Vokabeltrainer
                if (targetModuleId === 'module-vokabeltrainer') {
                    vocabTrainer.refresh();
                }
            });
        });

        // Button auf dem Globus, um zum Vokabeltrainer zu wechseln
        if (exploreBtn) {
            exploreBtn.addEventListener('click', () => {
                document.getElementById('module-globus').classList.remove('active');
                document.getElementById('module-vokabeltrainer').classList.add('active');
                document.querySelector('.nav-btn[data-target="module-vokabeltrainer"]').classList.add('active');
                document.querySelector('.nav-btn[data-target="module-globus"]').classList.remove('active');
                vocabTrainer.refresh();
            });
        }
    };

    const setupWordCardFlip = () => {
        const wordCard = document.querySelector('.word-card');
        if (wordCard) {
            wordCard.addEventListener('click', () => {
                wordCard.classList.toggle('flipped');
            });
        }
    };

    return {
        init: () => {
            setupNavigation();
            setupWordCardFlip();
        }
    };
})();

// --- Dummy-Daten für den Vokabeltrainer ---
const dummyWords = [
    { word: "Hallo", translation: "Hello" },
    { word: "Tschüss", translation: "Goodbye" },
    { word: "Sprache", translation: "Language" },
    { word: "Welt", translation: "World" },
    { word: "Lernen", translation: "To learn" },
];

// --- Vokabeltrainer-Logik ---
const vocabTrainer = (() => {
    let currentWordIndex = 0;
    const wordCard = document.querySelector('.word-card');
    const wordText = document.querySelector('.word-text');
    const wordTranslation = document.querySelector('.word-translation');
    const nextButton = document.getElementById('btn-next-word');

    const updateWordCard = () => {
        const currentWord = dummyWords[currentWordIndex];
        if (wordText && wordTranslation) {
            wordText.textContent = currentWord.word;
            wordTranslation.textContent = currentWord.translation;
            if (wordCard) wordCard.classList.remove('flipped');
        }
    };

    const setupControls = () => {
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                currentWordIndex = (currentWordIndex + 1) % dummyWords.length;
                updateWordCard();
            });
        }
    };

    return {
        init: () => {
            updateWordCard();
            setupControls();
        },
        refresh: () => {
            updateWordCard();
            setupControls();
        }
    };
})();

// --- Globus-Logik (Three.js Integration) ---
const globeRenderer = (() => {
    let scene, camera, renderer, globe;

    const initGlobe = () => {
        const canvas = document.getElementById('globeCanvas');
        if (!canvas) {
            console.error('Canvas element with ID "globeCanvas" not found.');
            return;
        }

        // Szene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);

        // Kamera
        camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        camera.position.z = 1.7;

        // Renderer
        renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x000000, 0);

        // Globus Geometrie
        const geometry = new THREE.SphereGeometry(1, 64, 64);

        // Texturen laden (JETZT MIT KLEINEREN DATEIEN)
        const textureLoader = new THREE.TextureLoader();
        const earthTexture = textureLoader.load('./assets/earth_atmos_1024.jpg');
        const earthBumpMap = textureLoader.load('./assets/earth_specular_1024.jpg');

        // Globus Material (MeshPhongMaterial für Lichteffekte)
        const material = new THREE.MeshPhongMaterial({
            map: earthTexture,
            bumpMap: earthBumpMap,
            bumpScale: 0.05,
            specular: new THREE.Color('grey'),
            shininess: 10,
        });

        globe = new THREE.Mesh(geometry, material);
        scene.add(globe);

        // Licht für Schatten und Glanz
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(5, 3, 5);
        scene.add(directionalLight);

        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);
            globe.rotation.y += 0.002;
            renderer.render(scene, camera);
        };

        // Responsiveness
        const onWindowResize = () => {
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };
        window.addEventListener('resize', onWindowResize);

        animate();
    };

    return {
        init: initGlobe
    };
})();


// --- Initialisierung der App ---
document.addEventListener('DOMContentLoaded', () => {
    uiManager.init();
    globeRenderer.init();
    vocabTrainer.init();
});
