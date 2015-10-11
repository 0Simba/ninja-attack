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
            var ennemy = new Rabbit (data, scene);
            addEnnemyProperties(ennemy)

            this.list.push(ennemy);
        };
    };


    Ennemies.prototype.update = function (deltaTime) {
        for (var i = this.list.length - 1; i >= 0; i--) {
            this.list[i].update(deltaTime);
        };
    };


    Ennemies.prototype.create = function (params) {
        var rabbit = new Rabbit(params);
        this.list.push(rabbit);
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




    function addEnnemyProperties (ennemy) {
        ennemy.tag = 'ennemy';
        ennemy.physics.onEntityCollide = function (entity) {
            if (entity.tag === 'player attack') {
                ennemies.destroy(ennemy);
            }
        }
    }

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

    return ennemies;
});