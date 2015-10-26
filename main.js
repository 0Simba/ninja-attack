require.config({
    urlArgs: window.location.hostname === 'localhost' ? 'bust=' + Date.now() : '',
    paths: {
        jquery : './libs/jquery',
        babylon: './libs/babylon',
        howler : './libs/howler'
    },
    shim: {
        jquery: {
            exports: '$'
        },
        babylon: {
            exports : 'BABYLON'
        },
        howler: {
            exports : 'Howler'
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
    './scripts/walls_builder',
    './scripts/collectibles_builder',
    './scripts/lifes_builder',
    './scripts/hot_zones_checker',
    './scripts/ennemies',
    './scripts/hud',
    './scripts/end_point',
    './scripts/min_y',
    './scripts/sounds',

    './scripts/inputs'
], function (BABYLON, $, camera, player, addSkybox, mainLight, wallsBuilder, collectiblesBuilder, lifesBuilder, hotZonesChecker, ennemies, hud, initEndPoint, minY, sounds) {
    'use strict';

    /*==============================
    =            CONFIG            =
    ==============================*/

    var maxDeltaTime = 0.033;



    var canvas,
        engine,
        scene,
        gameDatas,
        gameData,
        loader,
        tasks  = {},
        toLoad = {},
        canvasRatio;

    $(function () {
        canvas = document.getElementById("canvas");
        canvasRatio = canvas.width / canvas.height;
        resizeCanvas();
        $(window).resize(resizeCanvas);

        hud.init(canvas);
        hud.playButtonCallback = startLevel;

        build();
    });


    function build () {
        engine = new BABYLON.Engine(canvas);
        scene  = new BABYLON.Scene(engine);

        scene.collisionsEnabled = true;
        $.getJSON("assets/levels/level0.json", function(data) {
            gameDatas = data;
            hud.createBGDoors();

            load(function () {
                hud.retrieveGameData(gameDatas);
                hud.buildMainMenu();
            });
        });
    }

    function load (callback) {
        loader = new BABYLON.AssetsManager(scene);
        setMeshLoader();
        toLoad.wallTexture = loader.addTextureTask("wallTexture", "./assets/wall.jpg");
        toLoad.wallTexture.onSuccess = function (task) {
            tasks.wallTexture = task.texture;
        };
        loader.onFinish = callback;
        loader.load();
    }


    function setMeshLoader () {
        toLoad.ninja      = loader.addMeshTask("ninja", "", "./assets/", "ninja.babylon");
        toLoad.rabit      = loader.addMeshTask("rabit", "", "./assets/", "rabit.babylon");
        toLoad.butterfree = loader.addMeshTask("butterfree", "", "./assets/", "blue.babylon");

        for (var key in toLoad) {
            toLoad[key].onSuccess = taskOnSuccessCallback(key);
        }
    }


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
        var activeLevel = level || 0;
        launch(activeLevel);
    }


    function launch (levelIndex) {
        hud.buildInGameHud();
        load(function () {
            setTimeout(hud.openDoors, 1000);
            gameData = gameDatas.list[levelIndex];

            addSkybox(scene);
            wallsBuilder(scene, gameData.walls, tasks.wallTexture);
            minY.set(gameData.walls);

            player.init(scene, gameData.start, tasks.ninja);
            var endPoint = initEndPoint(scene, gameData.end);
            ennemies.init(scene, gameData.monsters, tasks);
            camera.init(scene, player);
            mainLight.init(scene)
            hotZonesChecker.init(gameData.hotZones);
            collectiblesBuilder.build(scene, gameData.collectibles);
            lifesBuilder.build(scene, gameData.lifes);

            sounds.startGame();

            engine.runRenderLoop(function() {
                if (player.dead) {
                    engine.stopRenderLoop();
                    destroy();
                    return;
                }
                var deltaTime = Math.min(engine.getDeltaTime() / 1000, maxDeltaTime);

                collectiblesBuilder.update(deltaTime);
                lifesBuilder.update(deltaTime);
                ennemies.update(deltaTime);
                player.update(deltaTime);
                camera.update(deltaTime);
                endPoint.update(deltaTime);
                scene.render();
            });
        });
    }


    function destroy () {
        sounds.endGame();
        scene.dispose();
        build();
        hud.gameoverFade();
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