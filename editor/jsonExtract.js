
var unit  = 36; // pikachu height
var ratio = 1 / unit;

function jsonExtract () {
    var value = {};

    value.start = {
        x : applyRatio(document.getElementById('depart').offsetLeft + unit / 2),
        y : applyRatio(-document.getElementById('depart').offsetTop - unit / 2)
    };


    value.end = {
        x : applyRatio(document.getElementById('fin').offsetLeft - unit / 2),
        y : applyRatio(-document.getElementById('fin').offsetTop + unit / 2)
    };


    value.walls = [];

    for (var i = 0 ; i < mur.length ; i++) {
        var wall = mur[i];

        var width  = applyRatio(wall.width);
        var height = applyRatio(wall.height);
        var y      = applyRatio(-wall.top - wall.height / 2);
        var x      = applyRatio(wall.left + wall.width / 2);

        value.walls.push({
            y      : y,
            x      : x,
            width  : width,
            height : height
        });
    }


    document.getElementById('jsonExtracted').value = JSON.stringify(value);
}


function applyRatio (v) {
    return Math.round(v * ratio * 10000) / 10000;
}

