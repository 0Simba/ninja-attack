define([
    'babylon'
], function (BABYLON) {
    'use strict';


    /*===============================
    =            MANAGER            =
    ===============================*/



    function Ennemies () {
        this.list = [];
    }

    Ennemies.prototype.init = function (scene, datas) {
        for (var i = 0; i < datas.length; i++) {
            var data   = datas[i];
            var ennemi = new Rabbit (data, scene);

            this.list.push(ennemi);
        };
    };


    Ennemies.prototype.update = function () {
        for (var i = 0; i < this.list.length; i++) {
            this.list[i].update();
        };
    };


    Ennemies.prototype.create = function (params) {
        var rabbit = new Rabbit(params);
        this.list.push(rabbit);
    };




    /*================================
    =            Entities            =
    ================================*/


    function Rabbit (data, scene) {
        this.mesh = BABYLON.Mesh.CreateSphere("rabbit", 20, 1, scene);
        this.mesh.position = new BABYLON.Vector3(data.x, data.y, 0);
    }


    Rabbit.prototype.update = function () {
    };




    /*==========================
    =            IA            =
    ==========================*/


    function leftRightIA () {

    }



    /*==================================================
    =            RETURN singleton du manager           =
    ==================================================*/

    return new Ennemies();
});