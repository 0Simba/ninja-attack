define([
    'jquery',
    './player'
], function ($, player) {
    'use strict';
    var that;

    function Hud () {
        this.$hud       = $(".hudOverlay");
        this.size       = {};
        that            = this;
    }

    Hud.prototype.init = function(canvas, startCallback) {
        this.size.w = canvas.width;
        this.size.h = canvas.height;
    };

    Hud.prototype.createBGDoors = function() {
        // this.$hud.find(".doors").remove();
        // var target = this.$hud.append("<div class='doors' style='width: 100%; height: 100%; position:absolute;'></div>").find(".doors");

        // var $baseDiv = $("<img src=''>").css({position: "absolute", display: "block", height: "100%"});
        // $baseDiv.clone().attr("src","assets/menu/leftDoor.png").addClass("door-left").css({width: "50%"}).appendTo(target);
        // $baseDiv.clone().attr("src","assets/menu/rightDoor.png").addClass("door-right").css({width: "50%",marginLeft: "50%"}).appendTo(target);
        // $baseDiv.clone().attr("src","assets/menu/topDoor.png").addClass("door-top").css({width: "100%"}).appendTo(target);
    };

    Hud.prototype.openDoors = function() {
        $('#main_menu').fadeOut(500);
        $(".door-left").finish().animate({left: (-that.size.w)+"px"},1500);
        $(".door-right").finish().animate({left: (that.size.w)+"px"},1500);
        $(".door-top").finish().animate({top: -(that.size.h * 2)+"px"},1500);
    };

    Hud.prototype.closeDoors = function() {
        $('#main_menu').fadeIn(500);
        $(".door-left").finish().animate({left: 0},400);
        $(".door-right").finish().animate({left: 0},400);
        $(".door-top").finish().animate({top: 0},400,function () {
            $(".gameoverFade").remove();
        });
    };


    /**
        Main Menu build function
        creates and attaches events to the main menu's buttons.
    */
    Hud.prototype.buildMainMenu = function (nbLevel, levelCallback) {
        var $container = $('.levelContainer');
        $container.html('');
        for (var i = 0; i < nbLevel; i++) {
            $container.append('<div class="level" data-id="' + i + '">' + (i + 1) + '</div>');
        };
        $('.level').on('click', function () {
            var id = $(this).attr('data-id');
            levelCallback(id);
        });
       //  $(".menuButtons").remove();
       //  this.$hud.append("<div class='menuButtons' style='position:absolute; width: 100%; height:100%;'></div>");

       //  var launchButton = this.createButton(250,80,25);
       //  launchButton
       //  .on("mouseup",function () {
       //      that.playButtonCallback();
       //      that.fadeMainMenu();
       //  })
       //  .on("mousedown",function () {
       //  });

       //  var levelSelectButton = this.createButton(250,80,25);
       //  levelSelectButton
       //  .on("mouseup",function () {
       //      that.buildLevelSelectMenu();
       //  })
       //  .on("mousedown",function () {
       //  });
       //  var $mainTitle = $("<h1 class='mainTitle'>Ninja Attack</h1>").css({WebkitFilter: "drop-shadow(12px 7px 7px rgba(0,0,0,.5))", color:"brown", fontSize: "80px", fontFamily: "fantasy", position:"relative", textAlign:"center", margin:"auto", top:-500});

       //  this.$hud.find(".menuButtons").prepend($mainTitle);
       //  this.$hud.find(".menuButtons").append(launchButton);
       //  //this.$hud.find(".menuButtons").append(levelSelectButton);  <<<<===== level select not finished

       //  launchButton.find(".content").text("Play");
       //  levelSelectButton.find(".content").text("Select Level");
       //  launchButton.css({left:"-1000px", top: "60%"});
       //  levelSelectButton.css({left:"-1000px", top:"70%"});

       // $('.mainTitle').animate({top:"20%"},600);
       //  $('.menuButtons').children().each(function (index) {
       //      $(this).animate({left:$("#canvas").width()*0.5 - $(this).width() * 0.5},600);
       //  });
    };

    Hud.prototype.playButtonCallback = function() {};

    /**
        Make the buttons slide left and right && removes' em.
    */
    Hud.prototype.fadeMainMenu = function() {
        $('.mainTitle').animate({top:-150},600,function () {$(this).remove();});
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
            background: "-webkit-gradient(linear, left top, left bottom, color-stop(0%,#a90329), color-stop(44%,#8f0222), color-stop(100%,#6d0019))"
        });
        var content = $("<p class='content'></p>").css({
            width: "100%",
            textAlign: "center",
            pointerEvents: "none",
            WebkitTransform: "skew("+(-angle)+"deg)",
            MozTransform: "skew("+(-angle)+"deg)"
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


    var inGameHudBuilded = false;
    Hud.prototype.buildInGameHud = function() {
        if (inGameHudBuilded) {
            return;
        }
        inGameHudBuilded = true;
        /*
            health
            charge
            collectibles
        */
        this.$inGameHud = $("<div class='inGameHud' style='position:absolute; width:100%; height:100%;'></div>").prependTo(this.$hud);
        var $healthBarContainer = $("<div></div>").css({
            width           : "20%",
            height          : "5%",
            backgroundColor : "grey",
            margin          : "1%",
            border          : "5px black solid",
            position        : "absolute"
        }).appendTo(this.$inGameHud);
        var $healthBar = $("<div class='healthBar'></div>").css({
            position        : "absolute",
            width           : "100%",
            height          : "100%",
            backgroundColor : "brown",
        }).appendTo($healthBarContainer);

        var $chargeBarContainer = $healthBarContainer.clone().css({
            width       : "2%",
            height      : "25%",
            marginTop   : "5%"
        }).appendTo(this.$inGameHud);
        $chargeBarContainer.children().remove();
        $healthBar.clone().removeClass().addClass("chargeBar").css({height:"0%", backgroundColor: "yellow"}).appendTo($chargeBarContainer);

        var $thunderBarContainer = $chargeBarContainer.clone().css({marginLeft: "4%"}).appendTo(this.$inGameHud);
        $thunderBarContainer.children().remove();
        $healthBar.clone().removeClass().addClass("thunderBar").css({height:"0%", backgroundColor: "yellow"}).appendTo($thunderBarContainer);
        $healthBar.clone().removeClass().addClass("thunderBar2").css({height:"0%", backgroundColor: "red"}).appendTo($thunderBarContainer);

        this.$collectibles = $("<div class='collectibles_container' id='collectibles_container'></div>").prependTo(this.$inGameHud);
    };


    Hud.prototype.addCollectibles = function (number) {
        this.$collectibles.html('');
        for (var i = 0 ; i < number ; i++) {
            this.$collectibles.append('<div class="collectible id_' + i + '"></div>');
        };
    };


    Hud.prototype.pickCollectible = function (index) {
        $('.collectible.id_' + index).addClass('picked');
    };


    Hud.prototype.updateHealth = function(percentage) {
        this.$hud.find(".healthBar").css({width: percentage+"%"})
    };

    Hud.prototype.updateCharge = function(percentage) {
        this.$hud.find(".chargeBar").css({height: percentage+"%"})
    };

    Hud.prototype.updateThunder = function(percentage) {
        if (percentage >= 100) {
            this.$hud.find(".thunderBar").css({height: "100%"})
            this.$hud.find(".thunderBar2").css({height: Math.min(percentage - 100, 100)+"%"})
        }
        else
        {
            this.$hud.find(".thunderBar2").css({height: "0"})
            this.$hud.find(".thunderBar").css({height: percentage+"%"})
        }
    };

    Hud.prototype.gameoverFade = function() {
        var fadeOverlay = $('<div class="gameoverFade" style="position:absolute; width: 100%; height: 100%; background-color:black; opacity:0"></div>')

        this.$hud.find(".doors").append(fadeOverlay);
        this.closeDoors();
        fadeOverlay.delay(400).animate({opacity: 1},700, function () {
           // that.buildMainMenu();
        });
    };


    /*==========================================
    =            RETURN (singleton)            =
    ==========================================*/
    return new Hud();
});