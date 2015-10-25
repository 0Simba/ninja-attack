define([
], function () {
    'use strict';

    var oneTurnRadians = Math.PI * 2;
    var rotateDuration = 1.2;
    var offsetY        = 0.1;

    return function (entity) {
        entity.rotateElapsedTime = 0;
        entity.startY            = entity.mesh.position.y;

        entity.updateRotation = function (deltaTime) {
            entity.rotateElapsedTime += deltaTime;

            var ratio = (entity.rotateElapsedTime % rotateDuration) / rotateDuration;
            var angle = ratio * oneTurnRadians;

            entity.mesh.position.y = entity.startY + Math.sin(angle) * offsetY;
            entity.mesh.rotation.y = angle;
        };
    }
});