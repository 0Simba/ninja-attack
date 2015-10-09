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


    Ennemies.prototype.update = function (deltaTime) {
        for (var i = 0; i < this.list.length; i++) {
            this.list[i].update(deltaTime);
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

        this.iaValue = data.iaValue;

        this.ia = leftRightIA;
    }


    Rabbit.prototype.update = function (deltaTime) {
        this.ia(deltaTime);
    };




    /*==========================
    =            IA            =
    ==========================*/


    function leftRightIA (deltaTime) {
    }



    /*==================================================
    =            RETURN singleton du manager           =
    ==================================================*/

    return new Ennemies();
});