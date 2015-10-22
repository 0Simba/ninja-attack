define([
    'babylon'
], function (BABYLON) {
    'use strict';


    function CollectiblesBuilder () {
        this.list = [];
    }

    CollectiblesBuilder.prototype.build = function (scene, collectiblesData) {
        for (var i = 0; i < collectiblesData.length; i++) {
            var data        = collectiblesData[i];
            var collectible = new Collectible(scene, data);

            this.list.push(collectible);
        };
    };



    function Collectible (scene, data) {
        console.log(data);
            
        this.mesh = BABYLON.Mesh.CreateCylinder("collectible", 0.3, 0.3, 0.3, 20, scene);
        this.mesh.position = new BABYLON.Vector3(data.x, data.y, 0);
    }

    return new CollectiblesBuilder();
});