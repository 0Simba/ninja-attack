define([
    'babylon',
    './player',
    './collectiblesBuilder'
], function (BABYLON, player, collectiblesBuilder) {
    'use strict';

    var animDuration = 5;

    return function (scene, position) {
        var texture  = new BABYLON.Texture('./assets/end_point.jpg', scene);

        var endPoint = BABYLON.Mesh.CreateSphere("end point", 20, 1, scene);
        endPoint.position = new BABYLON.Vector3(position.x, position.y, 0);
        endPoint.material = new BABYLON.StandardMaterial("material", scene);

        endPoint.actionManager = new BABYLON.ActionManager(scene);
        endPoint.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction({ 'trigger' : BABYLON.ActionManager.OnIntersectionEnterTrigger, parameter : player.mesh}, function () {
                if (collectiblesBuilder.picked.length === collectiblesBuilder.nbPicked) {
                    console.log('You win');
                } else {
                    alert('pas assez d\'etoiles');
                }
            }
        ));


        endPoint.startPosition = new BABYLON.Vector3(position.x, position.y, 0);
        endPoint.elapsedTime   = 0;

        endPoint.update = function (deltaTime) {
            endPoint.elapsedTime += deltaTime;

            if (collectiblesBuilder.picked.length === collectiblesBuilder.nbPicked) {
                endPoint.move();
            }
        };


        endPoint.move = function () {
            endPoint.material.diffuseTexture = texture;

            var ratio = (endPoint.elapsedTime % animDuration) / animDuration;
            var angle = Math.PI * 2 * ratio * 5;


            var offsetY = Math.sin(ratio * Math.PI) * 0.5;
            var offsetX = Math.cos(angle) * 0.2;
            var offsetZ = Math.sin(angle) * 0.2;

            endPoint.rotation.y = ratio * Math.PI * 2;

            endPoint.position = new BABYLON.Vector3(
                endPoint.startPosition.x + offsetX,
                endPoint.startPosition.y + offsetY,
                endPoint.startPosition.z + offsetZ
            );
        }

        return endPoint;

    }
});