define([
    'babylon',
    './addCharacterCollider'
], function (BABYLON, addCharacterCollider) {
    'use strict';

    var gravity = -9.81 * 5;

    function EntityPhysics (parent) {
        this.parent   = parent;
        this.velocity = {
            x : 0,
            y : 0
        };

        this.friction = 5;

        // addCharacterCollider(scene, this.parent);


        var that = this;
        this.parent.mesh.onCollide = function (targetMesh) {
            if (that.currentProcessDirection === 'x') {
                that.velocity.x = 0;
            }
            else if (that.currentProcessDirection === 'y') {
                that.parent.mesh.y -= 0.5;
                that.velocity.y = 10;
                that.onGround   = true;
            }
        }
    }

    //mesh.onCollide

    EntityPhysics.prototype.update = function (deltaTime) {
        this.onGround = false;
        this.currentProcessDirection = 'y';
        this.updatePositionAndVelocityY(deltaTime);

        this.parent.mesh.computeWorldMatrix();

        this.currentProcessDirection = 'x';
        this.updatePositionAndVelocityX(deltaTime);

        this.currentProcessDirection = null;
    };


    EntityPhysics.prototype.updatePositionAndVelocityX = function (deltaTime) {
        var newVelocity = this.velocity.x * Math.exp(-this.friction * deltaTime);

        this.parent.mesh.moveWithCollisions(new BABYLON.Vector3(0.5 * (this.velocity.x + newVelocity) * deltaTime, 0, 0));
        this.velocity.x = newVelocity;
    };


    EntityPhysics.prototype.updatePositionAndVelocityY = function (deltaTime) {
        this.velocity.y += gravity * deltaTime;
        var newVelocity = this.velocity.y * Math.exp(-this.friction * deltaTime);
        var moveValue   = 0.5 * (this.velocity.y + newVelocity) * deltaTime;

        this.parent.mesh.moveWithCollisions(new BABYLON.Vector3(0, moveValue, 0));
        this.velocity.y = newVelocity;
    };



    return EntityPhysics;
});