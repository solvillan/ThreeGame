/**
 * Global OBJLoader
 * @type {THREE.OBJLoader}
 */
const loader = new THREE.OBJLoader();

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
export default class OBJModel {
    constructor(x, y, z, color, texture, wrapS, wrapT, wh, wv, scene, id) {
        this.texture = new THREE.TextureLoader().load(texture);
        this.texture.wrapS = wrapS;
        this.texture.wrapT = wrapT;
        this.texture.repeat.set(wh, wv);
        this.mesh = null;
        loader.load('models/teapot.obj', function (object) {
            this.mesh = object;
            scene.add(this.mesh);
            this.mesh.position.set(x, y, z);
            this.mesh.scale.set(0.01, 0.01, 0.01);
            this.mesh.name = id;
        }.bind(this));
    }
}