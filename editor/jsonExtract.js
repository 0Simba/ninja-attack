
var unit  = 36; // pikachu height
var ratio = 1 / unit;

function jsonExtract () {
    var value = {};

    value.start = {
        x : (document.getElementById('depart').offsetLeft - unit / 2) * ratio,
        y : (-document.getElementById('depart').offsetTop + unit / 2) * ratio
    };


    value.end = {
        x : (document.getElementById('fin').offsetLeft - unit / 2) * ratio,
        y : (-document.getElementById('fin').offsetTop + unit / 2) * ratio
    };


    value.walls = [];

    for (var i = 0 ; i < mur.length ; i++) {
        var wall = mur[i];
        value.walls.push({
            y      : (-wall.top + wall.height) * ratio,
            x      : (wall.left - wall.width)  * ratio,
            width  : wall.width  * ratio,
            height : wall.height * ratio
        });
    }


    document.getElementById('jsonExtracted').value = JSON.stringify(value);
}
