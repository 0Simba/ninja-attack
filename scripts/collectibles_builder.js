define([
    'babylon',
    './player'
], function (BABYLON, player) {
    'use strict';


    function CollectiblesBuilder () {
        this.list     = [];
        this.picked   = [false, false, false];
        this.nbPicked = 0;
    }

    CollectiblesBuilder.prototype.build = function (scene, collectiblesData) {
        for (var i = 0; i < collectiblesData.length; i++) {
            var data        = collectiblesData[i];
            var collectible = new Collectible(scene, data);

            this.list.push(collectible);
        };
    };


    CollectiblesBuilder.prototype.pick = function (collectible) {
        this.nbPicked++;

        var index = this.list.indexOf(collectible);
        this.picked[index] = true;

        collectible.mesh.dispose();
    };

    var collectiblesBuilder = new CollectiblesBuilder();


    function Collectible (scene, data) {
        var material = new BABYLON.StandardMaterial("material", scene);
        material.emissiveColor = new BABYLON.Color3(1, 1, 0);

        var that = this;


        this.mesh = BABYLON.Mesh.CreateCylinder("collectible", 0.3, 0.3, 0.3, 20, scene);
        this.mesh.position = new BABYLON.Vector3(data.x, data.y, 0);
        this.mesh.material = material;

        this.mesh.actionManager = new BABYLON.ActionManager(scene);
        this.mesh.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction({ 'trigger' : BABYLON.ActionManager.OnIntersectionEnterTrigger, parameter : player.mesh}, function () {
                collectiblesBuilder.pick(that);
            }
        ));
    }

    return collectiblesBuilder;
});