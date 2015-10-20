
var unit  = 36; // pikachu height
var ratio = 1 / unit;
var yUpValue = 30;

function jsonExtract () {
    var value = {};

    extractStartEndOn(value)
    extractWallOn(value);
    extractMonstersOn(value);
    extractHotZoneOn(value);

    document.getElementById('jsonExtracted').value = JSON.stringify(value);
}


var editorSkinNameToGameName = {
    'bulbizare'   : 'rabit',
    'insecateur'  : 'scyther',
    'papillusion' : 'butterfree',
    'aeromite'    : 'venomoth'
};



function extractMonstersOn (value) {
    value.monsters = [];

    for (var i = 0 ; i < monstre.length ; i++) {
        var monster = monstre[i];

        value.monsters.push({
            x       : applyRatio(monster.left + unit / 2),
            y       : applyRatio(-monster.top - unit / 2) + yUpValue,
            skin    : editorSkinNameToGameName[monster.skin],
            iaValue : applyRatio(monster.mouvementDroite || monster.mouvementHaut)
        });
    }
}


function extractStartEndOn (value) {
    value.start = {
        x : applyRatio(document.getElementById('depart').offsetLeft + unit / 2),
        y : applyRatio(-document.getElementById('depart').offsetTop - unit / 2) + yUpValue
    };

    value.end = {
        x : applyRatio(document.getElementById('fin').offsetLeft + unit / 2),
        y : applyRatio(-document.getElementById('fin').offsetTop - unit / 2) + yUpValue
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
            y      : y + yUpValue,
            x      : x,
            width  : width,
            height : height
        });
    }
}


function extractHotZoneOn (value) {
    value.hotZones = [];

    for (var i = 0; i < hotZone.length; i++) {
        var currentHotZone = hotZone[i];

        value.hotZones.push({
            inRadius  : applyRatio(currentHotZone.inSize  / 2),
            outRadius : applyRatio(currentHotZone.outSize / 2),
            y         : applyRatio(-currentHotZone.top) + yUpValue,
            x         : applyRatio(currentHotZone.left),
            zoomRatio : parseFloat(currentHotZone.zoomRatio)
        })
    };
}


/*=============================
=            UTILS            =
=============================*/


function applyRatio (v) {
    return Math.round(v * ratio * 10000) / 10000;
}

