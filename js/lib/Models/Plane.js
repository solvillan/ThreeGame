var Plane = function(x, y, z, height, width, color, texture) {
    this.texture = new THREE.TextureLoader().load( texture );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    this.geometry = new THREE.PlaneGeometry(height, width);
    this.material = new THREE.MeshPhongMaterial({color : color, map: this.texture, side: THREE.DoubleSide});
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(x, y, z);
};