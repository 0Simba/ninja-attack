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

    './scripts/inputs'
], function (BABYLON, $, camera, player, mainLight, wallsBuilder) {
    'use strict';

    var canvas;
    var engine;
    var scene;
    var gameData;
    var loader;

    $(function () {
        canvas = document.getElementById("canvas");
        engine = new BABYLON.Engine(canvas);
        scene  = new BABYLON.Scene(engine);
        loader = new BABYLON.AssetsManager(scene);


        $.getJSON("assets/levels/level0.json", function(data) {
            gameData = data;

            var meshTask = loader.addMeshTask("ninja", "", "./assets/", "ninja.babylon");

            loader.onFinish = function (tasks) {
                launch(tasks);
            };

            loader.load();
        });
    });


    function launch (tasks) {
        wallsBuilder(scene, gameData.walls);

        player.init(scene, gameData.start, tasks[0].loadedMeshes);
        camera.init(scene, player.mesh);
        mainLight.init(scene)

        engine.runRenderLoop(function() {
            var deltaTime = engine.getDeltaTime() / 1000;

            player.update(deltaTime);
            camera.update(deltaTime);
            scene.render();
            scene.debugLayer.show();
        });
    }
});