define([
    'howler'
], function (Howler) {
    'use strict';

    var Howl   = Howler.Howl;
    var toLoad = ['collectible', 'hit', 'jump', 'life', 'loop', 'thunderbolt', 'charge', 'eject', 'kill', 'step'];
    var soundsList = {};

    function Sounds () {
        this.list = {};


        for (var i = toLoad.length - 1; i >= 0; i--) {
            var soundName = toLoad[i];
            soundsList[soundName] = new Howl({
                urls : ['./assets/sounds/' + soundName + '.wav']
            });
        };


        soundsList.loop.loop(true);
    };


    Sounds.prototype.endGame = function () {
        for (var name in soundsList) {
            soundsList[name].stop();
        }
    };


    Sounds.prototype.startGame = function () {
        soundsList.loop.play();
    };


    Sounds.prototype.play = function (name) {
        if (soundsList[name]) {
            soundsList[name].play();
        }
    };

    return new Sounds();
});