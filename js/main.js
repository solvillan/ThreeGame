/**
 * Main script - Entry point.
 * @author Rickard Doverfelt
 */

/**
 * Imports
 */
import {Scene, PerspectiveCamera, AudioListener, Audio, AudioLoader, WebGLRenderer, PointLight, Vector3, RepeatWrapping} from "three";
import Math as MathUtil from "three";
import Cube from "./lib/Models/Cube";
import Plane from "./lib/Models/Plane";
import * as Bullet from "./lib/Entities/Bullet";
import Enemy from "./lib/Entities/Enemy";
import {Key, Mouse} from "./lib/Input";



/**
 * The global scene
 * @type {Scene}
 */
const scene = new Scene();

/**
 * Global camera
 * @type {PerspectiveCamera}
 */
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

/*
    Audio-related vars
 */

const aListener = new AudioListener();
camera.add(aListener);
const audioLoader = new AudioLoader();

/**
 * Shoot sound
 * @type {Audio}
 */
const shootSound = new Audio(aListener);
audioLoader.load("sound/shoot.wav", function (buffer) {
   shootSound.setBuffer(buffer);
   shootSound.setLoop(false);
   shootSound.setVolume(1);
});

/**
 * Hurt sound
 * @type {Audio}
 */
const hurtSound = new Audio(aListener);
audioLoader.load("sound/hurt.wav", function (buffer) {
    hurtSound.setBuffer(buffer);
    hurtSound.setLoop(false);
    hurtSound.setVolume(1);
});

/**
 * Hit sound
 * @type {Audio}
 */
const hitSound = new Audio(aListener);
audioLoader.load("sound/hit.wav", function (buffer) {
    hitSound.setBuffer(buffer);
    hitSound.setLoop(false);
    hitSound.setVolume(1);
});

/**
 * Global renderer
 * @type {WebGLRenderer}
 */
const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/**
 * Polyfill for requestPointerLock
 */
renderer.domElement.requestPointerLock = renderer.domElement.requestPointerLock ||
    renderer.domElement.mozRequestPointerLock;

/**
 * Player torch
 * @type {PointLight}
 */
const playerLight = new PointLight(0xffdd99, 1, 30);
scene.add(playerLight);

/**
 * The player
 * @type {Cube}
 */
const player = new Cube(0, 1, 0, 1, 2, 1, 0x00ff00, "img/pillar.gif", RepeatWrapping, RepeatWrapping, 1, 2);
player.mesh.name = Math.generateUUID();
scene.add( player.mesh );

/**
 * The floor
 * @type {Plane}
 */
const plane = new Plane(0, 0, 0, 40, 40, 0xffffff, "img/ground.jpg", 40, 40); // Old color: 0x35d600
plane.mesh.rotation.x = (3*Math.PI)/2;
scene.add(plane.mesh);

/**
 * The borders
 * @type {{left: Cube, right: Cube, top: Cube, bottom: Cube}}
 */
const borders = {
    left: new Cube(plane.mesh.position.x-20.05, 0.5, plane.mesh.position.z, 0.2, 1, 40, 0xffffff, "img/wall.jpg", RepeatWrapping, RepeatWrapping, 40, 1),
    right: new Cube(plane.mesh.position.x+20.05, 0.5, plane.mesh.position.z, 0.2, 1, 40, 0xffffff, "img/wall.jpg", RepeatWrapping, RepeatWrapping, 40, 1),
    top: new Cube(plane.mesh.position.x, 0.5, plane.mesh.position.z+20.05, 40, 1, 0.2, 0xffffff, "img/wall.jpg", RepeatWrapping, RepeatWrapping, 40, 1),
    bottom: new Cube(plane.mesh.position.x, 0.5, plane.mesh.position.z-20.05, 40, 1, 0.2, 0xffffff, "img/wall.jpg", RepeatWrapping, RepeatWrapping, 40, 1)
};
scene.add(borders.left.mesh);
scene.add(borders.right.mesh);
scene.add(borders.top.mesh);
scene.add(borders.bottom.mesh);

/**
 * UI elements
 */
const scoreDiv = document.getElementsByClassName('score')[0];
const healthBar = document.getElementsByClassName('healthBar')[0];
const crosshair = document.getElementsByClassName('crosshair')[0];
const gameOverView = document.getElementsByClassName('gameOver')[0];
const goScore = document.getElementsByClassName('finalScore')[0];

export default class Main {

    constructor () {
        Main.enemies = {};
        Main.bullets = [];
        Main.score = 0;
        Main.health = 100;
        Main.gameOver = false;
        Main.running = false;
        Main.lastShot = 0;
        camera.position.z = 5;
        Main.render();
    }

    /**
     * Enemy container
     * @type {{}}
     */
    static enemies;

    /**
     * Bullet container
     * @type {Array}
     */
    static bullets;

    /**
     * Gameplay vars
     */
    static score;
    static health;
    static gameOver;
    static running;
    static lastShot;


