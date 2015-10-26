define([
    '../entity_physics',
    '../entity_capabilities',
], function (EntityPhysics, addEntityCapabilities) {
    'use strict';

    return function (ennemy) {
        ennemy.physics = new EntityPhysics(ennemy);
        addEntityCapabilities(ennemy);

        ennemy.update = function (deltaTime) {
            this.updateRotation(deltaTime);
            this.ia(deltaTime);
            this.physics.update(deltaTime);
        };

    };

});