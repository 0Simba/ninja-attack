define([
    'babylon',
    './ennemies/rabit',
    './ennemies/scyther',
    './ennemies/butterfree',
    './ennemies/venomoth'
], function (BABYLON, Rabit, Scyther, Butterfree, Venomoth) {
    'use strict';


    var tasks;

    var skinToClass = {
        'rabit'      : Rabit,
        'scyther'    : Scyther,
        'butterfree' : Butterfree,
        'venomoth'   : Venomoth
    };

    var editorSkinToGameSkin = {
        'rabit'      : 'rabit',
        'scyther'    : 'rabit',
        'butterfree' : 'butterfree',
        'venomoth'   : 'butterfree'
    };


    /*===============================
    =            MANAGER            =
    ===============================*/

    function Ennemies () {
        this.list = [];
    }

    Ennemies.prototype.init = function (scene, datas, _tasks) {
        tasks = _tasks;
        this.scene = scene;

        for (var i = 0; i < datas.length; i++) {
            var data   = datas[i];
            this.create(data);
        };
    };


    Ennemies.prototype.update = function (deltaTime) {
        for (var i = this.list.length - 1; i >= 0; i--) {
            this.list[i].update(deltaTime);
        };
    };


    Ennemies.prototype.create = function (params) {
        var targetClass = skinToClass[params.skin];

        if (!targetClass) {
            return;
        }

        var skinName = editorSkinToGameSkin[params.skin];
        var rabit = new targetClass(params, this.scene, tasks[skinName]);
        this.list.push(rabit);
        addEnnemyProperties(rabit)
    };


    Ennemies.prototype.destroy = function (ennemy) {
        ennemy.mesh.dispose();
        var ennemyIndex = this.list.indexOf(ennemy);

        if (ennemy !== -1) {
            ennemy.mesh.dispose();
            this.list.splice(ennemyIndex, 1);
        }
    }

    var ennemies = new Ennemies;




    /*================================
    =            Entities            =
    ================================*/

    function addEnnemyProperties (ennemy) {
        ennemy.tag = 'ennemy';
        ennemy.physics.onEntityCollide = function (entity) {
            if (entity.tag === 'player attack') {
                ennemies.destroy(ennemy);
            }
        };
    }





    /*==================================================
    =            RETURN singleton du manager           =
    ==================================================*/

    return ennemies;
});