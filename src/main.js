import * as THREE from './libs/three.module.js';

// === Modul Navigation ===
const navButtons = document.querySelectorAll(".nav-btn");
const modules = document.querySelectorAll(".app-module");

navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-target");

    modules.forEach((mod) => {
      mod.classList.add("hidden");
      mod.classList.remove("active");
    });

    document.getElementById(target).classList.remove("hidden");
    document.getElementById(target).classList.add("active");

    navButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// === Globus Setup ===
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("globeCanvas");
  if (!canvas) {
    console.error("Canvas mit ID 'globeCanvas' nicht gefunden.");
    return;
  }

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(canvas.width, canvas.height);
  renderer.setClearColor(0x000000, 0);
  renderer.outputEncoding = THREE.sRGBEncoding;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
  camera.position.set(0, 0, 5);
  camera.lookAt(scene.position);

  const light = new THREE.DirectionalLight(0xffffff, 2.5);
  light.position.set(0, 0, 5);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xffffff, 0.5));

  const textureLoader = new THREE.TextureLoader();
  const colorMap = textureLoader.load("https://raw.githubusercontent.com/lieberschwager/LinguaFlowAI/main/app/src/main/assets/textures/earth_day_v2.jpg");
  const bumpMap = textureLoader.load("https://raw.githubusercontent.com/lieberschwager/LinguaFlowAI/main/app/src/main/assets/textures/earth_relief_exr.png");

  const globeMaterial = new THREE.MeshPhongMaterial({
    map: colorMap,
    bumpMap: bumpMap,
    bumpScale: 0.05,
    shininess: 10,
    specular: new THREE.Color(0x333333),
  });

  const globeGeometry = new THREE.SphereGeometry(1.8, 64, 64);
  const globe = new THREE.Mesh(globeGeometry, globeMaterial);
  globe.rotation.y = Math.PI;

  const globeGroup = new THREE.Group();
  globeGroup.add(globe);
  scene.add(globeGroup);

  function animate() {
    requestAnimationFrame(animate);
    globeGroup.rotation.y += 0.001;
    renderer.render(scene, camera);
  }

  animate();
});

// === Vokabeltrainer Flip ===
const wordCard = document.querySelector(".word-card");
if (wordCard) {
  wordCard.addEventListener("click", () => {
    wordCard.classList.toggle("flipped");
  });
}

const nextWordBtn = document.getElementById("btn-next-word");
if (nextWordBtn) {
  nextWordBtn.addEventListener("click", () => {
    alert("Nächstes Wort kommt später 🚀");
  });
}

// === Button Sprachen entdecken ===
const exploreBtn = document.getElementById("btn-explore-language");
if (exploreBtn) {
  exploreBtn.addEventListener("click", () => {
    alert("Sprachen-Explorer in Arbeit 🌍");
  });
}