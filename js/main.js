var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var aListener = new THREE.AudioListener();
camera.add(aListener);
var audioLoader = new THREE.AudioLoader();

var shootSound = new THREE.Audio(aListener);
audioLoader.load("sound/shoot.wav", function (buffer) {
   shootSound.setBuffer(buffer);
   shootSound.setLoop(false);
   shootSound.setVolume(1);
});

var hurtSound = new THREE.Audio(aListener);
audioLoader.load("sound/hurt.wav", function (buffer) {
    hurtSound.setBuffer(buffer);
    hurtSound.setLoop(false);
    hurtSound.setVolume(1);
});

var hitSound = new THREE.Audio(aListener);
audioLoader.load("sound/hit.wav", function (buffer) {
    hitSound.setBuffer(buffer);
    hitSound.setLoop(false);
    hitSound.setVolume(1);
});

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.domElement.requestPointerLock = renderer.domElement.requestPointerLock ||
    renderer.domElement.mozRequestPointerLock;

var lastMousePos = {};

var playerLight = new THREE.PointLight(0xffdd99, 1, 30);
scene.add(playerLight);


var player = new Cube(0, 0.5, 0, 1, 2, 1, 0x00ff00, "img/pillar.gif");
player.mesh.name = THREE.Math.generateUUID();

scene.add( player.mesh );

var plane = new Plane(0, 0, 0, 40, 40, 0xffffff, "img/ground.jpg"); // Old color: 0x35d600
plane.mesh.rotation.x = Math.PI/2;
scene.add(plane.mesh);

var scoreDiv = document.getElementsByClassName('score')[0];
var healthBar = document.getElementsByClassName('healthBar')[0];

var enemies = [];
var bullets = [];

var score = 0;
var health = 100;

camera.position.z = 5;

function addEnemy() {
    enemies[enemies.length] = new Enemy((Math.random()-0.5)*40, (Math.random()-0.5)*40, THREE.Math.generateUUID());
    scene.add(enemies[enemies.length-1]._cube.mesh);
}

function shoot() {
    if (shootSound.isPlaying) shootSound.stop();
    shootSound.play();
    bullets[bullets.length] = new Bullet(player.mesh.position.x, player.mesh.position.y + 0.75, player.mesh.position.z, player.mesh.rotation.y, THREE.Math.generateUUID());
    scene.add(bullets[bullets.length-1]._cube.mesh);
}

function removeBullet(id) {
    var i;
    for (i = 0; i < bullets.length; i++) {
        if (bullets[i]._cube.mesh.name == id) {
            scene.remove(bullets[i]._cube.mesh);
            bullets.splice(i, 1);
            break;
        }
    }
}

function removeEnemy(id) {
    var i;
    for (i = 0; i < enemies.length; i++) {
        if (enemies[i]._cube.mesh.name == id) {
            scene.remove(enemies[i]._cube.mesh);
            enemies.splice(i, 1);
            if (hitSound.isPlaying) hitSound.stop();
            hitSound.play();
            break;
        }
    }
}

function render() {
    requestAnimationFrame(render);
    //scene.updateMatrixWorld(false);
    renderer.render(scene, camera);
    if ((document.pointerLockElement === renderer.domElement ||
        document.mozPointerLockElement === renderer.domElement) && health > 0) update();
}

function addScore(startx, starty, startz, hit) {
    var start = new THREE.Vector3(startx, starty, startz);
    score += Math.min(Math.floor(Math.exp(start.distanceTo(hit)/4)-1), 100);
}

function printScore() {
    scoreDiv.innerHTML = "Score: " + score;
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
    for (var j = 0; j < bullets.length; j++) {
        bullets[j].update(scene);
    }

    printScore();
    //console.log('width: ' + (200*(health/100)) + 'px;background-color: rgb(' + Math.abs(255*((health/100))) + ", " + Math.abs(255*(health/100)) + ", 0);")
    healthBar.setAttribute('style', 'width: ' + (200*(health/100)) + 'px;background-color: rgb(' + Math.floor(Math.abs(255*(1-(health/100)))) + ", " + Math.floor(Math.abs(255*(health/100))) + ", 0);");

    camera.position.set(player.mesh.position.x, player.mesh.position.y + 1, player.mesh.position.z);
    playerLight.position.set(player.mesh.position.x, player.mesh.position.y + 1, player.mesh.position.z);
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
    if (document.pointerLockElement === renderer.domElement ||
        document.mozPointerLockElement === renderer.domElement) updatePos();
    return false;
});

renderer.domElement.addEventListener('click', function (event) {
    renderer.domElement.requestPointerLock();
    shoot();
});

lastMousePos = Mouse.getPosition();

render();
