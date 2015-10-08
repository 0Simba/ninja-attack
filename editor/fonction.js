
function unset(array, value){
	var output=[];
	var index = array.indexOf(value)
	var j = 0;
	for(var i in array){
		if (i!=index){
			output[j]=array[i];
			j++;
		}
	}
	return output;
}

function delElem(parent, child)
{
	var obj = document.getElementById(parent);
	var old = document.getElementById(child);

	obj.removeChild(old);
}   
