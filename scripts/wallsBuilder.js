define([
    'babylon'
], function (BABYLON) {
    'use strict';

    return function (scene, walls) {
        var material = new BABYLON.StandardMaterial('wall material', scene);
        var texture  = new BABYLON.Texture('./assets/wall.jpg', scene);

        material.diffuseTexture = texture;

        for (var i = 0; i < walls.length; i++) {
            var wallConfig = walls[i];

            var wall = BABYLON.Mesh.CreateBox("wall", {height: wallConfig.height, width : wallConfig.width, length : 2}, scene);
            wall.position        = new BABYLON.Vector3(wallConfig.x, wallConfig.y, 0);
            wall.checkCollisions = true;
            wall.material        = material;
        };
    }
});