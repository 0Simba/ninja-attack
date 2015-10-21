define([
], function () {
    'use strict';

    var turnSpeedRatio = 20;

    return function addEntityCapabilities (entity) {
        entity.direction = 1;
        entity.updateRotation = function (deltaTime) {
            if (this.physics.velocity.x !== 0) {
                this.direction = (this.physics.velocity.x > 0) ? -1 : 1;
            }

            this.mesh.rotation.z = 0;
            var targetYRotation = Math.PI / 2 * this.direction;
            if (this.physics.onRoof) {
                targetYRotation *= -1;
            }
            this.mesh.rotation.y = this.mesh.rotation.y + (targetYRotation - this.mesh.rotation.y) * turnSpeedRatio * deltaTime;

            var targetXRotation = (this.physics.onRoof) ? Math.PI : 0;
            this.mesh.rotation.x = this.mesh.rotation.x + (targetXRotation - this.mesh.rotation.x) * turnSpeedRatio * deltaTime;
        };
    };

});