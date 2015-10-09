define([
    'babylon'
], function (BABYLON) {
    'use strict';


    /*==============================
    =            CONFIG            =
    ==============================*/

    var offset   = new BABYLON.Vector3(0, 4, -20);
    var rotation = new BABYLON.Vector3(Math.PI / 16, 0, 0);
    var manual   = false;


    /*===============================
    =            METHODS            =
    ===============================*/

    function Camera () {
    }


    Camera.prototype.init = function (scene, targetMesh) {
        this.target = targetMesh;
        this.camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 3, -15), scene);
        this.camera.position = this.nextPosition();
        this.camera.rotation = rotation;

        if (manual) {
            this.camera.attachControl(canvas);
        }
    }


    Camera.prototype.update = function () {
        if (manual) {
            return;
        }
        this.camera.position = this.nextPosition();
    }


    Camera.prototype.nextPosition = function () {
        return new BABYLON.Vector3 (
            this.target.position.x + offset.x,
            this.target.position.y + offset.y,
            this.target.position.z + offset.z
        );
    }



    /*=========================================
    =            RETURN (singleton)           =
    =========================================*/


    return new Camera();
});