define([
    './add_ennemies_capabilities',
    '../animator',
    '../ia'
], function (addEnnemiesCapabilities, Animator, ia) {
    'use strict';

    function Rabit (data, scene, rabitMeshes) {

        this.mesh = BABYLON.Mesh.CreateBox("rabit", {height: 0.8, width : 0.5, length : 0.1}, scene);
        this.mesh.position = new BABYLON.Vector3(data.x, data.y, 0);
        this.mesh.ellipsoid = new BABYLON.Vector3(0.5, 0.25, 0.25);
        this.mesh.isVisible = false;

        this.setChildsMeshes(rabitMeshes);

        this.iaValue  = data.iaValue;
        this.scene    = scene;

        ia.addLeftRightIA(this);
        addEnnemiesCapabilities(this);
        this.initAnimator();
    };


    Rabit.prototype.initAnimator = function () {
        this.animator = new Animator(this.skeleton, this.scene);
        this.animator.add('walk', 40, 60, true, 0.8);
        this.animator.play('walk');
    };


    Rabit.prototype.setChildsMeshes = function (rabitMeshes) {
        var meshes    = rabitMeshes.loadedMeshes;
        this.skeleton = rabitMeshes.loadedSkeletons[0].clone();

        this.childsMeshes = [];

        for (var i = 1; i < meshes.length; i++) {
            var mesh     = meshes[i].clone();
            var material = meshes[i].material.clone();

            mesh.material = material;
            mesh.parent = this.mesh;

            mesh.scaling.x = 0.02;
            mesh.scaling.y = 0.02;
            mesh.scaling.z = 0.02;
            mesh.isVisible = true;
            mesh.skeleton  = this.skeleton;

            mesh.rotation.y = 0;
            mesh.position.y -= 0.5;

            this.childsMeshes.push(mesh);
        };
    };


    return Rabit;
});

