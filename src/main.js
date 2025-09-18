// src/main.js
import * as THREE from './libs/three.module.js';

// === Globus Setup ===
const canvas = document.getElementById("globeCanvas");

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(550, 550);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
camera.position.z = 2;

// Erde laden
const texture = new THREE.TextureLoader().load("./assets/earth_atmos_2048.jpg");
const geometry = new THREE.SphereGeometry(0.9, 64, 64);
const material = new THREE.MeshBasicMaterial({ map: texture });
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

// Licht (für realistischeres Bild)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(2, 2, 3).normalize();
scene.add(directionalLight);

// Animation
function animate() {
  requestAnimationFrame(animate);
  globe.rotation.y += 0.002; // Rotation des Globus
  renderer.render(scene, camera);
}
animate();

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