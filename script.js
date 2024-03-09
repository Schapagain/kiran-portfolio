import * as $ from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

const canvas = document.querySelector("canvas.webgl");

const scene = new $.Scene();

// Environment map
const rbgeLoader = new RGBELoader();
rbgeLoader.load(
  "./textures/environmentMap/the_sky_is_on_fire_1k.hdr",
  (map) => {
    map.mapping = $.EquirectangularReflectionMapping;
    scene.environment = map;
  }
);

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

// const controls = new OrbitControls(camera, canvas);
// controls.target.set(0, 1, 0);
// controls.enableDamping = true;
// controls.maxZoom = 2;

/**
 * Renderer
 */
const renderer = new $.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.shadowMap.enabled = true;
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
  //   controls.update();

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
