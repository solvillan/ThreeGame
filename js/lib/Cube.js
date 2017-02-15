var Cube = function(x, y, z, height, width, depth, color) {
    this.geometry = new THREE.BoxGeometry(height, width, depth);
    this.material = new THREE.MeshBasicMaterial({color : color});
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(x, y, z);
};