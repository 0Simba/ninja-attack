define([
    'jquery',
    './player'
], function ($,player) {
    'use strict';
    var that;

    function Hud () {
        this.$hud = $(".hudOverlay");
        this.size = {};
        that      = this;
        this.gameData = {};
    }

    Hud.prototype.init = function(canvas, startCallback) {
        this.size.w = canvas.width;
        this.size.h = canvas.height;
    };

    Hud.prototype.retrieveGameData = function(gameData) {
        this.gameData   = gameData;
    };

    Hud.prototype.createBGDoors = function() {
        this.$hud.find(".doors").remove();
        var target = this.$hud.append("<div class='doors' style='width: 100%; height: 100%; position:absolute;'></div>").find(".doors");

        var $baseDiv = $("<img src=''>").css({position: "absolute", display: "block", height: "100%"});
        $baseDiv.clone().attr("src","assets/menu/leftDoor.png").addClass("door-left").css({width: "47.5%"}).appendTo(target);
        $baseDiv.clone().attr("src","assets/menu/rightDoor.png").addClass("door-right").css({width: "47.5%",marginLeft: "52.5%"}).appendTo(target);
        $baseDiv.clone().attr("src","assets/menu/topDoor.png").addClass("door-top").css({width: "100%"}).appendTo(target);
    };

    Hud.prototype.openDoors = function() {
        $(".door-left").finish().animate({left: (-that.size.w)+"px"},1500);
        $(".door-right").finish().animate({left: (that.size.w)+"px"},1500);
        $(".door-top").finish().animate({top: -(that.size.h * 2)+"px"},1500);
    };

    Hud.prototype.closeDoors = function() {
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
    Hud.prototype.buildMainMenu = function() {
        $(".menuButtons").remove();
        this.$hud.append("<div class='fullDiv menuButtons'></div>");

        var launchButton = this.createButton(300,100,25)
        .on("mouseup",function () {
            that.fadeMainMenu();
            that.playButtonCallback();
        });

        var helpButton = this.createButton(250,80,25)
        .on("mouseup",function () {
            that.fadeMainMenu();
            that.buildHelpMenu();
        });

        var levelSelectButton = this.createButton(250,80,25)
        .on("mouseup",function () {
            that.fadeMainMenu();
            that.buildLevelSelectMenu();
        })

        var creditButton = this.createButton(250,80,25)
        .on("mouseup",function () {
            that.fadeMainMenu();
            that.buildCredits();
        })


        var $mainTitle = $("<h1 class='mainTitle'>Ninja Attack</h1>").css({WebkitFilter: "drop-shadow(12px 7px 7px rgba(0,0,0,.5))", color:"brown", fontSize: "80px", fontFamily: "fantasy", position:"relative", textAlign:"center", margin:"auto", top:-500});

        this.$hud.find(".menuButtons").prepend($mainTitle);
        this.$hud.find(".menuButtons").append(launchButton);
        this.$hud.find(".menuButtons").append(levelSelectButton);
        this.$hud.find(".menuButtons").append(helpButton);
        this.$hud.find(".menuButtons").append(creditButton);

        launchButton.find(".content").text("Play").css({"fontSize":"30px"});
        helpButton.find(".content").text("Controls");
        levelSelectButton.find(".content").text("Select Level");
        creditButton.find(".content").text("Credits");
        launchButton.css({left:"-1000px", top: "50%"});
        levelSelectButton.css({left:"-1000px", top:"65%"});
        helpButton.css({left:"-1000px", top:"75%"});
        creditButton.css({left:"-1000px", top:"85%"});

        $('.mainTitle').animate({top:"20%"},600);
        $('.menuButtons').children().each(function (index) {
            $(this).animate({left:$("#canvas").width()*0.5 - $(this).width() * 0.5},600);
        });
    };

    Hud.prototype.playButtonCallback = function() {};

    /**
        Makes the buttons slide left and right && removes' em.
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
        var $newButton = $("<div class='customButton'></div>").css({
            position: "absolute",
            width: width+"px",
            height: height+"px",
            WebkitTransform: "skew("+angle+"deg)",
            MozTransform: "skew("+angle+"deg)",
            boxShadow: "2px 3px 10px #000",
            cursor: "pointer",
            background: "-webkit-gradient(linear, left top, left bottom, color-stop(0%,#a90329), color-stop(44%,#8f0222), color-stop(100%,#6d0019))"
        });
        var content = $("<p class='content'></p>").css({
            width: "100%",
            textAlign: "center",
            pointerEvents: "none",
            fontSize: "24px", 
            fontFamily: "fantasy",
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
        $('.levelSelectContainer').remove();
        var levelSelectContainer = $("<div class='fullDiv levelSelectContainer'></div>").appendTo(this.$hud);
        var levelSelector = $("<div class='levelSelector'></div>").appendTo(levelSelectContainer);

        levelSelector.css({
            position:"relative",
            margin:"auto",
            top:"-75%",
            width: "900px",
            overflow:"hidden",
            height: "420px",
            border: "5px solid #292929",
            backgroundColor: "grey" 
        });

        var levelBox = $("<div class='levelBox'></div>").css({
            height: "380px",
            width: "180px",
            background:"darkgrey",
            float: "left",
            margin : "10px 5px",
            position: "relative",
            top : "500px",
            cursor: "pointer",
            padding: "10px"
        });

        levelBox.append($("<h1 class='text' style='text-align:center; fontSize: 24px; fontFamily: fantasy;'></h1>"))

        levelSelector.animate({top:"30%"},600);

        for (var i = 0; i < this.gameData.list.length; i++) {
            var newBox = levelBox.clone().appendTo(levelSelector).delay(600 + i* 50).animate({top:0},200);
            newBox.find(".text").text("Level "+i);
            newBox.on('mouseup',function () {
                that.fadeLevelSelectMenu();
                that.playButtonCallback(i); 
            });
        };

        var returnButton = that.createButton(250,80,25)
        .on("mouseup",function () {
            that.fadeLevelSelectMenu();
            that.buildMainMenu();
        });
        returnButton.css({
            left:"110%",
            top: "85%"
        })

        returnButton.find(".content").text("Return");

        $(levelSelectContainer).append(returnButton);
        returnButton.animate({left:"10%"},400);
    };

    Hud.prototype.fadeLevelSelectMenu = function() {
        $(".levelSelector").animate({top:-1500},600,function () {$(this).remove();});
        $('.levelSelectContainer .customButton').off();
        $('.levelSelectContainer .levelBox').off();
        $('.levelSelectContainer .customButton').each(function (index) {
            $(this).animate({left: ((index % 2) * 3 - 1) * (that.size.w + $(this).width())},600,function () {
                $(this).remove();
            });
        });
    };

    Hud.prototype.buildHelpMenu = function() {
        $(".helpMenu").remove();
        this.$hud.append("<div class='fullDiv helpMenu'></div>");

        var $helpImage = $("<img class='helpImage' src='assets/inputs.png'>");
        $helpImage.css({
            width: "70%",
            height: "50%",
            position: "absolute",
            top: "-125%",
            left: "15%",
            boxShadow: "3px 5px 30px 3px black"
        });

        $('.helpMenu').append($helpImage);
        $helpImage.animate({top:"25%"},400);
        var returnButton = that.createButton(250,80,25)
        .on("mouseup",function () {
            that.fadeHelpMenu();
            that.buildMainMenu();
        });
        returnButton.css({
            left:"100%",
            top: "85%"
        })

        returnButton.find(".content").text("Return");

        $('.helpMenu').append(returnButton);
        returnButton.animate({left:"10%"},400);

    };

     Hud.prototype.fadeHelpMenu = function() {
        $('.helpImage').animate({top:-1500},600,function () {$(this).remove();});
        $('.helpMenu .customButton').off();
        $('.helpMenu .customButton').each(function (index) {
            $(this).animate({left: ((index % 2) * 3 - 1) * (that.size.w + $(this).width())},600,function () {
                $(this).remove();
            });
        });
    };

    Hud.prototype.buildCredits = function() {
        $('.creditContainer').remove();
        var credContainer = $("<div class='fullDiv creditContainer'></div>").appendTo(this.$hud),
            title = $("<h1 class='credTitle'>Credits</h1>").appendTo(credContainer),
            bapt = $("<h1 class='jaf'>Baptiste <span class='surname'>'Jafar'</span> Dersoir</h1>").css({top:"35%"}).appendTo(credContainer),
            flow = $("<h1 class='flow'>Florian <span class='surname'>'Flow' </span>François</h1>").css({top:"45%"}).appendTo(credContainer),
            tot = $("<h1 class='tot'>Théo <span class='surname'>'T0T0S'</span> Touaty</h1>").css({top:"55%"}).appendTo(credContainer);

        $(".jaf, .flow, .tot").css({
            WebkitFilter: "drop-shadow(12px 7px 7px rgba(0,0,0,.5))",
            color:"brown",
            fontSize: "60px",
            fontFamily: "fantasy",
            position:"absolute",
            left: "150%"
        }).find('.surname').css({fontSize: "30px"});

        $(".credTitle").css({
            fontSize: "80px",
            WebkitFilter: "drop-shadow(8px 4px 4px rgba(0,0,0,.5))",
            color:"brown",
            fontFamily: "fantasy",
            position:"relative",
            textAlign:"center",
            margin:"auto",
            top:"-50%"
        }); 


        var returnButton = that.createButton(250,80,25);
        returnButton.on("mouseup",function () {
            that.fadeCredits();
            that.buildMainMenu();
        }).css({
            left:"110%",
            top: "85%"
        })
        returnButton.find(".content").text("Return");
        credContainer.append(returnButton);

        returnButton.delay(250).animate({left:"10%"},400);

        $(".credTitle").delay(250).animate({top: "15%"},600);

        $(".jaf, .flow, .tot").each(function (index) {
            $(this).delay(500 + index * 100).animate({left: (32 + (5 * index))+"%",marginLeft: - $(this).width() * 0.5},600);
        });

    };

    Hud.prototype.fadeCredits = function() {
        $('.credTitle').animate({top:-1500},600,function () {$(this).remove();});
        $('.creditContainer .customButton').off();
        $('.creditContainer h1').each(function (index) {
            $(this).delay(index * 100).animate({left: -that.size.w + $(this).width()},600,function () {
                $(this).remove();
            });
        });

        $('.creditContainer .customButton').each(function () {
            $(this).animate({left: -(that.size.w + $(this).width())},600,function () {
                $(this).remove();
            });
        });
    };

    Hud.prototype.buildInGameHud = function() {
        /*
            collectibles
        */
        var $inGameHud = $("<div class='inGameHud' style='position:absolute; width:100%; height:100%;'></div>").prependTo(this.$hud);
        var $healthBarContainer = $("<div></div>").css({
            width           : "20%",
            height          : "5%",
            backgroundColor : "grey",
            margin          : "1%",
            border          : "5px black solid",
            position        : "absolute"
        }).appendTo($inGameHud);
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
        }).appendTo($inGameHud);
        $chargeBarContainer.children().remove();
        $healthBar.clone().removeClass().addClass("chargeBar").css({height:"0%", backgroundColor: "yellow"}).appendTo($chargeBarContainer);

        var $thunderBarContainer = $chargeBarContainer.clone().css({marginLeft: "4%"}).appendTo($inGameHud);
        $thunderBarContainer.children().remove();
        $healthBar.clone().removeClass().addClass("thunderBar").css({height:"0%", backgroundColor: "yellow"}).appendTo($thunderBarContainer);
        $healthBar.clone().removeClass().addClass("thunderBar2").css({height:"0%", backgroundColor: "red"}).appendTo($thunderBarContainer);

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
           that.buildMainMenu();
        });
    };


    /*==========================================
    =            RETURN (singleton)            =
    ==========================================*/
    return new Hud();
});