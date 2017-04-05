var Enemy = function (x, z, id, scene) {
    this._cube = new ColladaModel(x, 1, z, 'models/enemy2.dae', scene, id);
};

Enemy.prototype.update = function () {
    if (this._cube.mesh == null || this._cube.mesh == undefined || !this._cube.loaded) return;
    this._cube.mesh.name = this.id;
    this._cube.mesh.castShadow = true;
    var speed = Math.min(Math.exp(score/50000)-0.975, 0.8);

    this._cube.mesh.traverse(function (child) {
       if (child instanceof THREE.Mesh) child.geometry.computeBoundingBox();
    });

    this._cube.mesh.rotation.y = Math.atan2((this._cube.mesh.position.x-player.mesh.position.x), -(player.mesh.position.z-this._cube.mesh.position.z));
    this._cube.mesh.translateZ(-speed);

    var directions = [
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(1, 0, 1),
        new THREE.Vector3(0, 0, 1),
        new THREE.Vector3(-1, 0, 0),
        new THREE.Vector3(-1, 0, 1),
        new THREE.Vector3(-1, 0, -1),
        new THREE.Vector3(1, 0, -1),
        new THREE.Vector3(0, 0, -1)
    ];

    for (var j = 0; j < directions.length; j++) {
        var raycaster = new THREE.Raycaster(this._cube.mesh.position, directions[j]);
        var intersects = raycaster.intersectObjects(scene.children);

        for (var i = 0; i < intersects.length; i++) {
            if (intersects[i].object != this._cube.mesh && intersects[i].object == player.mesh && intersects[i].distance <= 0.5) {
                health -= 0.1;
                if (!hurtSound.isPlaying) hurtSound.play();
                return;
            }
        }
    }
};