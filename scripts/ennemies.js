define([
    'babylon',
    './entityPhysics',
    './entity_capabilities',
    './animator'
], function (BABYLON, EntityPhysics, addEntityCapabilities, Animator) {
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

        for (var i = 0; i < datas.length; i++) {
            var data   = datas[i];
            var ennemy = new Rabit (data, scene);
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
        var rabit = new Rabit(params);
        this.list.push(rabit);
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



    function Rabit (data, scene) {
        var rabbitMaterial = new BABYLON.StandardMaterial("rabbitMaterial", scene);
        rabbitMaterial.emissiveColor = new BABYLON.Color3(1, 0, 0);

        this.mesh = BABYLON.Mesh.CreateBox("rabit", {height: 0.8, width : 0.5, length : 0.1}, scene);
        this.mesh.position = new BABYLON.Vector3(data.x, data.y, 0);
        this.mesh.ellipsoid = new BABYLON.Vector3(0.25, 0.25, 0.25);
        this.mesh.isVisible = false;

        this.mesh.material = rabbitMaterial;

        this.physics = new EntityPhysics(this);
        this.setChildsMeshes();

        this.iaValue  = data.iaValue;
        this.scene    = scene;

        addLeftRightIA(this);
        addEntityCapabilities(this);

        this.initAnimator();
    }


    Rabit.prototype.initAnimator = function () {
        this.animator = new Animator(this.skeleton, this.scene);
        this.animator.add('walk', 40, 60, true, 0.8);
        this.animator.play('walk');
    }




    Rabit.prototype.update = function (deltaTime) {
        this.updateRotation(deltaTime);
        this.ia(deltaTime);
        this.physics.update(deltaTime);
    };


    Rabit.prototype.setChildsMeshes = function () {
        var meshes    = tasks.rabit.loadedMeshes;
        this.skeleton = tasks.rabit.loadedSkeletons[0].clone();

        this.childsMeshes = [];

        for (var i = 1; i < meshes.length; i++) {
            var mesh = meshes[i].clone();
            mesh.parent = this.mesh;

            mesh.scaling.x = 0.02;
            mesh.scaling.y = 0.02;
            mesh.scaling.z = 0.02;
            mesh.isVisible = true;
            mesh.skeleton  = this.skeleton;

            mesh.rotation.y = 0;
            mesh.position.y -= 0.5;

            this.childsMeshes.push(mesh);
        };
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