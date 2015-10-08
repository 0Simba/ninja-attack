
function class_mur(){
	var top;
	var left;
	var width;
	var height;
}

function class_murr(){ // contourne un echec d'un regexp
	var top;
	var left;
	var width;
	var height;
}

var mur = new Array();

function placer_carrer(top1, left1, top2, left2){
	var i = mur.length;
	//on regarde quel est le coté etant le depart
	
	mur[i] = new class_mur();
	top1 -= document.getElementById('espace_jeux').offsetTop;
	top2 -= document.getElementById('espace_jeux').offsetTop;
	left1 -= document.getElementById('espace_jeux').offsetLeft;
	left2 -= document.getElementById('espace_jeux').offsetLeft;
	
	if (top1 - top2 != 0 && left1 - left2 != 0)
	{
		if(top1 < top2){
			mur[i].top = top1 + window.pageYOffset;
			mur[i].height= top2 - top1;
		}
		else{
			mur[i].top = top2 + window.pageYOffset;
			mur[i].height = top1 - top2;
		}
		
		if (left1 < left2){
			mur[i].left = left1 + window.pageXOffset;
			mur[i].width = left2 - left1;
		}
		else{
			mur[i].left = left2 + window.pageXOffset;
			mur[i].width = left1 - left2;
		}
	
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
	else{
		mur.pop(); //si aucun carré n'a été tracé, on supprime le dernié element du tableau crée au debut de la fonction
	}
}

var tracage_patron = false;
function tracer_patron(event){
	var patron = document.getElementById('patron');
	
	var top1 = debut_tracageTop - document.getElementById('espace_jeux').offsetTop;
	var top2 = event.y - document.getElementById('espace_jeux').offsetTop;
	var left1 = debut_tracageLeft - document.getElementById('espace_jeux').offsetLeft;
	var left2 = event.x - document.getElementById('espace_jeux').offsetLeft;
	
	if(top1 < top2){
		patron.style.top = top1 + window.pageYOffset+'px';
		patron.style.height= top2 - top1+'px';
	}
	else{
		patron.style.top = top2 + window.pageYOffset+'px';
		patron.style.height = top1 - top2+'px';
	}
	
	if (left1 < left2){
		patron.style.left = left1 + window.pageXOffset+'px';
		patron.style.width = left2 - left1+'px';
	}
	else{
		patron.style.left = left2 + window.pageXOffset+'px';
		patron.style.width = left1 - left2+'px';
	}
}

