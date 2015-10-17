define([
    './add_ennemies_capabilities',
    '../animator',
    '../ia'
], function (addEnnemiesCapabilities, Animator, ia) {
    'use strict';


    function Scyther () {
        var material = new BABYLON.StandardMaterial("material", scene);
        material.emissiveColor = new BABYLON.Color3(1, 0, 0);

        this.mesh = BABYLON.Mesh.CreateBox("rabit", {height: 0.8, width : 0.5, length : 0.1}, scene);
        this.mesh.ellipsoid = new BABYLON.Vector3(0.25, 0.25, 0.25);
        this.mesh.material  = material;

        this.iaValue  = data.iaValue;
        this.scene    = scene;

        ia.addLeftRightIA(this);
        addEnnemiesCapabilities(this);
    }


    return Scyther;
});