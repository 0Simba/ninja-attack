define([
    'babylon'
], function (BABYLON) {
    'use strict';


    /*==============================
    =            CONFIG            =
    ==============================*/

    var offset   = new BABYLON.Vector3(0, 2, -10);
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
        if (!this.target || !this.target.position) {
            console.error('Camera -> pas de "target" valide');
        }
    }




    /*=========================================
    =            RETURN (singleton)           =
    =========================================*/


    return new Camera();
});