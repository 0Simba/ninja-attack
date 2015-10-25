define([
    'babylon'
], function (BABYLON) {
    'use strict';

    return function (scene, walls, texture) {
        var z = 0;

        for (var i = 0; i < walls.length; i++) {

            var wallConfig = walls[i];

            var wall = BABYLON.Mesh.CreateBox("wall", {height: wallConfig.height, width : wallConfig.width, depth : 2}, scene);
            wall.position        = new BABYLON.Vector3(wallConfig.x, wallConfig.y, z);
            wall.checkCollisions = true;

            wall.material = new BABYLON.StandardMaterial('wall material', scene);
            wall.material.diffuseTexture = texture;

            var wallRatio = wallConfig.width / wallConfig.height;

            wall.material.diffuseTexture.vScale = 2;
            wall.material.diffuseTexture.uScale = wallConfig.width;

            z += 0.001;
        };
    }
});