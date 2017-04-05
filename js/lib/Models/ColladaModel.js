var loader = new THREE.ColladaLoader();
loader.options.convertUpAxis = true;
loader.options.upAxis = "Z";

var ColladaModel = function(x, y, z, path, scene, id) {
    this.mesh = null;
    this.loaded = false;
    loader.load(path, id, function (object) {
        this.mesh = object.scene;
        scene.add(this.mesh);
        this.mesh.position.set(x, y, z);
        this.mesh.name = id;
        //model.mesh.scale.set(0.01, 0.01, 0.01);
        this.loaded = true;
    }.bind(this));
};