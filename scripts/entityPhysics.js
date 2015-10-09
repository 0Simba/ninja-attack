define([
], function () {
    'use strict';

    function EntityPhysics (parent) {
        this.parent   = parent;
        this.velocity = {
            x : 0,
            y : 0
        };

        this.friction = 5;
    }

    EntityPhysics.prototype.update = function (deltaTime) {
        this.updatePositionAndVelocityX(deltaTime);
    };


    EntityPhysics.prototype.updatePositionAndVelocityX = function (deltaTime) {
        var newVelocity             = this.velocity.x * Math.exp(-this.friction * deltaTime);
        this.parent.mesh.position.x += 0.5 * (this.velocity.x + newVelocity) * deltaTime;
        this.velocity.x             = newVelocity;

        // console.log(this.velocity.x);
            
    };



    return EntityPhysics;
});