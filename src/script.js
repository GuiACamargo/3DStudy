import GUI from 'lil-gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

// Environment Map
const rgbeLoader = new RGBELoader();

// Carregar matcaps
const textureLoader = new THREE.TextureLoader();
const matcapBlackWhite = textureLoader.load('/textures/matcaps/black-white.png');
matcapBlackWhite.colorSpace = THREE.SRGBColorSpace;
const matcapBlueBrown = textureLoader.load('/textures/matcaps/blue-brown.png');
matcapBlueBrown.colorSpace = THREE.SRGBColorSpace;
const matcapBlue = textureLoader.load('/textures/matcaps/blue.png');
matcapBlue.colorSpace = THREE.SRGBColorSpace;
const matcapDarkBlueBrown = textureLoader.load('/textures/matcaps/dark-blue-brown.png');
matcapDarkBlueBrown.colorSpace = THREE.SRGBColorSpace;
const matcapGlossyPink = textureLoader.load('/textures/matcaps/glossy-pink.png');
matcapGlossyPink.colorSpace = THREE.SRGBColorSpace;
const matcapGoldGreen = textureLoader.load('/textures/matcaps/gold-green.png');
matcapGoldGreen.colorSpace = THREE.SRGBColorSpace;
const matcapGold = textureLoader.load('/textures/matcaps/gold.png');
matcapGold.colorSpace = THREE.SRGBColorSpace;
const matcapMetalGreen = textureLoader.load('/textures/matcaps/metal-green.png');
matcapMetalGreen.colorSpace = THREE.SRGBColorSpace;
const matcapPurpleBrownGold = textureLoader.load('/textures/matcaps/purple-brown-gold.png');
matcapPurpleBrownGold.colorSpace = THREE.SRGBColorSpace;
const matcapRainbow = textureLoader.load('/textures/matcaps/rainbow.png');
matcapRainbow.colorSpace = THREE.SRGBColorSpace;
const matcapReflectiveGreen = textureLoader.load('/textures/matcaps/reflective-green.png');
matcapReflectiveGreen.colorSpace = THREE.SRGBColorSpace;
const matcapSilver = textureLoader.load('/textures/matcaps/silver.png');
matcapSilver.colorSpace = THREE.SRGBColorSpace;
const matcapStrongBlackWhite = textureLoader.load('/textures/matcaps/strong-black-white.png');
matcapStrongBlackWhite.colorSpace = THREE.SRGBColorSpace;
const matcapToonPink = textureLoader.load('/textures/matcaps/toon-pink.png');
matcapToonPink.colorSpace = THREE.SRGBColorSpace;
const matcapYellowBlue = textureLoader.load('/textures/matcaps/yellow-blue.png');
matcapYellowBlue.colorSpace = THREE.SRGBColorSpace;

// Variáveis de ajuda
const canvas = document.querySelector('canvas.webgl');
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};
const debug = {
    materialColor: '#ffffff',
    materialMatcap: 'Rainbow',
};
const scale = {
    box: 1,
    circle: 1,
    cone: 1,
    cylinder: 1,
    sphere: 1,
    plane: 1,
    torusKnot: 1,
    torus: 1,
    icosahedron: 1,
    ring: 1,
    octahedron: 1,
    dodecahedron: 1,
};
const functions = {
    environmentSky: function () {
        rgbeLoader.load('./textures/environmentMap/sky.hdr', (environmentMap) => {
            environmentMap.mapping = THREE.EquirectangularReflectionMapping;
            scene.background = environmentMap;
            scene.environment = environmentMap;
        });
    },
    environmentCity: function () {
        rgbeLoader.load('./textures/environmentMap/city.hdr', (environmentMap) => {
            environmentMap.mapping = THREE.EquirectangularReflectionMapping;
            scene.background = environmentMap;
            scene.environment = environmentMap;
        });
    },
    environmentRoom: function () {
        rgbeLoader.load('./textures/environmentMap/room.hdr', (environmentMap) => {
            environmentMap.mapping = THREE.EquirectangularReflectionMapping;
            scene.background = environmentMap;
            scene.environment = environmentMap;
        });
    },
    environmentStudio: function () {
        rgbeLoader.load('./textures/environmentMap/studio.hdr', (environmentMap) => {
            environmentMap.mapping = THREE.EquirectangularReflectionMapping;
            scene.background = environmentMap;
            scene.environment = environmentMap;
        });
    },
    environmentNight: function () {
        rgbeLoader.load('./textures/environmentMap/night.hdr', (environmentMap) => {
            environmentMap.mapping = THREE.EquirectangularReflectionMapping;
            scene.background = environmentMap;
            scene.environment = environmentMap;
        });
    },
};

