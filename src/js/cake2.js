import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

const cakeUrl = new URL("../assets/model/cake19.glb", import.meta.url);
const textHappy = new URL("../assets/model/textHappy3.glb", import.meta.url);
const logo = new URL("../assets/model/logo4.glb", import.meta.url);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
container.appendChild(renderer.domElement);

const pmremGenerator = new THREE.PMREMGenerator(renderer);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x9ed6ef);
scene.fog = new THREE.Fog( 0xa0a0a0, 10, 50 );
scene.environment = pmremGenerator.fromScene(
  new RoomEnvironment(),
  0.04
).texture;

const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  1,
  100
);
camera.position.set(5, 2, 8);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.5, 0);
controls.update();
controls.enablePan = false;
controls.enableDamping = true;

const hemiLight = new THREE.HemisphereLight(0xffffff, 0.4);
hemiLight.position.set(0, 10, 15);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
dirLight.position.set(-3, 10, -10);
scene.add(dirLight);

// const light = new THREE.DirectionalLight(0xffffff, 0.1);
// light.position.set(0, 0, 10);
// scene.add(light);

// const boxGeometry = new THREE.BoxGeometry();
// const boxMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
// const box = new THREE.Mesh(boxGeometry, boxMaterial);
// scene.add(box);

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("js/libs/draco/gltf/");

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);
loader.load(
  cakeUrl.href,
  function (gltf) {
    const model = gltf.scene;
    scene.add(model);
    model.position.set(0, -1.1, 0);
    model.scale.set(0.3, 0.3, 0.3);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

loader.load(
    textHappy.href,
    function (gltf) {
      const model2 = gltf.scene;
      scene.add(model2);
      model2.position.set(0, -1.1, 0);
      model2.scale.set(0.25, 0.25, 0.25);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  loader.load(
    logo.href,
    function (gltf) {
      const model3 = gltf.scene;
      scene.add(model3);
      model3.position.set(0, -1.05, 0);
      model3.scale.set(0.25, 0.25, 0.25);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

window.onresize = function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};



function animate() {
  //   box.rotation.x += 0.01;
//   box.rotation.y += 0.01;
  //   box.rotation.z += 0.01;

  camera.lookAt(scene.position);
  renderer.render(scene, camera);
  controls.update();
}

renderer.setAnimationLoop(animate);