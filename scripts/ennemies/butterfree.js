define([
    './add_ennemies_capabilities',
    '../animator',
    '../ia'
], function (addEnnemiesCapabilities, Animator, ia) {
    'use strict';


    var butterfreeGravity = 0;

    function Butterfree (data, scene, butterFreeMeshes) {
        var material = new BABYLON.StandardMaterial("material", scene);
        material.emissiveColor = new BABYLON.Color3(0, 0, 1);

        this.mesh = BABYLON.Mesh.CreateBox("butterfree", {height: 0.6, width : 0.2, length : 0.1}, scene);
        this.mesh.position  = new BABYLON.Vector3(data.x, data.y, 0);
        this.mesh.ellipsoid = new BABYLON.Vector3(0.4, 0.5, 0.25);
        this.mesh.material  = material;
        this.mesh.isVisible = false;


        this.iaValue  = data.iaValue;
        this.scene    = scene;

        ia.addTopDown(this);
        addEnnemiesCapabilities(this);

        this.setChildsMeshes(butterFreeMeshes);
        this.initAnimator();

        this.physics.gravity = butterfreeGravity;
    }


    Butterfree.prototype.initAnimator = function () {
        this.animator = new Animator(this.skeleton, this.scene);
        this.animator.add('walk', 50, 66, true, 1);
        this.animator.play('walk');
    };


    Butterfree.prototype.setChildsMeshes = function (butterFreeMeshes) {
        var meshes    = butterFreeMeshes.loadedMeshes;
        this.skeleton = butterFreeMeshes.loadedSkeletons[0].clone();

        this.childsMeshes = [];

        for (var i = 1; i < meshes.length; i++) {
            var mesh = meshes[i].clone();
            mesh.parent = this.mesh;

            mesh.scaling.x = 0.015;
            mesh.scaling.y = 0.015;
            mesh.scaling.z = 0.015;
            mesh.position.y += 0.2;
            mesh.isVisible = true;
            mesh.skeleton  = this.skeleton;

            mesh.rotation.y = 0;
            mesh.position.y -= 0.5;

            this.childsMeshes.push(mesh);
        };
    };

    return Butterfree;
});