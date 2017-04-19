/**
 * Global OBJLoader
 * @type {THREE.OBJLoader}
 */
var loader = new THREE.OBJLoader();

/**
 * A Model from an .obj file
 * @param x {number}
 * @param y {number}
 * @param z {number}
 * @param color {number} - RGB Color in Hex
 * @param texture {string} - Path to texture
 * @param wrapS {number} - Wrapping S
 * @param wrapT {number} - Wrapping T
 * @param wh {number} - Number of horizontal repeats
 * @param wv {number} - Number of vertical repeats
 * @param scene {THREE.Scene}
 * @param id {string}
 * @constructor
 */
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