functions.environmentRoom();

// Permitir Resizing
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Criação Scene
const scene = new THREE.Scene();

// Criação Material
const wrapperGroup = new THREE.Group();
wrapperGroup.position.y = -5
const matcapGroup = new THREE.Group();
matcapGroup.position.y = 11;
const topGroup = new THREE.Group();
topGroup.position.y = 3;
const middleGroup = new THREE.Group();
const bottomGroup = new THREE.Group();
bottomGroup.position.y = -3;

const material = new THREE.MeshPhysicalMaterial({ color: debug.materialColor });
material.side = THREE.DoubleSide;
material.metalness = 0.2;
material.roughness = 0.15;
material.transmission = 1;
material.ior = 1.5;
material.thickness = 0.5;

const materialMatcap = new THREE.MeshMatcapMaterial({ matcap: matcapRainbow });
const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapGlossyPink });

// Criação Objetos
const fontLoader = new FontLoader();
fontLoader.load('./fonts/afacadSemiBoldRegular.json', (font) => {
    const textGeometry1 = new TextGeometry('Change my matcap!', {
        font: font,
        size: 1.5,
        height: 0.2,
        curveSegments: 6,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 4,
    });
    const textGeometry2 = new TextGeometry('Change my properties', {
        font: font,
        size: 1.5,
        height: 0.2,
        curveSegments: 6,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 4,
    });
    const textGeometry3 = new TextGeometry('on the top right!', {
        font: font,
        size: 1.5,
        height: 0.2,
        curveSegments: 6,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 4,
    });

    textGeometry1.center();
    textGeometry2.center();
    textGeometry3.center();
    const textMesh1 = new THREE.Mesh(textGeometry1, materialMatcap);
    textMesh1.position.y = 2.5;
    const textMesh2 = new THREE.Mesh(textGeometry2, textMaterial);
    textMesh2.position.y = 5;
    const textMesh3 = new THREE.Mesh(textGeometry3, textMaterial);
    textMesh3.position.y = 3;
    matcapGroup.add(textMesh1);
    topGroup.add(textMesh2, textMesh3);
});

const boxGeometry = new THREE.BoxGeometry(1.3, 1.3, 1.3);
const boxMesh = new THREE.Mesh(boxGeometry, material);
boxMesh.position.x = -5;

const circleGeometry = new THREE.CircleGeometry(0.8, 32);
const circleMesh = new THREE.Mesh(circleGeometry, material);
circleMesh.position.x = -1.7;

const coneGeometry = new THREE.ConeGeometry(0.5, 1.3, 22);
const coneMesh = new THREE.Mesh(coneGeometry, material);
coneMesh.position.x = 1.7;

const cylinderGeometry = new THREE.CylinderGeometry(0.6, 0.6, 1.2, 22);
const cylinderMesh = new THREE.Mesh(cylinderGeometry, material);
cylinderMesh.position.x = 5;

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMesh = new THREE.Mesh(sphereGeometry, material);
sphereMesh.position.x = -5;

const planeGeometry = new THREE.PlaneGeometry(1.5, 1.5, 20, 20);
const planeMesh = new THREE.Mesh(planeGeometry, material);
planeMesh.position.x = -1.7;

