import { createApp } from 'vue'
import App from './App.vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as TWEEN from '@tweenjs/tween.js'
import '@material-design-icons/font'

import axios from 'axios';
import VueAxios from 'vue-axios';
import Notifications from '@kyvg/vue3-notification';

// Vue
const app = createApp(App);
app.use(VueAxios, axios)
app.use(Notifications)
app.config.globalProperties.axios=axios
app.config.globalProperties.window=window
app.mount('#app')


// Three //////////////

const canvas = document.querySelector('canvas.header-animation')
const scene = new THREE.Scene()
const sizes = {
    width: 120,
    height: 160
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(1.7, 1, -1.7);
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    logarithmicDepthBuffer: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.autoClear = false;

// Lights
const sun = new THREE.HemisphereLight(0xffffbb, 0x000000, 2)
scene.add(sun)

// Geometry
const wallGeo = new THREE.BoxGeometry(1.05, 1.05, 0.05)
const roofGeo = new THREE.ConeGeometry(1, .77, 4)
const chimneyGeo = new THREE.BoxGeometry(.15, .6, .2)

// Materials
const wallMat = new THREE.MeshStandardMaterial({ 
    color: new THREE.Color(0x00ab9f), flatShading: false, roughness: .3, metalness: 0.3, side: THREE.FrontSide,
    polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1
})
const chimneyMat = new THREE.MeshStandardMaterial({ 
    color: new THREE.Color(0xFF5555), flatShading: false, roughness: 1, metalness: 0, side: THREE.FrontSide, 
})
const wireMat = new THREE.LineBasicMaterial({color: 0xf8f8f2})

// Meshes
const leftWall = new THREE.Mesh(wallGeo,wallMat)
const rightWall = new THREE.Mesh(wallGeo,wallMat)
const backWall = new THREE.Mesh(wallGeo,wallMat)
const frontWall = new THREE.Mesh(wallGeo,wallMat)
const roof = new THREE.Mesh(roofGeo, wallMat)
const chimney = new THREE.Mesh(chimneyGeo, chimneyMat)

// left
leftWall.position.x -= .5
rotateDegrees(leftWall, 90)
// right
rightWall.position.x += .5
rotateDegrees(rightWall, -90)
// back
backWall.position.z -= .5
// front
frontWall.position.z += .5
// roof
roof.position.y += 3
// chimney
chimney.position.y += 40
chimney.position.x += .35

// Wireframes
const g4 = new THREE.WireframeGeometry(frontWall.geometry)
const frontWire = new THREE.LineSegments(g4, wireMat)
frontWire.position.z += .5

// Animations
const startHeight = 7

// roof
const tween = new TWEEN.Tween({x: 0, y: startHeight, z: 0 })
    .to({x: 0, y: .9, z: 0 }, 3000)
    .easing(TWEEN.Easing.Bounce.Out)
    .onUpdate(function ({ x, y, z }, elapsed) {
        roof.position.set(x, y, z)
})
const roofSpinTween = new TWEEN.Tween({rot: -100})
    .to({rot: 45}, 3000)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate(function ({rot}, elapsed) {
        roof.rotation.y = THREE.MathUtils.degToRad(rot)
})
// chimney
const chimneyTween = new TWEEN.Tween({x:.35, y: 0, z: 0})
    .to({x: .35, y: 1, z: 0}, 1200)
    .easing(TWEEN.Easing.Elastic.Out)
    .onUpdate(function ({x, y, z}, elapsed) {
        chimney.position.set(x, y, z)
})
// left wall
const leftTween = new TWEEN.Tween({x: leftWall.position.x, y: leftWall.position.y - startHeight, z: leftWall.position.z})
    .to({x: leftWall.position.x, y: leftWall.position.y, z: leftWall.position.z}, 2000)
    .easing(TWEEN.Easing.Bounce.Out)
    .onUpdate(function ({ x, y, z }, elapsed) {
        leftWall.position.set(x, y, z)
})
// right wall
const rightTween = new TWEEN.Tween({x: rightWall.position.x, y: rightWall.position.y - startHeight + .7, z: rightWall.position.z})
    .to({x: rightWall.position.x, y: rightWall.position.y, z: rightWall.position.z}, 2600)
    .easing(TWEEN.Easing.Bounce.Out)
    .onUpdate(function ({ x, y, z }, elapsed) {
        rightWall.position.set(x, y, z)
})
// front wall
const frontTween = new TWEEN.Tween({x: backWall.position.x, y: backWall.position.y - startHeight - .4, z: backWall.position.z})
    .to({x: backWall.position.x, y: backWall.position.y, z: backWall.position.z}, 1800)
    .easing(TWEEN.Easing.Bounce.Out)
    .onUpdate(function ({ x, y, z }, elapsed) {
        backWall.position.set(x, y, z)
})
// back wall
const backTween = new TWEEN.Tween({x: frontWall.position.x, y: frontWall.position.y - startHeight, z: frontWall.position.z})
    .to({x: frontWall.position.x, y: frontWall.position.y, z: frontWall.position.z}, 2900)
    .easing(TWEEN.Easing.Bounce.Out)
    .onUpdate(function ({ x, y, z }, elapsed) {
        frontWall.position.set(x, y, z)
})

tween.chain(chimneyTween)
tween.start()
leftTween.start()
rightTween.start()
frontTween.start()
backTween.start()
roofSpinTween.start()

// Grouping
const houseGroup = new THREE.Group()
houseGroup.add(leftWall)
houseGroup.add(rightWall)
houseGroup.add(backWall)
houseGroup.add(frontWall)
houseGroup.add(roof)
houseGroup.add(chimney)
//houseGroup.add(frontWire)


scene.add(houseGroup)
camera.lookAt(houseGroup.position)

// Main loop
const tick = () =>
{
    controls.update()
    TWEEN.update()
    houseGroup.rotation.y -= .01;

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

// Functions
function rotateDegrees(mesh, degrees){
    const rad = degrees * Math.PI / 180
    mesh.rotateY(rad)
}

// Entrypoint
tick()
