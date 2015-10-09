define([
    'babylon'
], function (BABYLON) {
    'use strict';

    return function (scene, walls) {
        for (var i = 0; i < walls.length; i++) {
            var wallConfig = walls[i];

            var wall = BABYLON.Mesh.CreateBox("wall" + i, {height: wallConfig.height, width : wallConfig.width, length : 2}, scene);
            wall.position = new BABYLON.Vector3(wallConfig.x, wallConfig.y, 0);
            walls.checkCollisions = true;

        };
    }
});