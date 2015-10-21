define([
    'babylon'
], function (BABYLON) {
    'use strict';

    return function (scene, position) {
        var endPoint = BABYLON.Mesh.CreateCylinder("player", 1, 1, 0, 20, scene);
        endPoint.position = new BABYLON.Vector3(position.x, position.y, 0);
    }
});