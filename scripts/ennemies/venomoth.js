define([
    './butterfree',
    './add_ennemies_capabilities',
    '../animator',
    '../ia'
], function (Butterfree, addEnnemiesCapabilities, Animator, ia) {
    'use strict';


    var venomothGravity = 0;

    function Venomoth (data, scene, butterfreeMeshes) {
        var material = new BABYLON.StandardMaterial("material", scene);
        material.emissiveColor = new BABYLON.Color3(0, 1, 0);

        this.mesh = BABYLON.Mesh.CreateBox("venomoth", {height: 0.6, width : 0.2, length : 0.1}, scene);
        this.mesh.position  = new BABYLON.Vector3(data.x, data.y, 0);
        this.mesh.ellipsoid = new BABYLON.Vector3(0.5, 0.5, 0.25);
        this.mesh.isVisible = false;
        this.mesh.material  = material;


        this.iaValue  = data.iaValue;
        this.scene    = scene;

        ia.addFlyFocusPlayer(this);
        addEnnemiesCapabilities(this);

        this.physics.gravity = venomothGravity;

        Butterfree.prototype.setChildsMeshes.call(this, butterfreeMeshes);
        Butterfree.prototype.initAnimator.call(this);

        for (var i = 0; i < this.childsMeshes.length; i++) {
            this.childsMeshes[i].material.emissiveColor = new BABYLON.Color4(1, 0, 0, 0.8);
            this.childsMeshes[i].rotation.y = Math.PI;
        };

    }


    return Venomoth;
});