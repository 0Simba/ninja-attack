
function class_objet(){
	var top;
	var left;
}

function objet(){

	var anim;	//section animation
	var total_anim;
	var taille_sprite;
	var hauteur_sprite;
	var taille_hitbox;
	var hauteur_hitbox;
	var gauche;	//y du sprite
	var droite;
	var bas;
	var haut;
	var vitesse_chute;
	var vitesse_mouvement;
	var direction;
	var forme;
	var vitesseCourse;
	var accelerationCourse;
	var vitesseChute;
	var accelerationChute;
	var maxCourse;
	var maxChute;

		//section IA
	var mouvementDroite;
	var mouvementGauche;
	var mouvementHaut;
	var mouvementBas;
	var actifLR;
	var actifHB

	var directionHB;
	var directionDG;

}


var pokeball = new Array();
var monstre  = new Array();
var vie      = new Array();
var hotZone  = new Array();


function poser_objet(posX, posY){ //cette fonction pose et créer les tableau des element du jeu

	if (selection == 'poser_pokeball'){
		var i = pokeball.length;
		pokeball[i] = new class_objet();
		pokeball[i].top =  posY + window.pageYOffset - 50;
		pokeball[i].left = posX + window.pageXOffset - 100;

		var creerDom = document.createElement("div");
		creerDom.className = 'pokeball';
		creerDom.id = 'pokeball' + i;
		creerDom.style.top = posY + window.pageYOffset - 50 +'px';
		creerDom.style.left = posX + window.pageXOffset - 100+'px';
		creerDom.innerHTML = '<img src="pokeball.gif" width="25px"/>';
		creerDom.onclick = function(){interagir_dom(this.id);};
		creerDom.onmousedown = function(){interagir_dom(this.id, event.clientX, event.clientY);};
		creerDom.onmouseup = function(){interagir_dom(this.id, event.clientX, event.clientY, true);};
		document.getElementById('espace_jeux').appendChild(creerDom);
	}
	else if (selection == 'poser_monstre'){
		if (monstre_selection == 'bulbizare'){
			var i = monstre.length;
			type = monstre_selection;

			monstre[i] = new objet();
			monstre[i].top =  posY + window.pageYOffset - 50;
			monstre[i].left = posX + window.pageXOffset - 100;
			monstre[i].skin = type;

			var mouvement = prompt('Mouvement à droite', 50);
			while (isNaN(parseFloat(mouvement))){
				mouvement = prompt('Mouvement à droite', 50);
			}
			monstre[i].mouvementDroite = mouvement;

			mouvement = prompt('Mouvement à gauche', 50);
			while (isNaN(parseFloat(mouvement))){
				mouvement = prompt('Mouvement à gauche', 50);
			}
			monstre[i].mouvementGauche = mouvement;

			var creerDom = document.createElement("div");
			creerDom.className = type;
			creerDom.id = 'monstre' + i;
			creerDom.style.top = posY + window.pageYOffset - 50 +'px';
			creerDom.style.left = posX + window.pageXOffset - 100+'px';
			creerDom.innerHTML = '<img src="'+type+'.gif" width="36px"/>';
			creerDom.onclick = function(){interagir_dom(this.id);};
			creerDom.onmousedown = function(){interagir_dom(this.id, event.clientX, event.clientY);};
			creerDom.onmouseup = function(){interagir_dom(this.id, event.clientX, event.clientY, true);};
			document.getElementById('espace_jeux').appendChild(creerDom);
		}
		else if (monstre_selection == 'papillusion'){
			var i = monstre.length;
			type = monstre_selection;

			monstre[i] = new objet();
			monstre[i].top =  posY + window.pageYOffset - 50;
			monstre[i].left = posX + window.pageXOffset - 100;
			monstre[i].skin = type;

			var mouvement = prompt('Mouvement en haut', 25);
			while (isNaN(parseFloat(mouvement))){
				mouvement = prompt('Mouvement en haut', 25);
			}
			monstre[i].mouvementHaut = mouvement;

			mouvement = prompt('Mouvement en bas', 25);
			while (isNaN(parseFloat(mouvement))){
				mouvement = prompt('Mouvement en bas', 25);
			}
			monstre[i].mouvementBas = mouvement;

			var creerDom = document.createElement("div");
			creerDom.className = type;
			creerDom.id = 'monstre' + i;
			creerDom.style.top = posY + window.pageYOffset - 50 +'px';
			creerDom.style.left = posX + window.pageXOffset - 100+'px';
			creerDom.innerHTML = '<img src="'+type+'.gif" width="59px"/>';
			creerDom.onclick = function(){interagir_dom(this.id);};
			creerDom.onmousedown = function(){interagir_dom(this.id, event.clientX, event.clientY);};
			creerDom.onmouseup = function(){interagir_dom(this.id, event.clientX, event.clientY, true);};
			document.getElementById('espace_jeux').appendChild(creerDom);
		}
		else if (monstre_selection == 'insecateur'){
			var i = monstre.length;
			type = monstre_selection;

			monstre[i] = new objet();
			monstre[i].top =  posY + window.pageYOffset - 50;
			monstre[i].left = posX + window.pageXOffset - 100;
			monstre[i].skin = type;

			var creerDom = document.createElement("div");
			creerDom.className = type;
			creerDom.id = 'monstre' + i;
			creerDom.style.top = posY + window.pageYOffset - 50 +'px';
			creerDom.style.left = posX + window.pageXOffset - 100+'px';
			creerDom.innerHTML = '<img src="'+type+'.gif" width="79px"/>';
			creerDom.onclick = function(){interagir_dom(this.id);};
			creerDom.onmousedown = function(){interagir_dom(this.id, event.clientX, event.clientY);};
			creerDom.onmouseup = function(){interagir_dom(this.id, event.clientX, event.clientY, true);};
			document.getElementById('espace_jeux').appendChild(creerDom);
		}
		else if (monstre_selection == 'aeromite'){
			var i = monstre.length;
			type = monstre_selection;

			monstre[i] = new objet();
			monstre[i].top =  posY + window.pageYOffset - 50;
			monstre[i].left = posX + window.pageXOffset - 100;
			monstre[i].skin = type;

			var creerDom = document.createElement("div");
			creerDom.className = type;
			creerDom.id = 'monstre' + i;
			creerDom.style.top = posY + window.pageYOffset - 50 +'px';
			creerDom.style.left = posX + window.pageXOffset - 100+'px';
			creerDom.innerHTML = '<img src="'+type+'.gif" width="53px"/>';
			creerDom.onclick = function(){interagir_dom(this.id);};
			creerDom.onmousedown = function(){interagir_dom(this.id, event.clientX, event.clientY);};
			creerDom.onmouseup = function(){interagir_dom(this.id, event.clientX, event.clientY, true);};
			document.getElementById('espace_jeux').appendChild(creerDom);
		}
	}
	else if (selection == 'poser_vie'){
		var i = vie.length;
		vie[i] = new class_objet();
		vie[i].top =  posY + window.pageYOffset - 50;
		vie[i].left = posX + window.pageXOffset - 100;

		var creerDom = document.createElement("div");
		creerDom.className = 'vie';
		creerDom.id = 'vie' + i;
		creerDom.style.top = posY + window.pageYOffset - 50 +'px';
		creerDom.style.left = posX + window.pageXOffset - 100+'px';
		creerDom.innerHTML = '<img src="vie.png" width="40px"/>';
		creerDom.onclick = function(){interagir_dom(this.id);};
		creerDom.onmousedown = function(){interagir_dom(this.id, event.clientX, event.clientY);};
		creerDom.onmouseup = function(){interagir_dom(this.id, event.clientX, event.clientY, true);};
		document.getElementById('espace_jeux').appendChild(creerDom);
	}
	else if(selection == 'depart'){
		document.getElementById('depart').style.left = posX + window.pageXOffset - 100 + 'px';
		document.getElementById('depart').style.top = posY + window.pageYOffset - 50 +'px';
	}
	else if(selection == 'fin'){
		document.getElementById('fin').style.left = posX + window.pageXOffset - 100 + 'px';
		document.getElementById('fin').style.top = posY + window.pageYOffset - 50 +'px';
	}

	else if (selection == 'hot_zone') {
		var newHotZone  = new class_objet();
		var inSize      = prompt('in size');
		var outSize     = prompt('out size');
		var zoomRatio   = prompt('zoom ratio');

		newHotZone.top       =  posY + window.pageYOffset - 50;
		newHotZone.left      = posX + window.pageXOffset - 100;
		newHotZone.inSize    = inSize;
		newHotZone.outSize   = outSize;
		newHotZone.zoomRatio = zoomRatio;

		hotZone.push(newHotZone);


		var newDom = document.createElement("div");
		newDom.className    = 'hotZone';
		newDom.id           = 'hotZone' + (hotZone.length - 1);
		newDom.style.top    = (posY + window.pageYOffset) - 50  +'px';
		newDom.style.left   = (posX + window.pageXOffset) - 100 +'px';
		newDom.style.width  = outSize;
		newDom.style.height = outSize;
		newDom.innerHTML  = '<div class="outHotZone" style="margin-left : -' + (outSize / 2) + 'px; margin-top : -' + (outSize / 2) + 'px; width : ' + outSize + 'px; height: ' + outSize + 'px;"></div><div class="inHotZone" style="margin-left : -' + (inSize / 2) + 'px; margin-top : -' + (inSize / 2) + 'px; width : ' + inSize + 'px; height: ' + inSize + 'px;"></div>';
		newDom.onclick     = function(){interagir_dom(this.id);};
		newDom.onmousedown = function(){interagir_dom(this.id, event.clientX, event.clientY);};
		newDom.onmouseup   = function(){interagir_dom(this.id, event.clientX, event.clientY, true);};
		document.getElementById('espace_jeux').appendChild(newDom);
	}
}
