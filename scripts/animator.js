define([
], function () {
    'use strict';


    function Animator (target, scene) {
        this.target   = target;
        this.scene    = scene;
        this.animList = {};
        this.currentAnimation;
    }


    Animator.prototype.add = function (name, from, to, loop, speedRatio, callback)  {
        callback = callback || function () {};
        this.animList[name] = [this.target, from, to, loop, speedRatio, callback];
    };


    Animator.prototype.play = function (name) {
        if (this.currentAnimation === name) {
            return;
        }
        this.currentAnimation = name;
        this.scene.beginAnimation.apply(this.scene, this.animList[name]);
    };


    return Animator;
});