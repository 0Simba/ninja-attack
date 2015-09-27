require.config({
    urlArgs: window.location.hostname === 'localhost' ? 'bust=' + Date.now() : '',
    paths: {
        jquery: './libs/jquery',
        babylon: './libs/babylon'
    },
    shim: {
        jquery: {
            exports: '$'
        },
        babylon: {
            exports : 'BABYLON'
        }
    }
});



require([
    'babylon',
    'jquery',

    './scripts/camera',
    './scripts/player',
    './scripts/main_light',

    './scripts/inputs'
], function (BABYLON, $, camera, player, mainLight) {
    'use strict';


    $(function () {
        var canvas = document.getElementById("canvas");
        var engine = new BABYLON.Engine(canvas);
        var scene  = new BABYLON.Scene(engine);

        player.init(scene);
        camera.init(scene, player.mesh); // nota -> camera et player son des instances récupérés ligne 25
        mainLight.init(scene)

        engine.runRenderLoop(function() {
            var deltaTime = engine.getDeltaTime() / 1000;

            player.update(deltaTime);
            camera.update(deltaTime);
            scene.render();
        });

    });
});