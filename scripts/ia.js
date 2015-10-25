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
        object.moveDuration    = object.iaValue / leftRightSpeed;
        object.moveElapsedTime = 0;
        object.direction       = -1;

        object.ia = function (deltaTime) {
            if (Math.abs(object.physics.velocity.x) > leftRightSpeed) {
                return;
            }

            object.moveElapsedTime += deltaTime;
            if (object.moveElapsedTime > object.moveDuration) {
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




    /*================================
    =            Top Down            =
    ================================*/

    var topDownSpeed = 1.5;

    ia.addTopDown = function (object) {
        object.moveElapsedTime = 0;
        object.moveDuration    = object.iaValue / topDownSpeed;
        object.yDirection      = 1;

        object.ia = function (deltaTime) {
            object.moveElapsedTime += deltaTime;
            if (object.moveElapsedTime > object.moveDuration) {
                this.yDirection *= -1;
                object.moveElapsedTime = 0;
            }

            object.mesh.moveWithCollisions(new BABYLON.Vector3(0, topDownSpeed * object.yDirection * deltaTime, 0));
        };
    }




    /*========================================
    =            Fly Focus Player            =
    ========================================*/

    var minDistanceToFlyFocus = 7;
    var flyFocusAcceleration  = 15;

    ia.addFlyFocusPlayer = function (object) {
        object.ia = function (deltaTime) {
            var diffX    = player.mesh.position.x - this.mesh.position.x;
            var diffY    = player.mesh.position.y - this.mesh.position.y;
            var distance = Math.sqrt(diffX * diffX + diffY * diffY);

            if (distance <= minDistanceToFlyFocus) {
                var angle = Math.atan2(diffY, diffX);
                this.direction = (diffX < 0) ? -1 : 1;
                this.physics.velocity.x += Math.cos(angle) * flyFocusAcceleration * deltaTime;
                this.physics.velocity.y += Math.sin(angle) * flyFocusAcceleration * deltaTime;
            }
        };
    }



    return ia;
});