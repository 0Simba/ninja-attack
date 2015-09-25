define([
    'babylon',
    './inputs'
], function (BABYLON, inputs) {
    'use strict';

    /*==============================
    =            CONFIG            =
    ==============================*/

    var acceleration = 10;
    var diameter     = 1;
    var height       = 2;



    /*===============================
    =            METHODS            =
    ===============================*/

    function Player () {
    }


    Player.prototype.init = function (scene) {
        this.mesh = BABYLON.Mesh.CreateCylinder("player", height, diameter, diameter, 20, scene);
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