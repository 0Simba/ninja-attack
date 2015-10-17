define([
    'babylon',
    './ennemies/rabit',
    './ennemies/scyther'
], function (BABYLON, Rabit, Scyther) {
    'use strict';


    var tasks;

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
        var rabit = new Rabit(params, this.scene, tasks.rabit);
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