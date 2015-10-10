define([
    'babylon'
], function (BABYLON) {
    'use strict';


    /*==============================
    =            CONFIG            =
    ==============================*/

    var startPosition      = new BABYLON.Vector3(0, 0, -20);
    var radius             = 10; // how far from the object to follow
    var heightOffset       = 1; // how high above the object to place the camera
    var rotationOffset     = 180; // the viewing angle
    var cameraAcceleration = 0.05; // how fast to move
    var maxCameraSpeed     = 20; // speed limit


    var pointVelocityOffsetRatioX = 0.5;
    var pointVelocityOffsetRatioY = 0.1;
    var moveToTargetXRatio       = 0.2;
    var moveToTargetYRatio       = 0.2;

    var onGroundHeightOffset = 3;
    var onRoofHeightOffset   = -7;
    var normalHeightOffset   = 3;


    var manual        = false;




    /*===============================
    =            METHODS            =
    ===============================*/

    function Camera () {
    }


    Camera.prototype.init = function (scene, player) {
        this.targetPoint = BABYLON.Mesh.CreateSphere("target", 10, 0.3, scene);
        this.player = player;
        this.camera  = new BABYLON.FollowCamera("FollowCam", startPosition, scene);
        this.camera.target = this.targetPoint; // target any mesh or object with a "position" Vector3

        this.camera.radius             = radius;
        this.camera.heightOffset       = heightOffset;
        this.camera.rotationOffset     = rotationOffset;
        this.camera.cameraAcceleration = cameraAcceleration;
        this.camera.maxCameraSpeed     = maxCameraSpeed;


        if (manual) {
            this.camera.attachControl(canvas);
        }
    }


    Camera.prototype.update = function (deltaTime) {
        if (manual) {
            return;
        }

        var nextPoint = this.lookAtPoint(deltaTime);
        this.targetPoint.position = new BABYLON.Vector3(
            this.targetPoint.position.x + (nextPoint.x - this.targetPoint.position.x) * moveToTargetXRatio,
            this.targetPoint.position.y + (nextPoint.y - this.targetPoint.position.y) * moveToTargetYRatio,
            this.targetPoint.position.z + (nextPoint.z - this.targetPoint.position.z) * 1
        );

        if (this.player.physics.onRoof) {
            this.camera.heightOffset = onRoofHeightOffset;
        }
        else if (this.player.physics.onGround) {
            this.camera.heightOffset = onGroundHeightOffset;
        }
        else {
            this.camera.heightOffset = normalHeightOffset;
        }
    }


    Camera.prototype.lookAtPoint = function (deltaTime) {
        var point = new BABYLON.Vector3 (
            this.player.mesh.position.x + (this.player.physics.velocity.x * pointVelocityOffsetRatioX),
            this.player.mesh.position.y + (this.player.physics.velocity.y * pointVelocityOffsetRatioY),
            this.player.mesh.position.z
        );

        return point;
    }



    /*=========================================
    =            RETURN (singleton)           =
    =========================================*/


    return new Camera();
});