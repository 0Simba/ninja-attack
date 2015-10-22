define([
    'babylon'
], function (BABYLON) {
    'use strict';


    function LifesBuilder () {
        this.list = [];
    }

    LifesBuilder.prototype.build = function (scene, lifesData) {
        for (var i = 0; i < lifesData.length; i++) {
            var data = lifesData[i];
            var life = new Lifes(scene, data);

            this.list.push(life);
        };
    };




    function Lifes (scene, data) {
        var material = new BABYLON.StandardMaterial("material", scene);
        material.emissiveColor = new BABYLON.Color3(0, 1, 1);

        this.mesh = BABYLON.Mesh.CreateCylinder("life", 0.3, 0.3, 0.3, 20, scene);
        this.mesh.position = new BABYLON.Vector3(data.x, data.y, 0);
        this.mesh.material = material;
    }

    return new LifesBuilder();
});