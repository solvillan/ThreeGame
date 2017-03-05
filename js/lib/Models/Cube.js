var Cube = function(x, y, z, height, width, depth, color, texture) {
    this.texture = new THREE.TextureLoader().load( texture);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    this.geometry = new THREE.BoxGeometry(height, width, depth);
    this.material = new THREE.MeshPhongMaterial({color : color, map: this.texture});
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(x, y, z);
};