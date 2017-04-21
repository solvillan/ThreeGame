import {TextureLoader, BoxGeometry, MeshPhongMaterial, Mesh, DoubleSide} from "three";

/**
 * A basic cube model
 * @param x {number}
 * @param y {number}
 * @param z {number}
 * @param height {number}
 * @param width {number}
 * @param depth {number}
 * @param color {number} - RGB Color in Hex
 * @param texture {string} - Path to texture
 * @param wrapS {number} - Wrapping S
 * @param wrapT {number} - Wrapping T
 * @param wh {number} - Number of horizontal repeats
 * @param wv {number} - Number of vertical repeats
 * @constructor
 */
export default class Cube {
    constructor(x, y, z, width, height, depth, color, texture, wrapS, wrapT, wh, wv) {
        this.texture = new TextureLoader().load(texture);
        this.texture.wrapS = wrapS;
        this.texture.wrapT = wrapT;
        this.texture.repeat.set(wh, wv);
        this.geometry = new BoxGeometry(width, height, depth);
        this.material = new MeshPhongMaterial({color: color, map: this.texture, side: DoubleSide});
        this.mesh = new Mesh(this.geometry, this.material);
        this.mesh.position.set(x, y, z);
    }
}