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
var Plane = function(x, y, z, height, width, color, texture, wh, wv) {
    this.texture = new THREE.TextureLoader().load( texture );
    this.texture.wrapS = THREE.RepeatWrapping;
    this.texture.wrapT = THREE.RepeatWrapping;
    this.texture.repeat.set(wh, wv);
    this.geometry = new THREE.PlaneGeometry(height, width);
    this.material = new THREE.MeshPhongMaterial({color : color, map: this.texture, side: THREE.DoubleSide});
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(x, y, z);
};