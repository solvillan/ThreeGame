import ColladaModel from "../Models/ColladaModel";
import * as THREE from "three";

/**
 * Enemy
 * @param x {number}
 * @param z {number}
 * @param id {string}
 * @param scene {THREE.Scene}
 * @constructor
 */
export default class Enemy { 
    static directions = [
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(1, 0, 1),
        new THREE.Vector3(0, 0, 1),
        new THREE.Vector3(-1, 0, 0),
        new THREE.Vector3(-1, 0, 1),
        new THREE.Vector3(-1, 0, -1),
        new THREE.Vector3(1, 0, -1),
        new THREE.Vector3(0, 0, -1)
    ];
    
    constructor(x, z, id, scene) {
        this._cube = new ColladaModel(x, 1, z, 'models/enemy2.dae', scene, id);
    }
    
    update() {
        if (this._cube.mesh == null || this._cube.mesh == undefined || !this._cube.loaded) return;
        this._cube.mesh.name = this.id;
        this._cube.mesh.castShadow = true;
        let speed = Math.min(Math.exp(score/50000)-0.975, 0.8);

        this._cube.mesh.traverse(function (child) {
            if (child instanceof THREE.Mesh) child.geometry.computeBoundingBox();
        });

        this._cube.mesh.rotation.y = Math.atan2((this._cube.mesh.position.x-player.mesh.position.x), -(player.mesh.position.z-this._cube.mesh.position.z));
        this._cube.mesh.translateZ(-speed);
        

        for (let j = 0; j < Enemy.directions.length; j++) {
            let raycaster = new THREE.Raycaster(this._cube.mesh.position, Enemy.directions[j]);
            let intersects = raycaster.intersectObjects(scene.children);

            for (let i = 0; i < intersects.length; i++) {
                if (intersects[i].object != this._cube.mesh && intersects[i].object == player.mesh && intersects[i].distance <= 0.5) {
                    health -= 0.1;
                    if (!hurtSound.isPlaying) hurtSound.play();
                    return;
                }
            }
        }
    }
}