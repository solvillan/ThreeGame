var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var cube = new Cube(0, 0, 0, 1, 1, 1, 0x00ff00);

scene.add( cube.mesh );

geometry = new THREE.PlaneGeometry(5, 5, 3, 3);
material = new THREE.MeshBasicMaterial( { color: 0xcecece } );
var plane = new THREE.Mesh(geometry, material);
plane.position.z = -2;
scene.add(plane);

camera.position.z = 5;

function render() {
    requestAnimationFrame(render);
    cube.mesh.rotation.x += 0.05;
    cube.mesh.rotation.y += 0.05;
    renderer.render(scene, camera);
}

render();
