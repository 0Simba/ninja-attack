define([
], function () {
    'use strict';

    var value = 0;

    var minY = {};
    minY.set = function (wallParams) {
        for (var i = 0; i < wallParams.length; i++) {
            var wall = wallParams[i];

            var bottom = wall.y - wall.height / 2;
            value = Math.min(bottom, value);
        };
    }

    minY.get = function () {
        return value;
    }


    return minY;
});