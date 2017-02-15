var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.domElement.requestPointerLock = renderer.domElement.requestPointerLock ||
    renderer.domElement.mozRequestPointerLock;

var lastMousePos = {};

var player = new Cube(0, 0.5, 0, 1, 1, 1, 0x00ff00);

scene.add( player.mesh );

var plane = new Plane(0, 0, 0, 40, 40, 0x227722);
plane.mesh.rotation.x = -Math.PI/2;
scene.add(plane.mesh);

var enemies = [];
var bullets = [];

camera.position.z = 5;

function addEnemy() {
    enemies[enemies.length] = new Enemy((Math.random()-0.5)*40, (Math.random()-0.5)*40);
    scene.add(enemies[enemies.length-1]._cube.mesh);
}

function shoot() {

}

function render() {
    requestAnimationFrame(render);
    update();
    renderer.render(scene, camera);
}

function update() {
    if (Key.isDown(Key.UP)) {
        player.mesh.translateZ(-0.1);
    }
    if (Key.isDown(Key.DOWN)) {
        player.mesh.translateZ(0.1);
    }
    if (Key.isDown(Key.RIGHT)) {
        player.mesh.translateX(0.1);
    }
    if (Key.isDown(Key.LEFT)) {
        player.mesh.translateX(-0.1);
    }
    if (Math.random() < 0.1 && enemies.length < 20) {
        addEnemy();
    }
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].update();
    }

    camera.position.set(player.mesh.position.x, player.mesh.position.y + 1, player.mesh.position.z);
    //camera.rotation.x = -calcRotation(Mouse.getY(), window.innerHeight);
}

function calcRotation(delta, max) {
    return (delta/max)*Math.PI;
}

window.addEventListener('keydown', function (event) {
    Key.onKeyDown(event);
});

window.addEventListener('keyup', function (event) {
    Key.onKeyUp(event);
});

function updatePos() {
    player.mesh.rotation.y -= calcRotation(Mouse.getDX(), window.innerWidth);
    player.mesh.updateMatrix();
    camera.rotation.y = player.mesh.rotation.y;
    //camera.rotation.x += calcRotation(Mouse.getDY(), window.innerHeight);
}
document.addEventListener('mousemove', function (event) {
    lastMousePos = Mouse.getPosition();
    Mouse.update(renderer.domElement, event);
    updatePos();
    return false;
});

renderer.domElement.addEventListener('click', function (event) {
    renderer.domElement.requestPointerLock();
});

lastMousePos = Mouse.getPosition();

render();
