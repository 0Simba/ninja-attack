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
    './scripts/skybox',
    './scripts/main_light',
    './scripts/wallsBuilder',
    './scripts/hot_zones_checker',
    './scripts/ennemies',
    './scripts/hud',
    './scripts/endPoint',
    './scripts/minY',
    './scripts/inputs'
], function (BABYLON, $, camera, player, addSkybox, mainLight, wallsBuilder, hotZonesChecker, ennemies, hud, initEndPoint, minY) {
    'use strict';

    /*==============================
    =            CONFIG            =
    ==============================*/

    var maxDeltaTime = 0.1;



    var canvas,
        engine,
        scene,
        gameData,
        loader,
        tasks  = {},
        toLoad = {},
        canvasRatio;

    $(function () {
        canvas = document.getElementById("canvas");
        engine = new BABYLON.Engine(canvas);
        scene  = new BABYLON.Scene(engine);

        scene.collisionsEnabled = true;

        canvasRatio = canvas.width / canvas.height;
        resizeCanvas();
        $(window).resize(resizeCanvas);

        hud.init(canvas);
        hud.playButtonCallback = startLevel;
        loader = new BABYLON.AssetsManager(scene);

        $.getJSON("assets/levels/level0.json", function(data) {
            gameData = data;

            toLoad.ninja = loader.addMeshTask("ninja", "", "./assets/", "ninja.babylon");
            toLoad.rabit = loader.addMeshTask("rabit", "", "./assets/", "rabit.babylone");

            for (var key in toLoad) {
                toLoad[key].onSuccess = taskOnSuccessCallback(key);
            }

            loader.onFinish = function () {
                hud.createBGDoors();
                hud.buildMainMenu();
            };

            loader.load();
        });
    });


    function taskOnSuccessCallback (key) {
        return function (task) {
            tasks[key] = task;
            for (var i = 0; i < task.loadedMeshes.length ; i++) {
                task.loadedMeshes[i].isVisible = false;
            }

            var skeletons = task.loadedSkeletons;
            skeletons.forEach(function(s) {
                scene.beginAnimation(s, 0, 100, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE, 10);
            });
        }
    }

    /** public function to be used in hud.js 
        
        @param string level => key of the level to launch (unused for now)
    
    */
    function startLevel (level) {
        hud.openDoors();
        hud.buildInGameHud();
        launch(tasks);
    }


    function launch (tasks) {
        addSkybox(scene);
        wallsBuilder(scene, gameData.walls);
        minY.set(gameData.walls);

        initEndPoint(scene, gameData.end);
        player.init(scene, gameData.start, tasks.ninja.loadedMeshes);
        ennemies.init(scene, gameData.monsters, tasks);
        camera.init(scene, player);
        mainLight.init(scene)
        hotZonesChecker.init(gameData.hotZones);

        engine.runRenderLoop(function() {
            var deltaTime = Math.min(engine.getDeltaTime() / 1000, maxDeltaTime);

            ennemies.update(deltaTime);
            player.update(deltaTime);
            camera.update(deltaTime);
            scene.render();
        });
    }



    function resizeCanvas () {
        var width  = $(window).width();
        var height = $(window).height();
        var windowRatio = width / height;

        if (canvasRatio < windowRatio) {
            canvas.height = height;
            canvas.width  = height * canvasRatio;
        }
        else {
            canvas.width  = width;
            canvas.height = width / canvasRatio;
        }

        $('#canvas').css({
            marginLeft : '-' + canvas.width / 2 + 'px'
        });

        $('.hudOverlay').css({
            width       : canvas.width,
            height      : canvas.height,
            marginLeft  : '-' + canvas.width / 2 + 'px'
        });
    }
});