const torusKnotGeometry = new THREE.TorusKnotGeometry(0.6, 0.23, 44, 32);
const torusKnotMesh = new THREE.Mesh(torusKnotGeometry, material);
torusKnotMesh.position.x = 1.7;
const torusKnotMatcapMesh = new THREE.Mesh(torusKnotGeometry, materialMatcap);
matcapGroup.add(torusKnotMatcapMesh);

const torusGeometry = new THREE.TorusGeometry(0.5, 0.4, 44, 32);
const torusMesh = new THREE.Mesh(torusGeometry, material);
torusMesh.position.x = 5;
const torusMatcapMesh = new THREE.Mesh(torusGeometry, materialMatcap);
torusMatcapMesh.position.x = 3.5;
matcapGroup.add(torusMatcapMesh);

const icosahedronGeometry = new THREE.IcosahedronGeometry();
const icosahedronMesh = new THREE.Mesh(icosahedronGeometry, material);
icosahedronMesh.position.x = -5;
const icosahedronMatcapMesh = new THREE.Mesh(icosahedronGeometry, materialMatcap);
icosahedronMatcapMesh.position.x = -3.5;
matcapGroup.add(icosahedronMatcapMesh);

const ringGeometry = new THREE.RingGeometry(1, 0.4, 32);
const ringMesh = new THREE.Mesh(ringGeometry, material);
ringMesh.position.x = -1.7;

const octahedronGeometry = new THREE.OctahedronGeometry(1);
const octahedronMesh = new THREE.Mesh(octahedronGeometry, material);
octahedronMesh.position.x = 1.7;

const dodecahedronGeometry = new THREE.DodecahedronGeometry(1);
const dodecahedronMesh = new THREE.Mesh(dodecahedronGeometry, material);
dodecahedronMesh.position.x = 5;

topGroup.add(boxMesh, circleMesh, coneMesh, cylinderMesh);
middleGroup.add(sphereMesh, planeMesh, torusKnotMesh, torusMesh);
bottomGroup.add(icosahedronMesh, ringMesh, octahedronMesh, dodecahedronMesh);
wrapperGroup.add(matcapGroup, topGroup, middleGroup, bottomGroup)

// Adicionar Objetos na Scene
scene.add(wrapperGroup);

// Criação Câmera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 25;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxDistance = 30;

// Criação Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.render(scene, camera);

// Axes Helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);
axesHelper.visible = false;

// GUI
const gui = new GUI({
    title: 'Change the properties, have fun! :)',
    closeFolders: true,
});

window.addEventListener('keydown', (event) => {
    if (event.key == 'h') {
        gui.show(gui._hidden);
    }
});

gui.add(axesHelper, 'visible').name('Show Axes Helper');

const matcaps = {
    'Black & White': matcapBlackWhite,
    'Blue & Brown': matcapBlueBrown,
    'Blue': matcapBlue,
    'Dark Blue & Brown': matcapDarkBlueBrown,
    'Glossy Pink': matcapGlossyPink,
    'Gold & Green': matcapGoldGreen,
    'Gold': matcapGold,
    'Metal & Green': matcapMetalGreen,
    'Purple & Broswn & Gold': matcapPurpleBrownGold,
    'Rainbow': matcapRainbow,
    'Reflective Green': matcapReflectiveGreen,
    'Silver': matcapSilver,
    'Strong Black & White': matcapStrongBlackWhite,
    'Toon Pink': matcapToonPink,
    'Yellow Blue': matcapYellowBlue,
};

let choosenMatcap;
gui.add(debug, 'materialMatcap', Object.keys(matcaps)).name('Matcap').onChange(() => {
    const selectedMatcapName = debug.materialMatcap;
    choosenMatcap = matcaps[selectedMatcapName];
    materialMatcap.matcap = choosenMatcap;
});

const materialGui = gui.addFolder('Material Properties');

materialGui
    .addColor(debug, 'materialColor')
    .name('Color')
    .onChange(() => {
        material.color.set(debug.materialColor);
    });
