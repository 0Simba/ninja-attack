define([
    'jquery',
    'babylon',
    './inputs',
    './entity_physics',
    './entity_capabilities',
    './min_y',
    './animator',
    './hud'
], function ($, BABYLON, inputs, EntityPhysics, addEntityCapabilities, minY, Animator, hud) {
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
    var chargeRotateSpeed = 3;

        //thunderbolt
    var thunderboltOffset   = new BABYLON.Vector3(0, 3, -2);
    var thunderboltDuration = 0.2;
    var thunderboltMinDelay = 0.5;


        // collision
    var hitEnnemyEjectForce = 9.5;


        // Fall
    var motionlessDuration = 0.7;
    var yOffsetRespawn     = 0.3;

    // animations
    var walkSpeed = 0.3;
    var runSpeed  = 3.4;

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
        this.dead      = false;
        this.direction = 1;

        this.chargeElapsedTime = 0;

        this.motionlessElapsedTime = motionlessDuration;

    }


    Player.prototype.setChildsMeshes = function (meshes) {
        this.childsMeshes = [];
        this.skeleton = meshes.loadedSkeletons[0].clone();

        for (var i = 0; i < meshes.loadedMeshes.length; i++) {
            var mesh = meshes.loadedMeshes[i].clone();
            mesh.parent = this.mesh;

            mesh.skeleton  = this.skeleton;
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
        addEntityCapabilities(this);
        var player = this;
        this.dead  = false;
        this.life  = this.maxLife;
        this.scene = scene;
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


        this.initAnimator();
    };


    Player.prototype.initAnimator = function () {
        var that = this;

        this.animator = new Animator(this.skeleton, this.scene);
        this.animator.add('idle', 0, 39, true, 1);
        this.animator.add('walk', 40, 85, true, 1);
        this.animator.add('run', 86, 106, true, 1);
        this.animator.add('backStrafe', 107, 177, true, 1);
        this.animator.add('leftStrafe', 178, 208, true, 1);
        this.animator.add('rightStrafe', 209, 240, true, 1);
        this.animator.add('jump', 241, 276, false, 2, function () {
            that.animator.play('idle');
        });
        this.animator.add('slide', 277, 307, true, 1);
        this.animator.add('swim', 308, 350, true, 1);

        this.animator.play('run');
    };


    Player.prototype.initThunderboltAttack = function (scene) {
        this.isDoingThunderbolt      = false;
        this.thunderbolt = {};
        this.thunderbolt.elapsedTime = 0;
        this.thunderbolt.rechargeTime = 0;

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

        this.thunderbolt.particleSystem = new BABYLON.ParticleSystem("thunderbolt", 2000, scene);
        this.thunderbolt.particleSystem.emitter     = this.thunderbolt.spawnPoint;
        this.thunderbolt.particleSystem.direction1  = new BABYLON.Vector3(-0.2, -1, 0);
        this.thunderbolt.particleSystem.direction2  = new BABYLON.Vector3(0.2, -1, 0);
        this.thunderbolt.particleSystem.minEmitBox  = new BABYLON.Vector3(-0.4, 0, 0);
        this.thunderbolt.particleSystem.maxEmitBox  = new BABYLON.Vector3(0.4, -2.5, 0);
        this.thunderbolt.particleSystem.minSize     = 0.1;
        this.thunderbolt.particleSystem.maxSize     = 0.2;
        this.thunderbolt.particleSystem.emitRate    = 130;
        this.thunderbolt.particleSystem.updateSpeed = 0.5;
        this.thunderbolt.particleSystem.minLifeTime = 0.8;
        this.thunderbolt.particleSystem.maxLifeTime = 1;
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
        hud.updateHealth((this.life / this.maxLife) * 100);
        if (this.life <= 0)
            this.kill();
    };


    Player.prototype.kill = function() {
        this.dead = true;
        hud.gameoverFade();
    };


    Player.prototype.jump = function () {
        this.physics.velocity.y = this.jumpForce;
        if (!this.physics.onRoof) {
            this.animator.play('jump');
        }
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
        this.isDoingThunderbolt       = true;
        this.thunderbolt.elapsedTime = 0;
        this.thunderbolt.rechargeTime += 1;
        this.thunderbolt.mesh.checkCollisions = true;
        this.thunderbolt.particleSystem.start();
    };


    Player.prototype.stopThunderbolt = function () {
        this.isDoingThunderbolt       = false;
        this.thunderbolt.mesh.checkCollisions = false;
        this.thunderbolt.particleSystem.stop();
    };




    /*=======================================
    =            UPDATES METHODS            =
    =======================================*/

    Player.prototype.update = function (deltaTime) {

        if (this.dead == true) { // placé un peu a l'arrache, a changer.
            return;
        }

        this.updateInvulnerability(deltaTime);
        this.physics.update(deltaTime);
        this.updateInputs(deltaTime);
        this.updateRotationOverride(deltaTime);
        this.updateChargeAttack(deltaTime);
        this.updateThunderboltAttack(deltaTime);
        this.checkFallDeath(deltaTime);
        this.updateAnimations();
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

        if (inputs.up && (this.physics.onGround || this.physics.onRoof)) {
            this.jump();
        }

        if (this.isDoingThunderbolt) {
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
        if (inputs.space || inputs.a) {
            this.chargeElapsedTime += deltaTime;
            console.log()
            hud.updateCharge(Math.min((this.chargeElapsedTime / chargeMaxDuration) * 100,100));
            var ratio = Math.min(1, this.chargeElapsedTime / chargeMaxDuration);
            $('#debug .charge_ratio').html(ratio);
        }
        else if (this.chargeElapsedTime > 0) {
            this.launchChargeAttack();
            hud.updateCharge(0);
        }
    };


    Player.prototype.updateThunderboltAttack = function (deltaTime) {
        this.thunderbolt.elapsedTime += deltaTime;
        if (this.isDoingThunderbolt) {
            if (this.thunderbolt.elapsedTime > thunderboltDuration) {
                this.stopThunderbolt();
            }
        }
        if ((inputs.bottom || inputs.z) && (this.physics.onGround || this.physics.onRoof) && this.thunderbolt.rechargeTime <= 2 && (this.thunderbolt.elapsedTime > thunderboltMinDelay)) {
            this.launchThunderbolt();
        }
        this.thunderbolt.rechargeTime -= this.thunderbolt.rechargeTime <= 0 ? 0 : deltaTime*0.5;
        hud.updateThunder(this.thunderbolt.rechargeTime * 50);
    };


    Player.prototype.updateAnimations = function () {
        if (this.animator.currentAnimation === 'jump') {
            return;
        }

        if (Math.abs(this.physics.velocity.x) > speedToBeCharging) {
            this.animator.play('slide');
        }
        else if (this.isDoingThunderbolt) {
            this.animator.play('backStrafe');
        }
        else if (Math.abs(this.physics.velocity.x) > runSpeed) {
            this.animator.play('run');
        }
        else if (Math.abs(this.physics.velocity.x) > walkSpeed) {
            this.animator.play('walk');
        }
        else {
            this.animator.play('idle');
        }
    };


    /*==========================================
    =            RETURN (singleton)            =
    ==========================================*/

    return new Player ();
});