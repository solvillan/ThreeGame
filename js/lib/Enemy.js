var Enemy = function (x, z) {
    this._cube = new Cube(x, 1, z, 1, 2, 1, 0xee0000);
};

Enemy.prototype.update = function () {
    /*this._cube.mesh.translateX(Math.random()-0.5);
    this._cube.mesh.translateZ(Math.random()-0.5);*/
};