materialGui.add(material, 'wireframe').name('Wireframe');
materialGui.add(material, 'metalness').min(0).max(1).step(0.0001).name('Metalness');
materialGui.add(material, 'roughness').min(0).max(1).step(0.0001).name('Roughness');

const materialTransmissionGui = materialGui.addFolder('Transmission');
const materialClearcoatGui = materialGui.addFolder('Clearcoat');
const materialSheenGui = materialGui.addFolder('Sheen');
const materialIridescenceGui = materialGui.addFolder('Iridescence');

// Transmission
materialTransmissionGui.add(material, 'transmission').min(0).max(1).step(0.0001);
materialTransmissionGui.add(material, 'ior').min(0).max(10).step(0.0001);
materialTransmissionGui.add(material, 'thickness').min(0).max(1).step(0.0001);

// Clearcoat
materialClearcoatGui.add(material, 'clearcoat').min(0).max(1).step(0.0001).name('Clearcoat');
materialClearcoatGui.add(material, 'clearcoatRoughness').min(0).max(1).step(0.0001).name('Clearcoat Roughness');

// Sheen
materialSheenGui.add(material, 'sheen').min(0).max(1).step(0.0001).name('Sheen');
materialSheenGui.add(material, 'sheenRoughness').min(0).max(1).step(0.0001).name('Sheen Roughness');
materialSheenGui.addColor(material, 'sheenColor').name('Sheen Color');

// Iridescence
materialIridescenceGui.add(material, 'iridescence').min(0).max(1).step(0.0001).name('Iridescence');
materialIridescenceGui.add(material, 'iridescenceIOR').min(0).max(2.333).step(0.0001).name('Iridescence IOR');
materialIridescenceGui
    .add(material.iridescenceThicknessRange, '0')
    .min(0)
    .max(1000)
    .step(1)
    .name('Thickness Range First Value');
materialIridescenceGui
    .add(material.iridescenceThicknessRange, '1')
    .min(0)
    .max(1000)
    .step(1)
    .name('Thickness Range Second Value');

const topGroupGui = gui.addFolder('Top Group');
const boxGui = topGroupGui.addFolder('Box');
const circleGui = topGroupGui.addFolder('Circle');
const coneGui = topGroupGui.addFolder('Cone');
const cylinderGui = topGroupGui.addFolder('Cylinder');

const middleGroupGui = gui.addFolder('Middle Group');
const sphereGui = middleGroupGui.addFolder('Sphere');
const planeGui = middleGroupGui.addFolder('Plane');
const torusKnotGui = middleGroupGui.addFolder('Torus Knot');
const torusGui = middleGroupGui.addFolder('Torus');

const bottomGroupGui = gui.addFolder('Bottom Group');
const icosahedronGui = bottomGroupGui.addFolder('Icosahedron');
const ringGui = bottomGroupGui.addFolder('Ring');
const octahedronGui = bottomGroupGui.addFolder('Octahedron');
const dodecahedronGui = bottomGroupGui.addFolder('Dodecahedron');

const environmentGui = gui.addFolder('Environment Images');
environmentGui.add(functions, 'environmentSky').name('Sky Environment');
environmentGui.add(functions, 'environmentCity').name('City Environment');
environmentGui.add(functions, 'environmentRoom').name('Room Environment');
environmentGui.add(functions, 'environmentStudio').name('Studio Environment');
environmentGui.add(functions, 'environmentNight').name('Night Environment');

// Box GUI
const GUIs = {
    box: boxGui,
    circle: circleGui,
    cone: coneGui,
    cylinder: cylinderGui,
    sphere: sphereGui,
    plane: planeGui,
    torusKnot: torusKnotGui,
    torus: torusGui,
    icosahedron: icosahedronGui,
    ring: ringGui,
    octahedron: octahedronGui,
    dodecahedron: dodecahedronGui,
};
const Meshes = {
    box: boxMesh,
    circle: circleMesh,
    cone: coneMesh,
    cylinder: cylinderMesh,
    sphere: sphereMesh,
    plane: planeMesh,
    torusKnot: torusKnotMesh,
    torus: torusMesh,
    icosahedron: icosahedronMesh,
    ring: ringMesh,
    octahedron: octahedronMesh,
    dodecahedron: dodecahedronMesh,
};

