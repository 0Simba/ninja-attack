define([
    'jquery'
], function ($) {
    'use strict';
    var that;

    function Hud () {
        this.$hud       = $(".hudOverlay");
        this.size       = {};
        that            = this;
    }

    Hud.prototype.init = function(canvas) {
        this.size.w = canvas.width;
        this.size.h = canvas.height;
    };

    Hud.prototype.createBGDoors = function() {
        this.$hud.find(".doors").remove();
        var target = this.$hud.append("<div class='doors' style='position:absolute;'></div>").find(".doors");

        var $baseDiv = $("<div></div>").css({border: (this.size.w * 0.5)+"px solid", borderColor: "rgba(0,0,0,0)", position: "absolute"});
        $baseDiv.clone().css({top: (-this.size.w * 0.25)+"px", left: (-this.size.w * 0.5625)+"px", borderBottomColor: "#000"}).appendTo(target);
        $baseDiv.clone().css({top: (-this.size.w * 0.25)+"px",  left: (this.size.w * 0.5625)+"px",  borderBottomColor: "#000"}).appendTo(target);
        $baseDiv.clone().css({left: (-this.size.w * 0.3125)+"px", borderTopColor: "#d8e1e7",  borderWidth: (this.size.w * 0.8125)+"px"}).appendTo(target);
    };

    Hud.prototype.openDoors = function() {
        $(this.$hud.find(".doors").children().get(0)).finish().animate({left: (-this.size.w)+"px"},1500);
        $(this.$hud.find(".doors").children().get(1)).finish().animate({left: (this.size.w)+"px"},1500);
        $(this.$hud.find(".doors").children().get(2)).finish().animate({top: (this.size.h)+"px"},1500);
    };

    Hud.prototype.closeDoors = function() {
        $(this.$hud.find(".doors").children().get(0)).finish().animate({left: (-this.size.w * 0.5625)},400);
        $(this.$hud.find(".doors").children().get(1)).finish().animate({left: (this.size.w * 0.5625)},400);
        $(this.$hud.find(".doors").children().get(2)).finish().animate({top: 0},400);
    };


    /** 
        Main Menu build function 
        creates and attaches events to the main menu's buttons.
    */
    Hud.prototype.buildMainMenu = function() {
        this.$hud.append("<div class='menuButtons' style='position:absolute;'></div>");

        var launchButton = this.createButton(250,80,25);
        launchButton
        .on("mouseup",function () {
            // start(); /* START THE GAME (need to reach main.js) */
            that.fadeMainMenu();
        })
        .on("mousedown",function () {
            that.closeDoors(); 
        });

        var levelSelectButton = this.createButton(250,80,25);
        levelSelectButton
        .on("mouseup",function () {
            that.buildLevelSelectMenu();
        })
        .on("mousedown",function () {
            that.closeDoors(); 
        });
        this.$hud.find(".menuButtons").append(launchButton);
        this.$hud.find(".menuButtons").append(levelSelectButton);
        
        launchButton.find(".content").text("Play");
        levelSelectButton.find(".content").text("Select Level");
        launchButton.css({left:"-1000px", top:300});
        levelSelectButton.css({left:"-1000px", top:400});

        $('.menuButtons').children().each(function (index) {
            $(this).animate({left:that.size.w * 0.5 - $(this).width() * 0.5},600);
        });
    };

    /** 
        Make the buttons slide left and right && removes' em.
    */
    Hud.prototype.fadeMainMenu = function() {
        $('.menuButtons').children().off();
        $('.menuButtons').children().each(function (index) {
            $(this).animate({left: ((index % 2) * 3 - 1) * (that.size.w + $(this).width())},600,function () {
                $(this).remove();
            });
        });
    };

    Hud.prototype.createButton = function(width,height,angle) {
        var $newButton = $("<div></div>").css({
            position: "absolute",
            width: width+"px",
            height: height+"px",
            WebkitTransform: "skew("+angle+"deg)",
            MozTransform: "skew("+angle+"deg)",
            boxShadow: "2px 3px 10px #000",
            background: "-webkit-gradient(linear, left top, left bottom, color-stop(0%,#b7deed), color-stop(50%,#71ceef), color-stop(51%,#21b4e2), color-stop(100%,#b7deed))"
        });
        var content = $("<p class='content'></p>").css({
            width: "100%",
            textAlign: "center",
            pointerEvents: "none",
            WebkitTransform: "skew("+(-angle)+"deg)",
            MozTransform: "skew("+(-angle)+"deg)",
        })
        .appendTo($newButton);

        return $newButton;
    };

    Hud.prototype.cleanHud = function() {
        this.$hud.children().remove();
    };

    Hud.prototype.buildLevelSelectMenu = function() {
        console.log("building level select menu");
    };
    

    /*==========================================
    =            RETURN (singleton)            =
    ==========================================*/
    return new Hud();
});