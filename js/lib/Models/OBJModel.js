var loader = new THREE.OBJLoader();

var OBJModel = function(x, y, z, color, texture, wrapS, wrapT, wh, wv, scene, id) {
    this.texture = new THREE.TextureLoader().load( texture);
    this.texture.wrapS = wrapS;
    this.texture.wrapT = wrapT;
    this.texture.repeat.set(wh, wv);
    this.mesh = null;
    var model = this;
    loader.load('models/teapot.obj', function (object) {
        model.mesh = object;
        scene.add(model.mesh);
        model.mesh.position.set(x, y, z);
        model.mesh.scale.set(0.01, 0.01, 0.01);
        model.mesh.name = id;
    });
};