import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

// import Stats from "three/examples/jsm/libs/stats.module";

const cakeUrl = new URL("../assets/cake19.glb", import.meta.url);
const textHappy = new URL("../assets/textHappy3.glb", import.meta.url)
const logo = new URL("../assets/logo4.glb", import.meta.url)

let container, stats;

let camera, scene, renderer;

let mouseX = 0,
    mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
    container = document.getElementById("container");

    camera = new THREE.PerspectiveCamera(
        20,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );
    camera.position.set(5, 2, 8);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x9ED6EF);

    const hemiLight = new THREE.HemisphereLight( 0xffffff, 1);
    hemiLight.position.set(0, 10, 15);
    scene.add(hemiLight);

      const dirLight = new THREE.DirectionalLight(0xffffff, 1);
      dirLight.position.set(-3, 10, -10);
      scene.add(dirLight);
      
      const light = new THREE.DirectionalLight(0xffffff,0.1);
      light.position.set(0, 0, 10);
      scene.add(light);


    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('js/libs/draco/gltf/');


    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.load(cakeUrl.href, function (gltf) {
        const model = gltf.scene;
        scene.add(model);
        model.position.set(0, -1.1, 0);
        model.scale.set(0.3, 0.3, 0.3);
        model.rotateX(0)
    },
        undefined,
        function (error) {
            console.error(error);
        }
    );

    loader.load(textHappy.href, function (gltf) {
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


    loader.load(logo.href, function (gltf) {
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
    // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    // const cube = new THREE.Mesh( geometry, material );
    // scene.add( cube );
    // cube.position.set(0,0,0)

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    //   stats = new Stats();
    //   container.appendChild(stats.dom);

    document.addEventListener("mousemove", onDocumentMouseMove);

    //

    window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {

    mouseX = event.clientX / 400;
    mouseY = event.clientY / 400;
      console.log("event", event.clientX);
}

//

function animate() {
    requestAnimationFrame(animate);

    render();
    //   stats.update();
}

function render() {
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (mouseY - camera.position.y) * 0.05;

    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}
