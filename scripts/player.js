define([
    'babylon',
    './inputs',
    './addCharacterCollider',
    './entityPhysics'
], function (BABYLON, inputs, addCharacterCollider, EntityPhysics) {
    'use strict';

    /*==============================
    =            CONFIG            =
    ==============================*/

    var acceleration = 45;
    var diameter     = 0.5;
    var height       = 1;



    /*===============================
    =            METHODS            =
    ===============================*/

    function Player () {
        this.width   = diameter;
        this.height  = height;
    }


    Player.prototype.init = function (scene, start) {
        this.mesh = BABYLON.Mesh.CreateCylinder("player", height, diameter, diameter, 20, scene);
        this.mesh.position  = new BABYLON.Vector3(start.x, start.y, 0);
        this.mesh.ellipsoid = new BABYLON.Vector3(0.125, 0.25, 0.125);

        // addCharacterCollider(scene, this);
        this.mesh.checkCollisions = true;
        this.physics = new EntityPhysics(this);
    };


    Player.prototype.update = function (deltaTime) {
        if (inputs.left) {
            this.physics.velocity.x -= acceleration * deltaTime;
        }
        if (inputs.right) {
            this.physics.velocity.x += acceleration * deltaTime;
        }
        this.physics.update(deltaTime);
    };




    /*==========================================
    =            RETURN (singleton)            =
    ==========================================*/

    return new Player ();
});