function createTweaks(meshName) {
    const meshGui = GUIs[meshName];
    const mesh = Meshes[meshName];
    meshGui.add(mesh, 'visible').name('Visible');
    meshGui
        .add(scale, meshName)
        .min(0.1)
        .max(10)
        .step(0.01)
        .name('Size')
        .onChange(() => {
            mesh.scale.set(scale[meshName], scale[meshName], scale[meshName]);
        });
    const positionsGui = meshGui.addFolder('Position');
    positionsGui.add(mesh.position, 'x').min(-10).max(10).step(0.01).name('X Position');
    positionsGui.add(mesh.position, 'y').min(-10).max(10).step(0.01).name('Y Position');
    positionsGui.add(mesh.position, 'z').min(-10).max(10).step(0.01).name('Z Position');
}

const geometriesNames = [
    'box',
    'circle',
    'cone',
    'cylinder',
    'sphere',
    'plane',
    'torusKnot',
    'torus',
    'icosahedron',
    'ring',
    'octahedron',
    'dodecahedron',
];

for (const name of geometriesNames) {
    createTweaks(name);
}

// Animation
const clock = new THREE.Clock();

function tick() {
    const elapsedTime = clock.getElapsedTime();

    // Top Group
    boxMesh.rotation.x = -0.1 * elapsedTime;
    boxMesh.rotation.y = 0.2 * elapsedTime;

    circleMesh.rotation.x = -0.2 * elapsedTime;
    circleMesh.rotation.y = 0.3 * elapsedTime;

    coneMesh.rotation.x = -0.2 * elapsedTime;
    coneMesh.rotation.y = 0.3 * elapsedTime;

    cylinderMesh.rotation.x = 0.1 * elapsedTime;
    cylinderMesh.rotation.y = -0.1 * elapsedTime;

    // Middle Group
    sphereMesh.rotation.x = -0.2 * elapsedTime;
    sphereMesh.rotation.y = 0.1 * elapsedTime;

    planeMesh.rotation.x = -0.1 * elapsedTime;
    planeMesh.rotation.y = 0.2 * elapsedTime;

    torusKnotMesh.rotation.x = -0.2 * elapsedTime;
    torusKnotMesh.rotation.y = 0.1 * elapsedTime;
    torusKnotMatcapMesh.rotation.x = -0.2 * elapsedTime;
    torusKnotMatcapMesh.rotation.y = 0.1 * elapsedTime;

    torusMesh.rotation.x = 0.2 * elapsedTime;
    torusMesh.rotation.y = -0.1 * elapsedTime;
    torusMatcapMesh.rotation.x = 0.2 * elapsedTime;
    torusMatcapMesh.rotation.y = -0.1 * elapsedTime;

    // Bottom Group
    icosahedronMesh.rotation.x = -0.3 * elapsedTime;
    icosahedronMesh.rotation.y = 0.1 * elapsedTime;
    icosahedronMatcapMesh.rotation.x = -0.3 * elapsedTime;
    icosahedronMatcapMesh.rotation.y = 0.1 * elapsedTime;

    ringMesh.rotation.x = 0.1 * elapsedTime;
    ringMesh.rotation.y = -0.2 * elapsedTime;

    octahedronMesh.rotation.x = -0.1 * elapsedTime;
    octahedronMesh.rotation.y = 0.2 * elapsedTime;

    dodecahedronMesh.rotation.x = -0.2 * elapsedTime;
    dodecahedronMesh.rotation.y = 0.3 * elapsedTime;

    controls.update();

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
}

tick();
