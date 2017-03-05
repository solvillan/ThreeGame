var Bullet = function (x, y, z, angle, id) {
    this._cube = new Cube(x, y, z, 0.1, 0.1, 0.1, 0x333333, "img/pillar.gif");
    this._startx = x;
    this._starty = y;
    this._startz = z;
    this._cube.mesh.rotation.y = angle;
    this._cube.mesh.name = id;
};

Bullet.prototype.update = function (scene) {
    this._cube.mesh.translateZ(-1);
    var direction = new THREE.Vector3(Math.sin(this._cube.mesh.rotation.y), 0, Math.cos(this._cube.mesh.rotation.y));
    var raycaster = new THREE.Raycaster(this._cube.mesh.position, direction, 0.75);
    var intersects = raycaster.intersectObjects(scene.children);
    for (var i = 0; i < intersects.length; i++) {
        if (intersects[i].object != this._cube.mesh && intersects[i].object != player.mesh) {
            intersects[i].object.material.color.set(0x0000ff);
            scene.remove(intersects[i].object);
            removeBullet(this._cube.mesh.name);
            removeEnemy(intersects[i].object.name);
            addScore(this._startx, this._starty, this._startz, intersects[i].point);
            addEnemy();
            return;
        }
    }
};