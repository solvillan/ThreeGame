/**
 * Bullet
 * @param x {number}
 * @param y {number}
 * @param z {number}
 * @param angle {number}
 * @param id {string}
 * @constructor
 */
var Bullet = function (x, y, z, angle, id) {
    //this._cube = new Cube(x, y, z, 0.1, 0.1, 0.1, 0x333333, "img/pillar.gif", THREE.RepeatWrapping, THREE.RepeatWrapping, 1, 1);
    this._cube = new ColladaModel(x, y, z, 'models/bullet.dae', scene, id);
    this._startx = x;
    this._starty = y;
    this._startz = z;
    //this._cube.mesh.name = id;
    this.id = id;
    this.angle = angle;
};

/**
 * Update bullet logic
 * @param scene
 */
Bullet.prototype.update = function (scene) {
    if (this._cube.loaded) {
        this._cube.mesh.name = this.id;
        this._cube.mesh.castShadow = true;
        this._cube.mesh.rotation.y = this.angle;
        this._cube.mesh.translateZ(-1);
        var direction = new THREE.Vector3(Math.sin(this._cube.mesh.rotation.y), 0, Math.cos(this._cube.mesh.rotation.y));

        var raycaster = new THREE.Raycaster(this._cube.mesh.position, direction, 0.75);
        var intersects = raycaster.intersectObjects(scene.children, true);
        for (var i = 0; i < intersects.length; i++) {
            if (intersects[i].object != this._cube.mesh && intersects[i].object != player.mesh) {
                if (isEnemy(intersects[i].object.name)) {
                    intersects[i].object.material.color.set(0x0000ff);
                    removeBullet(this._cube.mesh.name);
                    removeEnemy(intersects[i].object.name);
                    addScore(this._startx, this._starty, this._startz, intersects[i].point);
                    addEnemy();
                    return;
                }
            }
        }
    }
};