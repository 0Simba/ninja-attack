define([
    'babylon',
    './player'
], function (BABYLON, player) {
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

        var that = this;

        this.mesh = BABYLON.Mesh.CreateCylinder("life", 0.3, 0.3, 0.3, 20, scene);
        this.mesh.position = new BABYLON.Vector3(data.x, data.y, 0);
        this.mesh.material = material;

        this.mesh.actionManager = new BABYLON.ActionManager(scene);
        this.mesh.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction({ 'trigger' : BABYLON.ActionManager.OnIntersectionEnterTrigger, parameter : player.mesh}, function () {
                if (player.life < player.maxLife) {
                    player.life++;
                    that.mesh.dispose();
                }
            }
        ));
    }

    return new LifesBuilder();
});