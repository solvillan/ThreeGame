/**
 * A SkyBox
 * @ignore
 * @param x
 * @param y
 * @param z
 * @param radius
 * @param color
 * @param texture
 * @param wrapS
 * @param wrapT
 * @param wh
 * @param wv
 * @constructor
 */
var SkyBox = function(x, y, z, radius, color, texture, wrapS, wrapT, wh, wv) {
    this.texture = new THREE.TextureLoader().load( texture);
    this.texture.wrapS = wrapS;
    this.texture.wrapT = wrapT;
    this.texture.repeat.set(wh, wv);
    this.geometry = new THREE.SphereGeometry(radius, 32, 32);
    this.material = new THREE.MeshBasicMaterial({color : color, map: this.texture, side: THREE.DoubleSide});
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(x, y, z);
};