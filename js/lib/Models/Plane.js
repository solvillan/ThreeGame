import {TextureLoader, PlaneGeometry, MeshPhongMaterial, Mesh, DoubleSide, RepeatWrapping} from "three";
/**
 * A basic plane model
 * @param x {number}
 * @param y {number}
 * @param z {number}
 * @param height {number}
 * @param width {number}
 * @param color {number} - RGB Color in Hex
 * @param texture {string} - Path to texture
 * @param wh {number} - Number of horizontal repeats
 * @param wv {number} - Number of vertical repeats
 * @constructor
 */
export default class Plane {
    constructor(x, y, z, width, height, color, texture, wh, wv) {
        this.texture = new TextureLoader().load(texture);
        this.texture.wrapS = RepeatWrapping;
        this.texture.wrapT = RepeatWrapping;
        this.texture.repeat.set(wh, wv);
        this.geometry = new PlaneGeometry(width, height);
        this.material = new MeshPhongMaterial({color: color, map: this.texture, side: DoubleSide});
        this.mesh = new Mesh(this.geometry, this.material);
        this.mesh.position.set(x, y, z);
    }
};