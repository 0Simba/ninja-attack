define([
    'babylon'
], function (BABYLON) {
    'use strict';

    var minSize = 0.05;
    return function (scene, character) {

        var width  = character.width;
        var height = character.height;


        var size = {
            height : height - (minSize * 2),
            width  : minSize,
            length : minSize
        };

        addCollider(size, new BABYLON.Vector3(-width / 2 + minSize / 2, 0, 0), scene, character.mesh);
        addCollider(size, new BABYLON.Vector3(width / 2  - minSize / 2, 0, 0), scene, character.mesh);


        size = {
            height : minSize,
            width  : width - (minSize * 2),
            length : minSize
        };


        addCollider(size, new BABYLON.Vector3(0, height / 2  - minSize / 2, 0), scene, character.mesh);
        addCollider(size, new BABYLON.Vector3(0, -height / 2 + minSize / 2, 0), scene, character.mesh);
    };


    function addCollider (size, position, scene, parent) {
        var collider = BABYLON.Mesh.CreateBox("collider", size, scene);
        collider.parent    = parent;
        collider.position  = position;
        collider.isVisible = false;
    }
});