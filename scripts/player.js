define([
    'babylon',
    './inputs',
    './addCharacterCollider'
], function (BABYLON, inputs, addCharacterCollider) {
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
        this.width  = diameter;
        this.height = height;
    }


    Player.prototype.init = function (scene, start, mesh) {
        this.mesh = BABYLON.Mesh.CreateCylinder("player", height, diameter, diameter, 0, scene);
        for (var i = 0; i < mesh.length; i++) {
            mesh[i].parent = this.mesh;

            mesh[i].scaling.x = 0.095;
            mesh[i].scaling.y = 0.095;
            mesh[i].scaling.z = 0.095;

            mesh[i].rotate(BABYLON.Axis.X, 4.75, BABYLON.Space.LOCAL);
        };
        this.mesh.position = new BABYLON.Vector3(start.x, start.y, 0);

        addCharacterCollider(scene, this);
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