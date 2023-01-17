import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()


// Main scene

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

new OrbitControls(camera, renderer.domElement)

const geometryMain = new THREE.BoxGeometry()
const materialMain = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})

const cubeMain = new THREE.Mesh(geometryMain, materialMain)
scene.add(cubeMain)

// Main Scene Ends

const sceneSub = new THREE.Scene()

const camera1 = new THREE.PerspectiveCamera(75, 1, 0.1, 10)
const camera2 = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
const camera3 = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
const camera4 = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)

camera1.position.z = 2
camera2.position.y = 1
camera2.lookAt(new THREE.Vector3(0, 0, 0))
camera3.position.z = 1
camera4.position.x = 1
camera4.lookAt(new THREE.Vector3(0, 0, 0))

const canvas1 = document.getElementById('c1') as HTMLCanvasElement
const canvas2 = document.getElementById('c2') as HTMLCanvasElement
const canvas3 = document.getElementById('c3') as HTMLCanvasElement
const canvas4 = document.getElementById('c4') as HTMLCanvasElement
const renderer1 = new THREE.WebGLRenderer({ canvas: canvas1 })
renderer1.setSize(200, 200)
const renderer2 = new THREE.WebGLRenderer({ canvas: canvas2 })
renderer2.setSize(200, 200)
const renderer3 = new THREE.WebGLRenderer({ canvas: canvas3 })
renderer3.setSize(200, 200)
const renderer4 = new THREE.WebGLRenderer({ canvas: canvas4 })
renderer4.setSize(200, 200)

//document.body.appendChild(renderer.domElement)

new OrbitControls(camera1, renderer1.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})

const cube = new THREE.Mesh(geometry, material)
sceneSub.add(cube)

function animate() {
    requestAnimationFrame(animate)

    cubeMain.rotation.x += 0.00
    cubeMain.rotation.y += 0.00
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    render()
}

//event triggered on screen resize
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function render() {
    renderer.render(scene, camera)
    renderer1.render(sceneSub, camera1)
    renderer2.render(sceneSub, camera2)
    renderer3.render(sceneSub, camera3)
    renderer4.render(sceneSub, camera4)
}

animate()