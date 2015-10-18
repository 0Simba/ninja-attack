define([
    './player'
], function (player) {
    'use strict';


    var ia = {};


    /*======================================
    =            Left right IA             =
    ======================================*/

    var leftRightSpeed = 3;

    ia.addLeftRightIA = function (object) {
        object.moveElapsedTime = 0;
        object.direction = -1;

        object.ia = function (deltaTime) {
            object.moveElapsedTime += deltaTime;
            if (object.moveElapsedTime > object.iaValue) {
                this.direction *= -1;
                object.moveElapsedTime = 0;
            }

            object.mesh.moveWithCollisions(new BABYLON.Vector3(leftRightSpeed * object.direction * deltaTime, 0, 0));
        }
    };





    /*====================================
    =            Focus player            =
    ====================================*/

    var minDistanceToFocus      = 5;
    var focusPlayerAcceleration = 30;

    ia.addFocusPlayer = function (object) {
        object.ia = function (deltaTime) {
            var diffX    = player.mesh.position.x - this.mesh.position.x;
            var diffY    = player.mesh.position.y - this.mesh.position.y;
            var distance = Math.sqrt(diffX * diffX + diffY * diffY);

            if (distance <= minDistanceToFocus) {
                this.direction = (diffX < 0) ? -1 : 1;
                this.physics.velocity.x += focusPlayerAcceleration * deltaTime * this.direction;
            }
        };
    };

    return ia;
});