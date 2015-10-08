
function clavier(){
	if (ctrl && z){
		if (selection == 'tracer')
		{
			cible = mur.length - 1;
			mur.pop();
			var obj = document.getElementById("espace_jeux");
			var old = document.getElementById("mur"+cible);
			obj.removeChild(old);
		}
		else if (selection == 'poser_pokeball'){
			cible = pokeball.length - 1;
			pokeball.pop();
			var obj = document.getElementById("espace_jeux");
			var old = document.getElementById("pokeball"+cible);
			obj.removeChild(old);
		}
		else if (selection == 'poser_monstre'){
			cible = monstre.length - 1;
			monstre.pop();
			var obj = document.getElementById("espace_jeux");
			var old = document.getElementById("monstre"+cible);
			obj.removeChild(old);
		}
		else if(selection == 'poser_vie'){
			cible = vie.length - 1;
			vie.pop();
			var obj = document.getElementById("espace_jeux");
			var old = document.getElementById("vie"+cible);
			obj.removeChild(old);		
		}
	}
}
