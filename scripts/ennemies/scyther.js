define([
    './rabit',
    './add_ennemies_capabilities',
    '../animator',
    '../ia'
], function (Rabit, addEnnemiesCapabilities, Animator, ia) {
    'use strict';


    var scytherGravity = -5;

    function Scyther (data, scene, rabitMeshes) {
        var material = new BABYLON.StandardMaterial("material", scene);
        material.emissiveColor = new BABYLON.Color3(1, 0, 0);

        this.mesh = BABYLON.Mesh.CreateBox("scyther", {height: 0.8, width : 0.5, length : 0.1}, scene);
        this.mesh.position  = new BABYLON.Vector3(data.x, data.y, 0);
        this.mesh.ellipsoid = new BABYLON.Vector3(0.25, 0.25, 0.25);
        this.mesh.isVisible = false;


        this.iaValue  = data.iaValue;
        this.scene    = scene;

        ia.addFocusPlayer(this);
        addEnnemiesCapabilities(this);

        this.physics.gravity = scytherGravity;

        Rabit.prototype.setChildsMeshes.call(this, rabitMeshes);
        Rabit.prototype.initAnimator.call(this);

        for (var i = 0; i < this.childsMeshes.length; i++) {
            this.childsMeshes[i].material.emissiveColor = new BABYLON.Color4(1, 0, 0, 0.2);
            this.childsMeshes[i].rotation.y = Math.PI;
        };
    }


    return Scyther;
});