define([
], function () {
    'use strict';


    function Animator (target, scene) {
        this.target   = target;
        this.scene    = scene;
        this.animList = {};
    }


    Animator.prototype.add = function (name, from, to, loop, speedRatio)  {
        this.animList[name] = [this.target, from, to, loop, speedRatio];
    };


    Animator.prototype.play = function (name) {
        this.scene.beginAnimation.apply(this.scene, this.animList[name]);
    };


    return Animator;
});