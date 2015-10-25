define([
    'babylon',
    './entity_rotate_capabilities',
    './player',
    './hud'
], function (BABYLON, addEntityRotate, player, hud) {
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


    LifesBuilder.prototype.update = function (deltaTime) {
        for (var i = this.list.length - 1; i >= 0; i--) {
            var life = this.list[i];
            life.updateRotation(deltaTime);
        };
    };


    function Lifes (scene, data) {
        var texture  = new BABYLON.Texture('./assets/life.jpg', scene);
        var material = new BABYLON.StandardMaterial("material", scene);
        material.diffuseTexture = texture;

        var that = this;

        this.mesh = BABYLON.Mesh.CreateSphere("life", 10, 0.4, scene);
        this.mesh.position = new BABYLON.Vector3(data.x, data.y, 0);
        this.mesh.material = material;
        this.mesh.visibility = 0.8;

        this.mesh.actionManager = new BABYLON.ActionManager(scene);
        this.mesh.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction({ 'trigger' : BABYLON.ActionManager.OnIntersectionEnterTrigger, parameter : player.mesh}, function () {
                if (player.life < player.maxLife) {
                    player.life++;
                    hud.updateHealth((player.life / player.maxLife) * 100);
                    that.mesh.dispose();
                }
            }
        ));


        addEntityRotate(this);
    }

    return new LifesBuilder();
});