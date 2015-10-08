define([
    'babylon',
    './inputs'
], function (BABYLON, inputs) {
    'use strict';

    /*==============================
    =            CONFIG            =
    ==============================*/

    var acceleration = 10;
    var diameter     = 0.5;
    var height       = 1;



    /*===============================
    =            METHODS            =
    ===============================*/

    function Player () {
    }


    Player.prototype.init = function (scene, start) {
        this.mesh = BABYLON.Mesh.CreateCylinder("player", height, diameter, diameter, 20, scene);

        this.mesh.position = new BABYLON.Vector3(start.x, start.y, 0);
    };


    Player.prototype.update = function (deltaTime) {
        if (inputs.left) {
            this.mesh.position.x -= 10 * deltaTime;
        }
        if (inputs.right) {
            this.mesh.position.x += 10 * deltaTime;
        }

    };




    /*==========================================
    =            RETURN (singleton)            =
    ==========================================*/

    return new Player ();
});