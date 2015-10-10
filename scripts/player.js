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
    var invulnerableDuration = 2;

    var chargeMaxDuration = 1;
    var chargeMaxVelocity = new BABYLON.Vector3(50, 2, 0);
    var speedToBeCharging = 7;
    var chargeRotateSpeed = 12;

    var turnSpeedRatio = 0.2;




    /*===============================
    =            METHODS            =
    ===============================*/

    function Player () {
        this.width     = diameter;
        this.height    = height;
        this.jumpForce = Math.sqrt(jumpHeight * -EntityPhysics.gravity * 2);

        this.invulnerable = false;
        this.invulnerableElapsedTime = 0

        this.tag       = 'player';
        this.life      = 3;
        this.direction = 1;

        this.chargeElapsedTime = 0;
    }


    Player.prototype.init = function (scene, start, mesh) {
        var player = this;

        this.mesh = BABYLON.Mesh.CreateCylinder("player", height, diameter, diameter, 0, scene);
        this.mesh.position  = new BABYLON.Vector3(start.x, start.y, 0);
        this.mesh.ellipsoid = new BABYLON.Vector3(0.25, 0.5, 0.125);
        this.mesh.ellipsoidOffset = new BABYLON.Vector3(0, 0.5, 0);

        this.childsMeshes = mesh;

        for (var i = 0; i < mesh.length; i++) {
            mesh[i].parent = this.mesh;

            mesh[i].scaling.x = 0.065;
            mesh[i].scaling.y = 0.065;
            mesh[i].scaling.z = 0.065;

            mesh[i].rotate(BABYLON.Axis.X, 4.75, BABYLON.Space.LOCAL);
            mesh[i].position.y -= 0.5;
        };

        this.physics = new EntityPhysics(this);
        this.physics.onEntityCollide = function (target) {
            if (target.tag === 'ennemy') {
                player.onHitEnnemy();
            }
        }

    };


    Player.prototype.onHitEnnemy = function () {
        this.physics.velocity.y = this.jumpForce / 2;
        if (!this.invulnerable) {
            this.invulnerable = true;
            this.life--;
            $('#debug .player_life').html(this.life);
        }
    };


    Player.prototype.jump = function () {
        this.physics.velocity.y = this.jumpForce;
    };


    Player.prototype.launchChargeAttack = function () {
        var ratio = Math.min(1, this.chargeElapsedTime / chargeMaxDuration);

        this.chargeElapsedTime = 0;
        this.physics.velocity.x += chargeMaxVelocity.x * ratio * -this.direction;
        this.physics.velocity.y += chargeMaxVelocity.y * ratio;
    };



    /*=======================================
    =            UPDATES METHODS            =
    =======================================*/

    Player.prototype.update = function (deltaTime) {
        this.updateInvulnerability(deltaTime);
        this.physics.update(deltaTime);
        this.updateInputs(deltaTime);
        this.updateRotation(deltaTime);
        this.updateChargeAttack(deltaTime);
    };


    Player.prototype.updateRotation = function (deltaTime) {
        if (this.physics.velocity.x !== 0) {
            this.direction = (this.physics.velocity.x > 0) ? -1 : 1;
        }

        if (Math.abs(this.physics.velocity.x) > speedToBeCharging) {
            this.mesh.rotation.y = 0;
            this.mesh.rotation.z = Math.PI / 2 * -this.direction;
            this.mesh.rotation.x += Math.PI * deltaTime * chargeRotateSpeed;
        }
        else {
            this.mesh.rotation.z = 0;
            var targetYRotation = Math.PI / 2 * this.direction;
            if (this.physics.onRoof) {
                targetYRotation *= -1;
            }
            this.mesh.rotation.y = this.mesh.rotation.y + (targetYRotation - this.mesh.rotation.y) * turnSpeedRatio;

            var targetXRotation = (this.physics.onRoof) ? Math.PI : 0;
            this.mesh.rotation.x = this.mesh.rotation.x + (targetXRotation - this.mesh.rotation.x) * turnSpeedRatio;
        }
    };


    Player.prototype.updateInputs = function (deltaTime) {
        if (inputs.left) {
            this.physics.velocity.x -= acceleration * deltaTime;
        }
        if (inputs.right) {
            this.physics.velocity.x += acceleration * deltaTime;
        }
        if (inputs.up && (this.physics.onGround || this.physics.onRoof)) {
            this.jump();
        }
    };


    Player.prototype.updateInvulnerability = function (deltaTime) {
        if (this.invulnerable) {
            this.invulnerableElapsedTime += deltaTime;

            var alpha = 1;
            if (this.invulnerableElapsedTime > invulnerableDuration) {
                this.invulnerableElapsedTime = 0;
                this.invulnerable = false;
                this.isVisible = true;
            }
            else {
                alpha = (this.invulnerableElapsedTime * 1000 % 200 > 100) ? 1 : 0.5;
            }


            for (var i = 0; i < this.childsMeshes.length; i++) {
                this.childsMeshes[i].visibility = alpha;
            };
        }
    };


    Player.prototype.updateChargeAttack = function (deltaTime) {
        if (inputs.space) {
            this.chargeElapsedTime += deltaTime;

            var ratio = Math.min(1, this.chargeElapsedTime / chargeMaxDuration);
            $('#debug .charge_ratio').html(ratio);
        }
        else if (this.chargeElapsedTime > 0) {
            this.launchChargeAttack();
        }
    };


    /*==========================================
    =            RETURN (singleton)            =
    ==========================================*/

    return new Player ();
});