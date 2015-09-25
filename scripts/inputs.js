define([
    'jquery'
], function ($) {
    'use strict';

    /*======================================
    =            RETURNED VALUE            =
    ======================================*/

    var inputsKeys = {
        'left'   : false,
        'up'     : false,
        'right'  : false,
        'bottom' : false
    };




    /*=============================
    =            UTILS            =
    =============================*/

    var keyCodeToInputsKey = {
        37 : 'left',
        38 : 'up',
        39 : 'right',
        40 : 'bottom'
    };



    /*=======================================
    =            KEYBOARD INPUTS            =
    =======================================*/

    $(window).on('keydown', function (e) {
        var keyDown = keyCodeToInputsKey[e.keyCode];
        if (keyDown) {
            inputsKeys[keyDown] = true;
        }
    });


    $(window).on('keyup', function (e) {
        var keyDown = keyCodeToInputsKey[e.keyCode];
        if (keyDown) {
            inputsKeys[keyDown] = false;
        }
    });





    return inputsKeys;
});