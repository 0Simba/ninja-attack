
	//c'est 4 variable sont reutilisé dans la balise espace jeux
var start_moove = false; //sert a savoir si un objet est en court de délplacement
var id_moove;
var decalageX = 0; //correspondent a la difference entre la position de la souris et la zone de blit de l'element a manipuler
var decalageY;

var blocage_debug = false;

function interagir_dom(cible, mouseX, mouseY, fin_deplacement){
	var id = cible.replace(/[a-zA-Z]+/, ''); // on supprime les lettres pour recuperer l'id
	var tab = cible.replace(/[0-9]+/, ''); // ici les chiffre
	if (selection == 'supprimer'){
		if (tab == 'mur'){
			var aSup = mur[id];
			mur = unset(mur, aSup); //on le supprime du tableau
			document.getElementById('espace_jeux').removeChild(document.getElementById(cible)); // on le supprime en DOM
		}
		else if (tab == 'pokeball'){
			var aSup = pokeball[id]
			pokeball = unset(pokeball, aSup);
			document.getElementById('espace_jeux').removeChild(document.getElementById(cible));
		}
		else if (tab == 'monstre'){
			var aSup = monstre[id];
			monstre = unset(monstre, aSup)
			document.getElementById('espace_jeux').removeChild(document.getElementById(cible));
		}
		else if (tab == 'vie'){
			var aSup = vie[id];
			vie = unset(vie, aSup)
			document.getElementById('espace_jeux').removeChild(document.getElementById(cible));
		}
		else if (tab == "hotZone") {
			hotZone.splice(id, 1);
			document.getElementById('espace_jeux').removeChild(document.getElementById(cible));
		}
	}
	else if (selection == 'deplacer' && !start_moove){
		if(decalageX == 0){ //cette condiction vient bloquer une regretion dut au onclick de l'objet
			start_moove = true;
			id_moove = cible;
			decalageX = mouseX - document.getElementById(cible).offsetLeft - document.getElementById('espace_jeux').offsetLeft;
			decalageY = mouseY - document.getElementById(cible).offsetTop - document.getElementById('espace_jeux').offsetTop;
		}
		else {decalageX = 0;}
	}
	else if (selection == 'deplacer' && fin_deplacement)
	{
		start_moove = false;
		if (tab == 'mur'){
			mur[id].top = document.getElementById(cible).offsetTop;
			mur[id].left = document.getElementById(cible).offsetLeft;
		}
		else if (tab == 'monstre'){
			monstre[id].top = document.getElementById(cible).offsetTop;
			monstre[id].left = document.getElementById(cible).offsetLeft;
			
			if(monstre[id].skin == 'bulbizare'){
				var mouvement = prompt('Mouvement à droite', monstre[id].mouvementDroite);
				
				if (!isNaN(parseFloat(mouvement))){ monstre[id].mouvementDroite = mouvement; 
				}			
				mouvement = prompt('Deplacement à gauche', monstre[id].mouvementGauche);
				
				if (!isNaN(parseFloat(mouvement))){ 
				monstre[id].mouvementGauche = mouvement;
				}
			}
			else if (monstre[id].skin == 'papillusion'){
				var mouvement = prompt('Mouvement en haut', monstre[id].mouvementHaut);
				
				if (!isNaN(parseFloat(mouvement))){ monstre[id].mouvementHaut = mouvement; 
				}			
				mouvement = prompt('Deplacement en bas', monstre[id].mouvementBas);
				
				if (!isNaN(parseFloat(mouvement))){ 
				monstre[id].mouvementBas = mouvement;
				}
			}
			
		}
		else if (tab == 'pokeball'){
			pokeball[id].top = document.getElementById(cible).offsetTop;;
			pokeball[id].left = document.getElementById(cible).offsetLeft;
		}
		else if (tab == 'vie'){
			vie[id].top = document.getElementById(cible).offsetTop;;
			vie[id].left = document.getElementById(cible).offsetLeft;
		}
	}
	
}
