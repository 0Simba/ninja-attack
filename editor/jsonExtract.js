
var unit  = 36; // pikachu height
var ratio = 1 / unit;

function jsonExtract () {
    var value = {};

    extractStartEndOn(value)
    extractWallOn(value);
    extractMonstersOn(value);

    document.getElementById('jsonExtracted').value = JSON.stringify(value);
}


function extractMonstersOn (value) {
    value.monsters = [];

    for (var i = 0 ; i < monstre.length ; i++) {
        var monster = monstre[i];

        value.monsters.push({
            x       : applyRatio(monster.left + unit / 2),
            y       : applyRatio(-monster.top - unit / 2),
            skin    : monster.skin,
            iaValue : applyRatio(monster.mouvementDroite)
        });
    }
}


function extractStartEndOn (value) {
    value.start = {
        x : applyRatio(document.getElementById('depart').offsetLeft + unit / 2),
        y : applyRatio(-document.getElementById('depart').offsetTop - unit / 2)
    };

    value.end = {
        x : applyRatio(document.getElementById('fin').offsetLeft + unit / 2),
        y : applyRatio(-document.getElementById('fin').offsetTop - unit / 2)
    };
}



function extractWallOn (value) {
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
}


/*=============================
=            UTILS            =
=============================*/


function applyRatio (v) {
    return Math.round(v * ratio * 10000) / 10000;
}

