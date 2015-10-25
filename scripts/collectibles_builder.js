define([
    'babylon',
    './player',
    './entity_rotate_capabilities',
    './hud',
    './sounds'
], function (BABYLON, player, addEntityRotate, hud, sounds) {
    'use strict';


    function CollectiblesBuilder () {
        this.list     = [];
        this.picked   = [];
        this.nbPicked = 0;
    }

    CollectiblesBuilder.prototype.build = function (scene, collectiblesData) {
        this.list     = [];
        this.picked   = [];
        this.nbPicked = 0;

        for (var i = 0; i < collectiblesData.length; i++) {
            var data        = collectiblesData[i];
            var collectible = new Collectible(scene, data);

            this.picked.push(false);
            this.list.push(collectible);
        };

        hud.addCollectibles(this.list.length);
    };


    CollectiblesBuilder.prototype.pick = function (collectible) {
        this.nbPicked++;

        var index = this.list.indexOf(collectible);
        this.picked[index] = true;

        collectible.mesh.dispose();
        sounds.play('collectible');
        hud.pickCollectible(index);
    };


    CollectiblesBuilder.prototype.update = function (deltaTime) {
        for (var i = this.list.length - 1; i >= 0; i--) {
            var collectible = this.list[i];
            collectible.updateRotation(deltaTime);
        };
    };


    var collectiblesBuilder = new CollectiblesBuilder();



    function Collectible (scene, data) {
        var texture  = new BABYLON.Texture('./assets/collectibles.jpg', scene);
        var material = new BABYLON.StandardMaterial("material", scene);
        material.diffuseTexture = texture;

        var that = this;


        this.mesh = BABYLON.Mesh.CreateSphere("collectible", 10, 0.4, scene);
        this.mesh.position   = new BABYLON.Vector3(data.x, data.y, 0);
        this.mesh.material   = material;
        this.mesh.visibility = 0.8;

        this.mesh.actionManager = new BABYLON.ActionManager(scene);
        this.mesh.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction({ 'trigger' : BABYLON.ActionManager.OnIntersectionEnterTrigger, parameter : player.mesh}, function () {
                collectiblesBuilder.pick(that);
            }
        ));

        addEntityRotate(this);
    }

    return collectiblesBuilder;
});