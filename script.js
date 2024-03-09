import * as $ from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

const canvas = document.querySelector("canvas.webgl");

const scene = new $.Scene();

const gltfLoader = new GLTFLoader();
let abstractShape;

gltfLoader.load("/models/knot.gltf", (gltf) => {
  abstractShape = gltf.scene;
  abstractShape.scale.set(0.015, 0.015, 0.015);
  abstractShape.rotateY(Math.PI / 3);
  scene.add(abstractShape);
});

const sizes = {
  width: 500,
  height: 500,
};

/**
 * Camera
 */
// Base camera
const camera = new $.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.01,
  1000
);
camera.position.set(0, 0, 7);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0, 0);
controls.enableDamping = true;
controls.enableZoom = false;

const ambientLight = new $.AmbientLight(0xffffff, 2.4);
scene.add(ambientLight);

const envColorLight = new $.DirectionalLight(0xffc9c9, 2);
envColorLight.position.set(2, 0, 8);

const directionalLight = new $.DirectionalLight(0xffffff, 3);
directionalLight.castShadow = true;
directionalLight.position.set(2, 0, 8);

const directionalLight2 = new $.DirectionalLight(0xffffff, 3);
directionalLight2.castShadow = true;
directionalLight2.position.set(-2, 0, -8);

scene.add(directionalLight, directionalLight2, envColorLight);

// Environment map
const rbgeLoader = new RGBELoader();
rbgeLoader.load(
  "./textures/environmentMap/the_sky_is_on_fire_1k.hdr",
  (map) => {
    map.mapping = $.EquirectangularReflectionMapping;
    scene.environment = map;
    directionalLight.intensity = 0.5;
    directionalLight2.intensity = 0.5;
  }
);

/**
 * Renderer
 */
const renderer = new $.WebGLRenderer({
  canvas: canvas,
  alpha: true,
  antialias: true,
});
renderer.shadowMap.enabled = false;
renderer.shadowMap.type = $.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new $.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  // Update controls
  controls.update();

  //   Rotate shape
  if (abstractShape) {
    abstractShape.rotateY(0.001);
  }

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
