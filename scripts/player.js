define([
    'jquery',
    'babylon',
    './inputs',
    './entityPhysics',
    './minY'
], function ($, BABYLON, inputs, EntityPhysics, minY) {
    'use strict';

    /*==============================
    =            CONFIG            =
    ==============================*/

    var acceleration = 20;
    var diameter     = 0.5;
    var height       = 1;
    var jumpHeight   = 3;
    var invulnerableDuration = 2;

    var chargeMaxDuration = 1;
    var chargeMaxVelocity = new BABYLON.Vector3(50, 2, 0);
    var speedToBeCharging = 7;
    var chargeRotateSpeed = 12;

    var turnSpeedRatio = 0.2;

    var thunderboltOffset = new BABYLON.Vector3(0, 3, -2);




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


    Player.prototype.setChildsMeshes = function (meshes) {
        for (var i = 0; i < meshes.length; i++) {
            meshes[i].parent = this.mesh;

            meshes[i].scaling.x = 0.065;
            meshes[i].scaling.y = 0.065;
            meshes[i].scaling.z = 0.065;

            meshes[i].rotate(BABYLON.Axis.X, 4.75, BABYLON.Space.LOCAL);
            meshes[i].position.y -= 0.5;
        };

        this.childsMeshes = meshes;
    };


    Player.prototype.init = function (scene, start, meshes) {
        var player = this;

        this.startPoint = start;

        this.mesh = BABYLON.Mesh.CreateCylinder("player", height, diameter, diameter, 0, scene);
        this.mesh.position  = new BABYLON.Vector3(start.x, start.y, 0);
        this.mesh.ellipsoid = new BABYLON.Vector3(0.25, 0.5, 0.125);
        this.mesh.ellipsoidOffset = new BABYLON.Vector3(0, 0.5, 0);

        this.setChildsMeshes(meshes);
        this.initThunderboltAttack(scene);

        this.physics = new EntityPhysics(this);
        this.physics.onEntityCollide = function (target) {
            if (target.tag === 'ennemy') {
                player.onHitEnnemy(target);
            }
        }

    };


    Player.prototype.initThunderboltAttack = function (scene) {
        this.thunderboltSpawnPoint = BABYLON.Mesh.CreateSphere("thunderboltSpawnPoint", 10, 0.2, scene);;
        this.thunderboltSpawnPoint.position = thunderboltOffset;

        this.thunderboltParticleSystem = new BABYLON.ParticleSystem("thunderbolt", 10000, scene);
        this.thunderboltParticleSystem.emitter    = this.thunderboltSpawnPoint;
        this.thunderboltParticleSystem.direction1 = new BABYLON.Vector3(-0.2, -20, 0);
        this.thunderboltParticleSystem.direction2 = new BABYLON.Vector3(0.2, -20, 0);
        this.thunderboltParticleSystem.minEmitBox = new BABYLON.Vector3(-0.4, 0, 0);
        this.thunderboltParticleSystem.maxEmitBox = new BABYLON.Vector3(0.4, 0, 0);
        this.thunderboltParticleSystem.minSize    = 0.01;
        this.thunderboltParticleSystem.maxSize    = 0.1;
        this.thunderboltParticleSystem.emitRate   = 1000;
        this.thunderboltParticleSystem.updateSpeed = 0.005;
        this.thunderboltParticleSystem.minLifeTime = 0.2;
        this.thunderboltParticleSystem.maxLifeTime = 0.22;
        this.thunderboltParticleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);
        this.thunderboltParticleSystem.minAngularSpeed = 0;
        this.thunderboltParticleSystem.maxAngularSpeed = 2;
        this.thunderboltParticleSystem.particleTexture = new BABYLON.Texture("../assets/thunderbolt.png", scene);

        this.thunderboltSpawnPoint.parent = this.mesh;

        this.thunderboltParticleSystem.start();
    };


    Player.prototype.onHitEnnemy = function (ennemy) {
        if (Math.abs(this.physics.velocity.x) > speedToBeCharging) {
            ennemy.physics.velocity.x = this.physics.velocity.x * 2;
        }
        else if (!this.invulnerable) {
            this.loseLife();
            $('#debug .player_life').html(this.life);
            this.physics.velocity.y = this.jumpForce / 2;
        }
        else {
            this.physics.velocity.y = this.jumpForce / 2;
        }
    };


    Player.prototype.loseLife = function () {
        this.invulnerable = true;
        this.life--;
    }


    Player.prototype.jump = function () {
        this.physics.velocity.y = this.jumpForce;
    };


    Player.prototype.launchChargeAttack = function () {
        var ratio = Math.min(1, this.chargeElapsedTime / chargeMaxDuration);

        this.chargeElapsedTime = 0;
        this.physics.velocity.x = chargeMaxVelocity.x * ratio * -this.direction;
        this.physics.velocity.y += chargeMaxVelocity.y * ratio;
    };


    Player.prototype.checkFallDeath = function () {
        if (this.mesh.position.y < minY.get()) {
            this.mesh.position.x = this.startPoint.x;
            this.mesh.position.y = this.startPoint.y;

            this.physics.velocity.x = 0;
            this.physics.velocity.y = 0;

            this.chargeElapsedTime  = 0;
            this.loseLife();
        }
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
        this.checkFallDeath();
    };


    Player.prototype.updateRotation = function (deltaTime) {
        if (this.physics.velocity.x !== 0) {
            this.direction = (this.physics.velocity.x > 0) ? -1 : 1;
        }

        if (Math.abs(this.physics.velocity.x) > speedToBeCharging) { // Charge Attack Animation
            this.mesh.rotation.y = 0;
            this.mesh.rotation.z = Math.PI / 2 * -this.direction;
            this.mesh.rotation.x += Math.PI * deltaTime * chargeRotateSpeed;
        }
        else {                                                       // Normal Animation
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


    Player.prototype.updateThunderboltAttack = function (deltaTime) {
    };




    /*==========================================
    =            RETURN (singleton)            =
    ==========================================*/

    return new Player ();
});