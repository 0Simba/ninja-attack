define([
    'babylon'
], function (BABYLON) {
    'use strict';


    /*==============================
    =            CONFIG            =
    ==============================*/

    var offset   = new BABYLON.Vector3(0, 4, -20);
    var rotation = new BABYLON.Vector3(Math.PI / 16, 0, 0);



    /*===============================
    =            METHODS            =
    ===============================*/

    function Camera () {
    }


    Camera.prototype.init = function (scene, targetMesh) {
        this.camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 3, -15), scene);
        this.target = targetMesh;
        this.camera.rotation = rotation;
    }


    Camera.prototype.update = function () {
        this.camera.position = new BABYLON.Vector3 (
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