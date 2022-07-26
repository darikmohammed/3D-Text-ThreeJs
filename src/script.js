import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'lil-gui';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';


// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('/textures/matcaps/4.png');
const matcapTexture2 = textureLoader.load('/textures/matcaps/6.png');
const matcapTexture3 = textureLoader.load('/textures/matcaps/1.png');
/**
 * Text
 */
const fontloader = new FontLoader();
const material = new THREE.MeshMatcapMaterial();
const materialTwo = new THREE.MeshMatcapMaterial();
const materialThree = new THREE.MeshMatcapMaterial();
material.matcap = matcapTexture;
materialTwo.matcap = matcapTexture2;
materialThree.matcap = matcapTexture3;

fontloader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
  const softwareGeometry = new TextGeometry('Front-End Developer', {
    font,
    size: 0.3,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });

  const textGeometry = new TextGeometry('< Darik M />', {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });

  textGeometry.center();
  softwareGeometry.center();

  const text = new THREE.Mesh(textGeometry, material);
  const software = new THREE.Mesh(softwareGeometry, material);
  software.position.y = -1;
  scene.add(text);
  scene.add(software);
});

const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45);
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const coneGeometry = new THREE.ConeGeometry(0.5, 1, 20);

for (let i = 0; i < 100; i++) {
  const donut = new THREE.Mesh(donutGeometry, material);
  const box = new THREE.Mesh(cubeGeometry, materialTwo);
  const cone = new THREE.Mesh(coneGeometry, materialThree);

  const donutScaleValue = Math.random();
  const boxScaleValue = Math.random();
  const coneScaleValue = Math.random();

  donut.position.x = (Math.random() - 0.5) * 20;
  donut.position.y = (Math.random() - 0.5) * 20;
  donut.position.z = (Math.random() - 0.5) * 20;
  donut.rotation.x = Math.PI * Math.random();
  donut.rotation.y = Math.PI * Math.random();
  donut.scale.set(donutScaleValue, donutScaleValue, donutScaleValue);

  box.position.y = (Math.random() - 0.5) * 25;
  box.position.z = (Math.random() - 0.5) * 25;
  box.position.x = (Math.random() - 0.5) * 25;
  box.rotation.x = Math.PI * Math.random();
  box.rotation.y = Math.PI * Math.random();
  box.scale.set(boxScaleValue, boxScaleValue, boxScaleValue);

  cone.position.y = (Math.random() - 0.5) * 25;
  cone.position.z = (Math.random() - 0.5) * 25;
  cone.position.x = (Math.random() - 0.5) * 25;
  cone.rotation.x = Math.PI * Math.random();
  cone.rotation.y = Math.PI * Math.random();
  cone.scale.set(coneScaleValue, coneScaleValue, coneScaleValue);

  scene.add(box);
  scene.add(donut);
  scene.add(cone);
}
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
