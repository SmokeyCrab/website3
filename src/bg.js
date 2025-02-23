import * as THREE from "three";
import { throttle } from "lodash-es";

// Canvas
const canvas = document.querySelector("canvas.bg");

// Scene
const scene = new THREE.Scene();

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//////////////////////////////////////////

// MATERIAL
const material = new THREE.MeshStandardMaterial({
  roughness: 0,
  metalness: 0,
  transparent: true,
  opacity: 0.3,
});
material.color = new THREE.Color(0xffffff);
//material.roughness = 0;
//material.metalness = 1;

// GEOMETRIES
const geometrySphere = new THREE.SphereGeometry(0.5, 32, 32);

// MESHES
const sphere = new THREE.Mesh(geometrySphere, material);

sphere.position.x = 0;

scene.add(sphere);

const camera = new THREE.PerspectiveCamera(
  75, // FOV
  sizes.width / sizes.height, // aspect ratio
  0.1, // near
  100, // far
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 1;
scene.add(camera);

// Lights
// Point light
const ambientLight = new THREE.AmbientLight(0xfba0e3, 2.875);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight(0xfbfbf6, 5);
directionalLight.position.set(0, -3, 0);
directionalLight.castShadow = false;
scene.add(directionalLight);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.render(scene, camera);

const clock = new THREE.Clock();

window.addEventListener(
  "resize",
  throttle(
    () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
    },
    500,
    { trailing: true },
  ),
);

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects

  directionalLight.position.x = Math.cos(elapsedTime / 2);
  directionalLight.position.z = Math.sin(elapsedTime / 2);
  directionalLight.target = sphere;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
