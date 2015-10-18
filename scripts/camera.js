define([
    'babylon',
    './hot_zones_checker'
], function (BABYLON, hotZonesChecker) {
    'use strict';


    /*==============================
    =            CONFIG            =
    ==============================*/

        // babylon camera
    var startPosition      = new BABYLON.Vector3(0, 0, -20);
    var radius             = 10; // how far from the object to follow
    var heightOffset       = 1; // how high above the object to place the camera
    var rotationOffset     = 180; // the viewing angle
    var cameraAcceleration = 0.05; // how fast to move
    var maxCameraSpeed     = 1; // speed limit


        //target point
    var pointVelocityOffsetRatioX = 0.5;
    var pointVelocityOffsetRatioY = 0.1;
    var moveToTargetXRatio       = 0.1;
    var moveToTargetYRatio       = 0.1;
    var maxOffset                = 1.5;

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
        this.targetPoint = BABYLON.Mesh.CreateSphere("target", 0, 0.3, scene);
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
            this.targetPoint.position.z + (nextPoint.z - this.targetPoint.position.z) * moveToTargetYRatio
        );

        var hotZonesCheckedPosition = hotZonesChecker.checkWith(nextPoint, radius);

        if (hotZonesCheckedPosition) {
            this.targetPoint.position.x = hotZonesCheckedPosition.x;
            this.targetPoint.position.y = hotZonesCheckedPosition.y;
            this.camera.radius = hotZonesCheckedPosition.zoom;
        }
        else {
            this.camera.radius = radius;
        }

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
        var xDiff = Math.max(-maxOffset, Math.min(maxOffset, this.player.physics.velocity.x * pointVelocityOffsetRatioX));
        var yDiff = Math.max(-maxOffset, Math.min(maxOffset, this.player.physics.velocity.y * pointVelocityOffsetRatioY));

        var point = new BABYLON.Vector3 (
            this.player.mesh.position.x + xDiff,
            this.player.mesh.position.y + yDiff,
            this.player.mesh.position.z// - Math.abs(xDiff) - Math.abs(yDiff)
        );

        return point;
    }



    /*=========================================
    =            RETURN (singleton)           =
    =========================================*/


    return new Camera();
});