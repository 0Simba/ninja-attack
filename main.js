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
    './scripts/wallsBuilder',
    './scripts/ennemies',
    './scripts/endPoint',


    './scripts/inputs'
], function (BABYLON, $, camera, player, mainLight, wallsBuilder, ennemies, initEndPoint) {
    'use strict';

    var canvas;
    var engine;
    var scene;
    var gameData;

    $(function () {
        canvas = document.getElementById("canvas");
        engine = new BABYLON.Engine(canvas);
        scene  = new BABYLON.Scene(engine);

        $.getJSON("assets/levels/level0.json", function(data) {
            gameData = data;
            launch();
        });
    });


    function launch () {
        wallsBuilder(scene, gameData.walls);

        initEndPoint(scene, gameData.end);
        player.init(scene, gameData.start);
        ennemies.init(scene, gameData.monsters);
        camera.init(scene, player.mesh);
        mainLight.init(scene)

        engine.runRenderLoop(function() {
            var deltaTime = engine.getDeltaTime() / 1000;

            ennemies.update(deltaTime);
            player.update(deltaTime);
            camera.update(deltaTime);
            scene.render();
        });
    }
});