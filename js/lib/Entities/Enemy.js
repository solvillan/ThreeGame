var Enemy = function (x, z, id) {
    this._cube = new Cube(x, 1, z, 1, 2, 1, 0xffee00, "img/pillar.gif", THREE.RepeatWrapping, THREE.RepeatWrapping, 1, 2);
    this._cube.mesh.castShadow = true;
    this._cube.mesh.name = id;
};

Enemy.prototype.update = function () {
    var speed = Math.min(Math.exp(score/50000)-0.975, 0.8);
    if (player.mesh.position.x > this._cube.mesh.position.x) {
        this._cube.mesh.translateX(speed);
    } else if (player.mesh.position.x < this._cube.mesh.position.x) {
        this._cube.mesh.translateX(-speed);
    }
    if (player.mesh.position.z > this._cube.mesh.position.z) {
        this._cube.mesh.translateZ(speed);
    } else if (player.mesh.position.z < this._cube.mesh.position.z) {
        this._cube.mesh.translateZ(-speed);
    }

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