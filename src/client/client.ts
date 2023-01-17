import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'
import { BufferGeometry } from 'three'

const scene = new THREE.Scene()


const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.x = -2
camera.position.y = 4
camera.position.z = 5

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)



const material = new THREE.MeshNormalMaterial()
let geometry = new THREE.BufferGeometry()
const points = [
    new THREE.Vector3(-1, 1, -1),//c
    new THREE.Vector3(-1, -1, 1),//b
    new THREE.Vector3(1, 1, 1),//a   

    new THREE.Vector3(1, 1, 1),//a    
    new THREE.Vector3(1, -1, -1),//d  
    new THREE.Vector3(-1, 1, -1),//c

    new THREE.Vector3(-1, -1, 1),//b
    new THREE.Vector3(1, -1, -1),//d  
    new THREE.Vector3(1, 1, 1),//a

    new THREE.Vector3(-1, 1, -1),//c
    new THREE.Vector3(1, -1, -1),//d    
    new THREE.Vector3(-1, -1, 1),//b
]

points.push(new THREE.Vector3(-5, 0, 0))
points.push(new THREE.Vector3(5, 0, 0))
geometry = new THREE.BufferGeometry().setFromPoints( points )
let line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0x888888 }))


const positions = (geometry as THREE.BufferGeometry).attributes.position.array as Array<number>
for (let i = 0; i < positions.length; i += 3) {
    const v = new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]).multiplyScalar(2)
    positions[i] = v.x
    positions[i + 1] = v.y
    positions[i + 2] = v.z
}
(geometry as THREE.BufferGeometry).attributes.position.needsUpdate = true

geometry.setFromPoints(points)
geometry.computeVertexNormals()

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
scene.add(line)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}


function animate() {
    render()
}

function render() {
    renderer.render(scene, camera)
}

animate()