    /**
     * Add an Enemy
     * @return void
     */
    static addEnemy() {
        const uuid = Math.generateUUID();
        this.enemies[uuid] = new Enemy((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40, uuid, scene);
    }

    /**
     * Shoot a bullet
     * @return void
     */
    static shoot() {
        if (shootSound.isPlaying) shootSound.stop();
        shootSound.play();
        this.bullets[this.bullets.length] = new Bullet(player.mesh.position.x, player.mesh.position.y + 0.5, player.mesh.position.z, player.mesh.rotation.y, Math.generateUUID());
        scene.add(this.bullets[this.bullets.length - 1]._cube.mesh);
    }

    /**
     * Remove bullet with id
     * @param id
     */
    static removeBullet(id) {
        for (let i = 0; i < this.bullets.length; i++) {
            if (this.bullets[i]._cube.mesh.name == id) {
                scene.remove(this.bullets[i]._cube.mesh);
                this.bullets.splice(i, 1);
                break;
            }
        }
    }

    /**
     * Remove enemy with id
     * @param id
     */
    static removeEnemy(id) {
        if (this.enemies[id]) {
            scene.remove(this.enemies[id]._cube.mesh);
            if (hitSound.isPlaying) hitSound.stop();
            hitSound.play();
            delete this.enemies[id];
        }
    }

    /**
     * Check if entity is an enemy
     * @param id
     * @return {boolean}
     */
    static isEnemy(id) {
        return !!this.enemies[id];
    }

    /**
     * Main render loop
     */
    static render() {
        requestAnimationFrame(Main.render);
        //scene.updateMatrixWorld(false);
        renderer.render(scene, camera);
        if ((document.pointerLockElement === renderer.domElement || document.mozPointerLockElement === renderer.domElement) && Main.health > 0) {
            Main.update();
        } else if (Main.running && Main.health <= 0) {
            if (!Main.gameOver) {
                Main.gameOver = true;
                goScore.innerHTML = Main.score;
                crosshair.setAttribute("style", "opacity: 0;");
                gameOverView.setAttribute("style", "display: block; opacity: 1;");
            }
        }
    }

    /**
     * Calculate and add score
     * @param startx number
     * @param starty number
     * @param startz number
     * @param hit Vector3
     */
    static addScore(startx, starty, startz, hit) {
        let start = new Vector3(startx, starty, startz);
        Main.score += Math.min(Math.floor(Math.exp(start.distanceTo(hit) / 4) - 1), 100);
    }

    /**
     * Print score to UI
     */

    static printScore() {
        scoreDiv.innerHTML = "Score: " + Main.score;
    }

    /**
     * Update logic
     */
    static update() {
        Main.lastShot++;
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

        if (Key.isDown(Key.CLEFT)) {
            player.mesh.rotation.y += Math.PI * 0.01;
            camera.rotation.y = player.mesh.rotation.y;
        }

        if (Key.isDown(Key.CRIGHT)) {
            player.mesh.rotation.y -= Math.PI * 0.01;
            camera.rotation.y = player.mesh.rotation.y;
        }

        if (Key.isDown(Key.SHOOT) && lastShot >= 10) {
            Main.shoot();
            Main.lastShot = 0;
        }

        //Stay within plane
        if (player.mesh.position.z < plane.mesh.position.z - 19.5) {
            player.mesh.position.z = plane.mesh.position.z - 19.5;
        }
        if (player.mesh.position.z > plane.mesh.position.z + 19.5) {
            player.mesh.position.z = plane.mesh.position.z + 19.5;
        }
        if (player.mesh.position.x > plane.mesh.position.x + 19.5) {
            player.mesh.position.x = plane.mesh.position.x + 19.5;
        }
        if (player.mesh.position.x < plane.mesh.position.x - 19.5) {
            player.mesh.position.x = plane.mesh.position.x - 19.5;
        }

        if (Math.random() < 0.1 && Object.keys(Main.enemies).length < 20) {
            Main.addEnemy();
        }
        for (let enemy in Main.enemies) {
            if (Main.enemies.hasOwnProperty(enemy)) {
                Main.enemies[enemy].update()
            }
        }
        for (let j = 0; j < Main.bullets.length; j++) {
            Main.bullets[j].update(scene);
        }

        Main.printScore();
        healthBar.setAttribute('style', 'width: ' + (200 * (health / 100)) + 'px;background-color: rgb(' + Math.floor(Math.abs(255 * (1 - (health / 100)))) + ", " + Math.floor(Math.abs(255 * (health / 100))) + ", 0);");

        camera.position.set(player.mesh.position.x - Math.sin(player.mesh.rotation.y), player.mesh.position.y + 0.7, player.mesh.position.z - Math.cos(player.mesh.rotation.y));
        playerLight.position.set(player.mesh.position.x, player.mesh.position.y + 1.5, player.mesh.position.z);
    }

    /**
     * Calculate rotation from mouse delta
     * @param delta
     * @param max
     * @return {number}
     */
    static calcRotation(delta, max) {
        return (delta / max) * Math.PI;
    }

    /**
     * Update rotation
     */
    static updatePos() {
        player.mesh.rotation.y -= Main.calcRotation(Mouse.getDX(), window.innerWidth);
        camera.rotation.y = player.mesh.rotation.y;
    }

}

/**
 * Listen to keydown event and forward to Key
 */
window.addEventListener('keydown', function (event) {
    Key.onKeyDown(event);
});

/**
 * Listen to keyup event and forward to Key
 */
window.addEventListener('keyup', function (event) {
    Key.onKeyUp(event);
});

/**
 * Listen for mousemove
 */
document.addEventListener('mousemove', function (event) {
    Mouse.update(renderer.domElement, event);
    if (document.pointerLockElement === renderer.domElement ||
        document.mozPointerLockElement === renderer.domElement) Main.updatePos();
    return false;
});

/**
 * Listen for click
 */
renderer.domElement.addEventListener('click', function () {
    renderer.domElement.requestPointerLock();
    Main.running |= true;
    Main.shoot();
});

new Main();
