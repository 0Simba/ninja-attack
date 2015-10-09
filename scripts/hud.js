define([
    'jquery',
], function ($) {
    'use strict';

    function Hud () {
    	this.openGameElements = {};
    }

	Hud.prototype.startGameMenu = function() {
		var $hud = $(".hudOverlay");

		this.openGameElements["leftCorner"] = $("<div></div>");
		
		this.openGameElements["leftCorner"].css({
 			border: "400px solid",
            borderColor: "rgba(0,0,0,0)",
			position: "absolute",
            top: "-200px",
            left: "-450px",
            borderBottomColor: "#000"
		});

		this.openGameElements["rightCorner"] = $("<div></div>");
		
		this.openGameElements["rightCorner"].css({
 			border: "400px solid",
            borderColor: "rgba(0,0,0,0)",
			position: "absolute",
            top: "-200px",
            left: "450px",
            borderBottomColor: "#000"
		});

		this.openGameElements["topCorner"] = $("<div></div>");
		this.openGameElements["topCorner"].css({
 			border: "400px solid",
            borderColor: "rgba(0,0,0,0)",
			position: "absolute",
            left: "-250px",
            borderTopColor: "#d8e1e7",
            borderWidth: "650px"
		});


		$hud.append(this.openGameElements["leftCorner"]);
		$hud.append(this.openGameElements["rightCorner"]);
		$hud.append(this.openGameElements["topCorner"]);

	};

	Hud.prototype.openGame = function() {
		this.openGameElements["leftCorner"].animate({left: "-1500px"},2000,"swing",function () { $(this).remove(); });
		this.openGameElements["rightCorner"].animate({left: "1500px"},2000,"swing",function () { $(this).remove(); });
		this.openGameElements["topCorner"].animate({top: "-1500px"},2000,"swing",function () { $(this).remove(); });
	};

	

 	/*==========================================
    =            RETURN (singleton)            =
    ==========================================*/
    return new Hud();
});