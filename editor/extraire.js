
function extraire(){

	var startX = document.getElementById('depart').offsetLeft;
	var startY = document.getElementById('depart').offsetTop;
	
	var endX = document.getElementById('fin').offsetLeft;
	var endY = document.getElementById('fin').offsetTop;
	
	var contenue = 'var mur = new Array();var pokeball = new Array();var monstre = new Array(); var vie = new Array();';
	contenue += 'var startX = '+startX+';';
	contenue += 'var startY = '+startY+';';
	contenue += 'var endX = '+endX+';';
	contenue += 'var endY = '+endY+';';
	for (var i = 0 ; i < mur.length ; i++){
		contenue += 'mur['+i+'] = new class_mur();'
		contenue += 'mur['+i+'].top = ' + mur[i].top +';';
		contenue += 'mur['+i+'].left = ' + mur[i].left +';';
		contenue += 'mur['+i+'].height = ' + mur[i].height +';';
		contenue += 'mur['+i+'].width = ' + mur[i].width +';';
	}
	for (var i = 0 ; i < pokeball.length ; i++){
		contenue += 'pokeball['+i+'] = new class_objet();'
		contenue += 'pokeball['+i+'].top = ' + pokeball[i].top +';';
		contenue += 'pokeball['+i+'].left = ' + pokeball[i].left +';';
	}
	for (var i = 0 ; i < monstre.length ; i++){
		contenue += 'monstre['+i+'] = new class_objet();'
		contenue += 'monstre['+i+'].top = ' + monstre[i].top +';';
		contenue += 'monstre['+i+'].left = ' + monstre[i].left +';';
		contenue += 'monstre['+i+'].mouvementDroite = '+monstre[i].mouvementDroite+';';
		contenue += 'monstre['+i+'].mouvementGauche = '+monstre[i].mouvementDroite+';';
		contenue += 'monstre['+i+'].mouvementHaut = '+monstre[i].mouvementHaut+';';
		contenue += 'monstre['+i+'].mouvementBas = '+monstre[i].mouvementBas+';';
		contenue += 'monstre['+i+'].actifLR = 0;';
		contenue += 'monstre['+i+'].actifHB = 0;';
		contenue += 'monstre['+i+'].skin = \''+monstre[i].skin+'\';';
		contenue += 'creer_'+monstre[i].skin+'(monstre['+i+']);';
	}
		for (var i = 0 ; i < vie.length ; i++){
		contenue += 'vie['+i+'] = new class_objet();'
		contenue += 'vie['+i+'].top = ' + vie[i].top +';';
		contenue += 'vie['+i+'].left = ' + vie[i].left +';';
	}

	//contenue += document.getElementById('memoire').innerHTML; //rajout des boucle de creation (bug si pas dans le meme fichier que les données tableau)
	document.getElementById('extraire').value = contenue;
	
}
