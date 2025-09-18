// src/main.js
import * as THREE from 'three';

// Navigation zwischen den Modulen
const navButtons = document.querySelectorAll('.nav-btn');
const modules = document.querySelectorAll('.app-module');

navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-target');

    modules.forEach(mod => {
      if (mod.id === target) {
        mod.classList.add('active');
        mod.classList.remove('hidden');
      } else {
        mod.classList.remove('active');
        mod.classList.add('hidden');
      }
    });

    navButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Globus Setup mit Three.js
const canvas = document.getElementById('globeCanvas');
if (canvas) {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
  });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 3, 5);
  scene.add(light);

  const textureLoader = new THREE.TextureLoader();
  const earthTexture = textureLoader.load('./assets/earth_atmos_2048.jpg');
  const earthSpecular = textureLoader.load('./assets/earth_specular_2048.jpg');

  const geometry = new THREE.SphereGeometry(2, 64, 64);
  const material = new THREE.MeshPhongMaterial({
    map: earthTexture,
    specularMap: earthSpecular,
    shininess: 10
  });

  const earth = new THREE.Mesh(geometry, material);
  scene.add(earth);

  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);
    earth.rotation.y += 0.002;
    renderer.render(scene, camera);
  }

  animate();
}