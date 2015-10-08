
function gerer_patron(patronn){
	patron = document.getElementById('patron');
	if (patronn == 'poser_pokeball'){
		patron.innerHTML = '<img src="pokeball.gif" width=\'25\' />';
		patron.style.width = '25px';
		patron.style.height = '25px';
	}
	else if (patronn == 'tracer'){
		patron.innerHTML = '';
	}
	else if (patronn == 'poser_bulbizare'){
		patron.innerHTML = '<img src="bulbizare.gif" width=\'36\' />';
		patron.style.width = '36px';
		patron.style.height = '36px';
	}
	else if (patronn == 'poser_vie'){
		patron.innerHTML = '<img src="vie.png" width=\'40\' />';
		patron.style.width = '40px';
		patron.style.height = '40px';
	}
	else if (patronn == 'poser_papillusion')
	{
		patron.innerHTML = '<img src="papillusion.gif" width=\'59\' />';
		patron.style.width = '53px';
		patron.style.height = '59px';
	}
	else if (patronn == 'poser_aeromite')
	{
		patron.innerHTML = '<img src="aeromite.gif" width=\'61\' />';
		patron.style.width = '61px';
		patron.style.height = '79px';
	}
	else if (patronn == 'poser_insecateur'){
		patron.innerHTML = '<img src="insecateur.gif" width=\'79\' />';
		patron.style.width = '79px';
		patron.style.height = '51px';
	}
	else if (patronn == 'depart'){
		patron.innerHTML = '<img src="depart.gif" width=\'36\' />';
		patron.style.width = '36px';
		patron.style.height = '38px';
	}
	else if (patronn == 'fin'){
		patron.innerHTML = '<img src="fin.gif" width=\'89\' />';
		patron.style.width = '89px';
		patron.style.height = '54px';
	}
}

function gerer_position_patron(posY, posX){
	patron = document.getElementById('patron');
	patron.style.top = posY + window.pageYOffset - 50 +'px';
	patron.style.left = posX + window.pageXOffset - 100+'px';
}
