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
var Cube = function(x, y, z, height, width, depth, color, texture, wrapS, wrapT, wh, wv) {
    this.texture = new THREE.TextureLoader().load( texture);
    this.texture.wrapS = wrapS;
    this.texture.wrapT = wrapT;
    this.texture.repeat.set(wh, wv);
    this.geometry = new THREE.BoxGeometry(height, width, depth);
    this.material = new THREE.MeshPhongMaterial({color : color, map: this.texture, side: THREE.DoubleSide});
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(x, y, z);
};