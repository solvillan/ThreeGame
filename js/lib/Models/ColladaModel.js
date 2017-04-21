import ColladaLoader from "three-collada-loader";
/**
 * Global ColladaLoader
 * @type {ColladaLoader}
 */
const loader = new ColladaLoader();
loader.options.convertUpAxis = true;
loader.options.upAxis = "Z";

/**
 * A Model from Collada files (e.g. .dae)
 * @param x {number}
 * @param y {number}
 * @param z {number}
 * @param path {string}
 * @param scene {THREE.Scene}
 * @param id {string}
 * @constructor
 */
export default class ColladaModel {
    constructor(x, y, z, path, scene, id) {
        this.mesh = null;
        this.loaded = false;
        loader.load(path, id, function (object) {
            this.mesh = object.scene;
            this.mesh.position.set(x, y, z);
            this.mesh.name = id;
            object.scene.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.name = id;
                }
            }.bind(this));
            scene.add(this.mesh);
            this.loaded = true;
        }.bind(this));
    }
}