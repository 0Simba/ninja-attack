define([
    'babylon'
], function (BABYLON) {
    'use strict';

    var gravity = -9.81 * 3;

    function EntityPhysics (parent, onEntityCollide, entityGravity) {
        parent.mesh.parentLogic = parent;
        this.parent   = parent;
        this.velocity = {
            x : 0,
            y : 0
        };

        this.frictionY = 0;
        this.frictionX = 3.5;

        this.gravity = (typeof entityGravity === 'number') ? entityGravity : gravity;

        this.parent.mesh.checkCollisions = true;
        this.onEntityCollide = onEntityCollide || function () {};
        this.lastFrameOnGround = false;

        var entityPhysics = this;


        this.parent.mesh.onCollide = function (targetMesh) {
            if (targetMesh.name != 'wall') {
                entityPhysics.onEntityCollide(targetMesh.parentLogic);
                targetMesh.parentLogic.physics.onEntityCollide(targetMesh.parentLogic);
                return;
            }
            if (entityPhysics.currentProcessDirection == 'x') {
                entityPhysics.velocity.x = 0;
            }
            else if (entityPhysics.currentProcessDirection == 'y') {
                if (entityPhysics.velocity.y < 0) {
                    entityPhysics.onGround = true;
                    entityPhysics.lastGroundPosition = {
                        x : entityPhysics.parent.mesh.position.x,
                        y : entityPhysics.parent.mesh.position.y
                    }
                }
                else {
                    entityPhysics.onRoof = true;
                }
                entityPhysics.velocity.y = 0;
            }
        }
    }


    EntityPhysics.prototype.update = function (deltaTime) {
        this.lastFrameOnGround = this.onGround;

        this.currentProcessDirection = 'y';
        this.updatePositionAndVelocityY(deltaTime);

        this.currentProcessDirection = 'x';
        this.updatePositionAndVelocityX(deltaTime);

        this.currentProcessDirection = null;

    };


    EntityPhysics.prototype.updatePositionAndVelocityX = function (deltaTime) {
        var newVelocity = this.velocity.x * Math.exp(-this.frictionX * deltaTime);
        var moveValue   = 0.5 * (this.velocity.x + newVelocity) * deltaTime;
        this.velocity.x = newVelocity;
        this.parent.mesh.moveWithCollisions(new BABYLON.Vector3(moveValue, 0, 0));
    };


    EntityPhysics.prototype.updatePositionAndVelocityY = function (deltaTime) {
        if (!this.onGround) {
            this.velocity.y += this.gravity * deltaTime;
        }

        this.onGround = false;
        this.onRoof   = false;

        var newVelocity = this.velocity.y * Math.exp(-this.frictionY * deltaTime);
        var moveValue   = 0.5 * (this.velocity.y + newVelocity) * deltaTime;

        this.velocity.y = newVelocity;
        this.parent.mesh.moveWithCollisions(new BABYLON.Vector3(0, moveValue, 0));
    };


    EntityPhysics.gravity = gravity;

    return EntityPhysics;
});