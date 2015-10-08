
function creer_bulbizare(){ //contourne un soucis l'ors du chargement de map
}
function creer_papillusion(){
}
function creer_insecateur(){
}
function creer_aeromite(){
}

function charger(map){

	for (var i = 0 ; i < mur.length ; i++){
		document.getElementById('espace_jeux').removeChild(document.getElementById('mur'+i));
	}
	
	for (var i = 0 ; i < pokeball.length ; i++){
		document.getElementById('espace_jeux').removeChild(document.getElementById('pokeball'+i));
	}
	
	for (var i = 0 ; i < monstre.length ; i++){
		document.getElementById('espace_jeux').removeChild(document.getElementById('monstre'+i));
	}
	
		for (var i = 0 ; i < vie.length ; i++){
		document.getElementById('espace_jeux').removeChild(document.getElementById('vie'+i));
	}

	map = map.replace(/(mur)/g, 'murr');				// On vient transferer les valeur créer dans la fonction dans les tableau de l'editeur (porté variable)
	map = map.replace(/(class_murr)/, 'class_mur');
	
	map = map.replace(/(monstre)/g, 'monstree');
	
	map = map.replace(/(pokeball)/g, 'pokeballl');
	
	map = map.replace(/(vie)/g, 'viee');
	
	eval(map);
	
	mur = murr;
	monstre = monstree;
	pokeball = pokeballl;
	vie = viee;
	
	for (var i = 0 ; i < mur.length ; i++){
		var creerDom = document.createElement("div");
		creerDom.className = 'mur';
		creerDom.id = 'mur' + i;
		creerDom.style.top = mur[i].top + 'px';
		creerDom.style.left = mur[i].left + 'px';
		creerDom.style.width = mur[i].width + 'px';
		creerDom.style.height = mur[i].height + 'px';
		creerDom.onclick = function(){interagir_dom(this.id);};
		creerDom.onmousedown = function(){interagir_dom(this.id, event.clientX, event.clientY);};
		creerDom.onmouseup = function(){interagir_dom(this.id, event.clientX, event.clientY, true);};
		document.getElementById('espace_jeux').appendChild(creerDom);
	}

	for (var i = 0 ; i < pokeball.length ; i++){ 
		var creerDom = document.createElement("div");
		creerDom.className = 'pokeball';
		creerDom.id = 'pokeball' + i;
		creerDom.style.top = pokeball[i].top + 'px';
		creerDom.style.left = pokeball[i].left + 'px';
		creerDom.style.width = '25px';
		creerDom.style.height = '25px';
		creerDom.innerHTML = '<img src="pokeball.gif" width="25">';
		document.getElementById('espace_jeux').appendChild(creerDom);
		creerDom.onclick = function(){interagir_dom(this.id);};
		creerDom.onmousedown = function(){interagir_dom(this.id, event.clientX, event.clientY);};
		creerDom.onmouseup = function(){interagir_dom(this.id, event.clientX, event.clientY, true);};
	}

	for (var i = 0 ; i < monstre.length ; i++){
		var creerDom = document.createElement("div");
		creerDom.className = monstre[i].skin;
		creerDom.id = 'monstre' + i;
		creerDom.style.top = monstre[i].top + 'px';
		creerDom.style.left = monstre[i].left + 'px';
		creerDom.style.width = monstre[i].width;
		creerDom.style.height = monstre[i].heigth;
		document.getElementById('espace_jeux').appendChild(creerDom);
		creerDom.onclick = function(){interagir_dom(this.id);};
		creerDom.onmousedown = function(){interagir_dom(this.id, event.clientX, event.clientY);};
		creerDom.onmouseup = function(){interagir_dom(this.id, event.clientX, event.clientY, true);};
	}
	
	for (var i = 0 ; i < vie.length ; i++){ 
		var creerDom = document.createElement("div");
		creerDom.className = 'vie';
		creerDom.id = 'vie' + i;
		creerDom.style.top = vie[i].top + 'px';
		creerDom.style.left = vie[i].left + 'px';
		creerDom.style.width = '40px';
		creerDom.style.height = '40px';
		creerDom.innerHTML = '<img src="vie.png" width="40">';
		document.getElementById('espace_jeux').appendChild(creerDom);
		creerDom.onclick = function(){interagir_dom(this.id);};
		creerDom.onmousedown = function(){interagir_dom(this.id, event.clientX, event.clientY);};
		creerDom.onmouseup = function(){interagir_dom(this.id, event.clientX, event.clientY, true);};
	}
	
	document.getElementById('depart').style.left = startX + 'px';
	document.getElementById('depart').style.top = startY + 'px';
	
	document.getElementById('fin').style.left = endX + 'px';
	document.getElementById('fin').style.top = endY + 'px';
}
