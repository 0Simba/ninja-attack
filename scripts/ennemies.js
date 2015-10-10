define([
    'babylon',
    './entityPhysics'
], function (BABYLON, EntityPhysics) {
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
        var rabbitMaterial = new BABYLON.StandardMaterial("rabbitMaterial", scene);
        rabbitMaterial.emissiveColor = new BABYLON.Color3(1, 0, 0);

        this.mesh = BABYLON.Mesh.CreateBox("rabbit", {height: 1, width : 1, length : 0.1}, scene);
        this.mesh.position = new BABYLON.Vector3(data.x, data.y, 0);
        this.mesh.ellipsoid = new BABYLON.Vector3(0.25, 0.25, 0.25);

        this.mesh.material = rabbitMaterial;

        this.physics = new EntityPhysics(this);

        this.iaValue = data.iaValue;

        addLeftRightIA(this);
    }


    Rabbit.prototype.update = function (deltaTime) {
        this.ia(deltaTime);
        this.physics.update(deltaTime);
    };




    /*==========================
    =            IA            =
    ==========================*/


    var leftRightIASpeed = 3;

    function addLeftRightIA (object) {
        object.moveElapsedTime = 0;
        object.direction = -1;

        object.ia = function (deltaTime) {
            object.moveElapsedTime += deltaTime;
            if (object.moveElapsedTime > object.iaValue) {
                this.direction *= -1;
                object.moveElapsedTime = 0;
            }

            object.mesh.moveWithCollisions(new BABYLON.Vector3(leftRightIASpeed * object.direction * deltaTime, 0, 0));
        }
    }



    /*==================================================
    =            RETURN singleton du manager           =
    ==================================================*/

    return new Ennemies();
});