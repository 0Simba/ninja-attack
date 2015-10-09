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

    Ennemies.prototype.init = function () {
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


    function Rabbit () {
    }


    Rabbit.prototype.update = function () {
    };


    /*==================================================
    =            RETURN singleton du manager           =
    ==================================================*/

    return new Ennemies();
});