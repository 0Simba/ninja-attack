define([
    'jquery',
    'babylon',
    './inputs',
    './entityPhysics'
], function ($, BABYLON, inputs, EntityPhysics) {
    'use strict';

    /*==============================
    =            CONFIG            =
    ==============================*/

    var acceleration = 20;
    var diameter     = 0.5;
    var height       = 1;
    var jumpHeight   = 5;



    /*===============================
    =            METHODS            =
    ===============================*/

    function Player () {
        this.width     = diameter;
        this.height    = height;
        this.jumpForce = Math.sqrt(jumpHeight * -EntityPhysics.gravity * 2);
    }


    Player.prototype.init = function (scene, start, mesh) {
        this.mesh = BABYLON.Mesh.CreateCylinder("player", height, diameter, diameter, 0, scene);
        this.mesh.position  = new BABYLON.Vector3(start.x, start.y, 0);
        this.mesh.ellipsoid = new BABYLON.Vector3(0.125, 0.25, 0.125);

        for (var i = 0; i < mesh.length; i++) {
            mesh[i].parent = this.mesh;

            mesh[i].scaling.x = 0.065;
            mesh[i].scaling.y = 0.065;
            mesh[i].scaling.z = 0.065;

            mesh[i].rotate(BABYLON.Axis.X, 4.75, BABYLON.Space.LOCAL);
            mesh[i].position.y -= 0.5;
        };

        this.mesh.checkCollisions = true;
        this.physics = new EntityPhysics(this);
    };


    Player.prototype.update = function (deltaTime) {
        this.physics.update(deltaTime);
        if (inputs.left) {
            this.physics.velocity.x -= acceleration * deltaTime;
        }
        if (inputs.right) {
            this.physics.velocity.x += acceleration * deltaTime;
        }
        if (inputs.up && (this.physics.onGround || this.physics.onRoof)) {
            this.jump();
        }
        $('#debug .player_y_velocity').html(Math.round(this.physics.velocity.y * 10000) / 10000);
        $('#debug .player_x_velocity').html(Math.round(this.physics.velocity.x * 10000) / 10000);
    };


    Player.prototype.jump = function () {
        this.physics.velocity.y += this.jumpForce;
    }

    /*==========================================
    =            RETURN (singleton)            =
    ==========================================*/

    return new Player ();
});