define([
    'jquery',
    'babylon',
    './inputs',
    './entityPhysics',
    './entity_capabilities',
    './minY'
], function ($, BABYLON, inputs, EntityPhysics, addEntityCapabilities, minY) {
    'use strict';

    /*==============================
    =            CONFIG            =
    ==============================*/

        // physics
    var acceleration = 20;
    var diameter     = 0.5;
    var height       = 1;
    var jumpHeight   = 3;
    var invulnerableDuration = 2;

        //charge attack
    var chargeMaxDuration = 1;
    var chargeMaxVelocity = new BABYLON.Vector3(50, 2, 0);
    var speedToBeCharging = 10;
    var chargeRotateSpeed = 12;

        //thunderbolt
    var thunderboltOffset   = new BABYLON.Vector3(0, 3, -2);
    var thunderboltDuration = 0.2;


        // collision
    var hitEnnemyEjectForce = 9.5;


        // Fall
    var motionlessDuration = 0.7;
    var yOffsetRespawn     = 0.3;


    var maxLife = 3;


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
        this.life      = maxLife;
        this.maxLife   = maxLife;
        this.direction = 1;

        this.chargeElapsedTime = 0;

        this.motionlessElapsedTime = motionlessDuration;

        addEntityCapabilities(this);
    }


    Player.prototype.setChildsMeshes = function (meshes) {
        this.childsMeshes = [];
        for (var i = 0; i < meshes.length; i++) {
            var mesh = meshes[i].clone();
            mesh.parent = this.mesh;

            mesh.scaling.x = 0.065;
            mesh.scaling.y = 0.065;
            mesh.scaling.z = 0.065;
            mesh.isVisible = true;

            mesh.rotate(BABYLON.Axis.X, 4.75, BABYLON.Space.LOCAL);
            mesh.position.y -= 0.5;
            this.childsMeshes.push(mesh);
        };
    };


    Player.prototype.init = function (scene, start, meshes) {
        var player = this;

        this.startPoint = start;

        this.mesh = BABYLON.Mesh.CreateCylinder("player", height, diameter, diameter, 10, scene);
        this.mesh.position  = new BABYLON.Vector3(start.x, start.y, 0);
        this.mesh.ellipsoid = new BABYLON.Vector3(0.25, 0.5, 0.125);
        this.mesh.ellipsoidOffset = new BABYLON.Vector3(0, 0.5, 0);
        this.mesh.isVisible = false;

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
        this.isDoingThuderbolt      = false;
        this.thunderbolt = {};
        this.thunderbolt.elapsedTime = 0;

        this.thunderbolt.spawnPoint          = BABYLON.Mesh.CreateSphere("thunderboltSpawnPoint", 0, 0.2, scene);;
        this.thunderbolt.spawnPoint.position = thunderboltOffset;
        this.thunderbolt.spawnPoint.parent   = this.mesh;

        this.thunderbolt.mesh            = BABYLON.Mesh.CreateBox("thunderbolt", {height: thunderboltOffset.y, width : 0.3, length : 0.1}, scene);
        this.thunderbolt.mesh.position   = new BABYLON.Vector3(thunderboltOffset.x, thunderboltOffset.y, thunderboltOffset.z);
        this.thunderbolt.mesh.position.y -= thunderboltOffset.y / 2;
        this.thunderbolt.mesh.parent     = this.mesh;
        this.thunderbolt.physics         = new EntityPhysics(this.thunderbolt);
        this.thunderbolt.tag             = 'player attack';
        this.thunderbolt.mesh.isVisible  = false;
        this.thunderbolt.mesh.checkCollisions = false;

        this.thunderbolt.particleSystem = new BABYLON.ParticleSystem("thunderbolt", 10000, scene);
        this.thunderbolt.particleSystem.emitter     = this.thunderbolt.spawnPoint;
        this.thunderbolt.particleSystem.direction1  = new BABYLON.Vector3(-0.2, -50, 0);
        this.thunderbolt.particleSystem.direction2  = new BABYLON.Vector3(0.2, -50, 0);
        this.thunderbolt.particleSystem.minEmitBox  = new BABYLON.Vector3(-0.4, 0, 0);
        this.thunderbolt.particleSystem.maxEmitBox  = new BABYLON.Vector3(0.4, -1, 0);
        this.thunderbolt.particleSystem.minSize     = 0.1;
        this.thunderbolt.particleSystem.maxSize     = 0.2;
        this.thunderbolt.particleSystem.emitRate    = 500;
        this.thunderbolt.particleSystem.updateSpeed = 0.005;
        this.thunderbolt.particleSystem.minLifeTime = 0.07;
        this.thunderbolt.particleSystem.maxLifeTime = 0.09;
        this.thunderbolt.particleSystem.gravity     = new BABYLON.Vector3(0, -9.81, 0);
        // this.thunderbolt.particleSystem.manualEmitCount = 300;
        this.thunderbolt.particleSystem.minAngularSpeed = 0;
        this.thunderbolt.particleSystem.maxAngularSpeed = 2;
        this.thunderbolt.particleSystem.particleTexture = new BABYLON.Texture("../assets/thunderbolt.png", scene);

    };


    Player.prototype.onHitEnnemy = function (ennemy) {
        if (Math.abs(this.physics.velocity.x) > speedToBeCharging) {
            ennemy.physics.velocity.x = this.physics.velocity.x * 2;
        }
        else {
            this.physics.velocity.y = this.jumpForce / 2;

            var xDiff = ennemy.mesh.position.x - this.mesh.position.x;
            var ejectXDirection = (xDiff > 0) ? -1 : 1;

            this.physics.velocity.x   =  ejectXDirection * hitEnnemyEjectForce;
            ennemy.physics.velocity.x = -ejectXDirection * hitEnnemyEjectForce;

            if (!this.invulnerable) {
                this.loseLife();
            }
        }
    };


    Player.prototype.loseLife = function () {
        this.invulnerable = true;
        this.life--;
    };


    Player.prototype.jump = function () {
        this.physics.velocity.y = this.jumpForce;
    };


    Player.prototype.launchChargeAttack = function () {
        var ratio = Math.min(1, this.chargeElapsedTime / chargeMaxDuration);

        this.chargeElapsedTime = 0;
        this.physics.velocity.x = chargeMaxVelocity.x * ratio * -this.direction;
        this.physics.velocity.y += chargeMaxVelocity.y * ratio;
    };


    Player.prototype.checkFallDeath = function (deltaTime) {
        if (this.mesh.position.y < minY.get()) {
            this.placeOnLastGroundPosition();

            this.chargeElapsedTime     = 0;
            this.motionlessElapsedTime = 0;

            this.loseLife();
        }
        else if (this.motionlessElapsedTime < motionlessDuration) {
            this.placeOnLastGroundPosition();
            this.motionlessElapsedTime += deltaTime;
        }
    };


    Player.prototype.placeOnLastGroundPosition = function () {
        this.mesh.position.x = this.physics.lastGroundPosition.x;
        this.mesh.position.y = this.physics.lastGroundPosition.y + yOffsetRespawn;

        this.physics.velocity.x = 0;
        this.physics.velocity.y = 0;
    }


    Player.prototype.launchThunderbolt = function () {
        this.isDoingThuderbolt       = true;
        this.thunderbolt.elapsedTime = 0;
        this.thunderbolt.mesh.checkCollisions = true;
        this.thunderbolt.particleSystem.start();
    };


    Player.prototype.stopThunderbolt = function () {
        this.thunderbolt.elapsedTime = 0;
        this.isDoingThuderbolt       = false;
        this.thunderbolt.mesh.checkCollisions = false;
        this.thunderbolt.particleSystem.stop();
    };




    /*=======================================
    =            UPDATES METHODS            =
    =======================================*/

    Player.prototype.update = function (deltaTime) {
        this.updateInvulnerability(deltaTime);
        this.physics.update(deltaTime);
        this.updateInputs(deltaTime);
        this.updateRotationOverride(deltaTime);
        this.updateChargeAttack(deltaTime);
        this.updateThunderboltAttack(deltaTime);
        this.checkFallDeath(deltaTime);
    };


    Player.prototype.updateRotationOverride = function (deltaTime) {
        if (Math.abs(this.physics.velocity.x) > speedToBeCharging) { // Charge Attack Animation
            if (this.physics.velocity.x !== 0) {
                this.direction = (this.physics.velocity.x > 0) ? -1 : 1;
            }

            this.mesh.rotation.y = 0;
            this.mesh.rotation.z = Math.PI / 2 * -this.direction;
            this.mesh.rotation.x += Math.PI * deltaTime * chargeRotateSpeed;
        }
        else {
            this.updateRotation(deltaTime);
        }
    };


    Player.prototype.updateInputs = function (deltaTime) {
        if (this.motionlessElapsedTime < motionlessDuration) {
            return;
        }

        if (inputs.left) {
            this.physics.velocity.x -= acceleration * deltaTime;
            this.forceDirection = 1;
        }
        else if (inputs.right) {
            this.physics.velocity.x += acceleration * deltaTime;
            this.forceDirection = -1;
        } else {
            this.forceDirection = 0;
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
        if (this.isDoingThuderbolt) {
            this.thunderbolt.elapsedTime += deltaTime;

            if (this.thunderbolt.elapsedTime > thunderboltDuration) {
                this.stopThunderbolt();
            }
        }
        if (inputs.bottom && this.physics.onGround) {
            this.launchThunderbolt();
        }
    };




    /*==========================================
    =            RETURN (singleton)            =
    ==========================================*/

    return new Player ();
});