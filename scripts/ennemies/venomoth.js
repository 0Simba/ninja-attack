define([
    './add_ennemies_capabilities',
    '../animator',
    '../ia'
], function (addEnnemiesCapabilities, Animator, ia) {
    'use strict';


    var venomothGravity = 0;

    function Venomoth (data, scene) {
        var material = new BABYLON.StandardMaterial("material", scene);
        material.emissiveColor = new BABYLON.Color3(0, 1, 0);

        this.mesh = BABYLON.Mesh.CreateBox("venomoth", {height: 0.6, width : 0.2, length : 0.1}, scene);
        this.mesh.position  = new BABYLON.Vector3(data.x, data.y, 0);
        this.mesh.ellipsoid = new BABYLON.Vector3(0.25, 0.25, 0.25);
        this.mesh.material  = material;


        this.iaValue  = data.iaValue;
        this.scene    = scene;

        ia.addFlyFocusPlayer(this);
        addEnnemiesCapabilities(this);

        this.physics.gravity = venomothGravity;
    }


    return Venomoth;
});