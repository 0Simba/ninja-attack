define([
    'babylon'
], function (BABYLON) {
    'use strict';

    /*==============================
    =            CONFIG            =
    ==============================*/

    var position  = new BABYLON.Vector3(0, 10, -5);
    var direction = new BABYLON.Vector3(0, -1, 0.25)
    var color     = new BABYLON.Color3(1, 1, 1);




    /*=======================================
    =            INIT MAIN LIGHT            =
    =======================================*/

    function MainLight () {
    }


    MainLight.prototype.init = function (scene) {
        var light = new BABYLON.DirectionalLight("main light", direction, scene);

        light.position = position;
        light.diffuse  = color;
    };


    return new MainLight();
});