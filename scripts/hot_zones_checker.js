define([
], function () {
    'use strict';

    function HotZonesChecker () {
    }


    HotZonesChecker.prototype.init = function (hotZones) {
        this.hotZones = hotZones;

        for (var i = 0; i < hotZones.length; i++) {
            var hotZone = hotZones[i];
            hotZone.radiusDiff = hotZone.outRadius - hotZone.inRadius;
        };
    };


    HotZonesChecker.prototype.checkWith = function (position, zoom) {
        for (var i = 0; i < this.hotZones.length; i++) {
            var hotZone = this.hotZones[i];

            var distance = this.distanceBeetwen(hotZone, position)

            if (distance < hotZone.inRadius) {
                return {
                    x : hotZone.x,
                    y : hotZone.y,
                    zoom : hotZone.zoomRatio * zoom
                };
            }
            else if (distance < hotZone.outRadius) {
                var ratio = this.getRatioBeetwenCircles(hotZone, distance);
                var diffX = hotZone.x - position.x;
                var diffY = hotZone.y - position.y;

                return {
                    x : position.x + (diffX * ratio),
                    y : position.y + (diffY * ratio),
                    zoom : zoom - (zoom - (hotZone.zoomRatio * zoom)) * ratio
                }
            }
        };

        return null;
    };


    HotZonesChecker.prototype.distanceBeetwen = function (hotZone, position) {
        var xDiff = hotZone.x - position.x;
        var yDiff = hotZone.y - position.y;
        return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    };


    HotZonesChecker.prototype.getRatioBeetwenCircles = function (hotZone, distance) {
        return 1 - (distance - hotZone.inRadius) / hotZone.radiusDiff;
    };

    return new HotZonesChecker();
});