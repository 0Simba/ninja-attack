define([
], function () {
    'use strict';


    var ia = {};

    var leftRightIASpeed = 3;

    ia.addLeftRightIA = function (object) {
        object.moveElapsedTime = 0;
        object.direction = -1;

        object.ia = function (deltaTime) {
            object.moveElapsedTime += deltaTime;
            if (object.moveElapsedTime > object.iaValue) {
                this.direction *= -1;
                object.moveElapsedTime = 0;
            }

            object.mesh.moveWithCollisions(new BABYLON.Vector3(leftRightIASpeed * object.direction * deltaTime, 0, 0));
        }
    };


    return ia;
});