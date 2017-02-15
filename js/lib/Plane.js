var Plane = function(x, y, z, height, width, color) {
    this.geometry = new THREE.PlaneGeometry(height, width);
    this.material = new THREE.MeshBasicMaterial({color : color});
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(x, y, z);
};