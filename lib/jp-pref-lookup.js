"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DATA = require("../dist/jp-pref-mesh.json");
var c2 = fixedString(2);
var Pref;
(function (Pref) {
    var CODE = {};
    var NAME = {};
    var SRC = ("北海道,青森県,岩手県,宮城県,秋田県,山形県,福島県,茨城県,栃木県,群馬県," +
        "埼玉県,千葉県,東京都,神奈川県,新潟県,富山県,石川県,福井県,山梨県,長野県," +
        "岐阜県,静岡県,愛知県,三重県,滋賀県,京都府,大阪府,兵庫県,奈良県,和歌山県," +
        "鳥取県,島根県,岡山県,広島県,山口県,徳島県,香川県,愛媛県,高知県,福岡県," +
        "賀県,長崎県,熊本県,大分県,宮崎県,鹿児島県,沖縄県");
    var ALL = SRC.split(",").map(function (name, idx) {
        var code = c2(++idx);
        CODE[name] = code;
        NAME[code] = NAME[idx] = name;
        return code;
    });
    function all() {
        return ALL.slice();
    }
    Pref.all = all;
    function code(name) {
        return CODE[name] || // full name
            CODE[name + "都"] || // short name
            CODE[name + "府"] ||
            CODE[name + "県"] ||
            (NAME[name] && c2(+name)); // prefecture code
    }
    Pref.code = code;
    function name(code) {
        return NAME[code] || // prefecture code
            NAME[+Pref.code(code)]; // name
    }
    Pref.name = name;
    function lookup(options) {
        if (!options)
            return;
        // by pair of latitude and longitude
        var lat = +options.lat;
        var lng = +options.lng;
        if (lat || lng) {
            return findForMesh(getMeshForLocation(lat, lng));
        }
        // by comma separated latitude and longitude
        var ll = options.ll;
        if (ll) {
            var latlng = ("" + ll).split(",");
            return findForMesh(getMeshForLocation(+latlng[0], +latlng[1]));
        }
        // mesh code
        var mesh = options.mesh;
        if (mesh) {
            return findForMesh(mesh);
        }
    }
    Pref.lookup = lookup;
})(Pref = exports.Pref || (exports.Pref = {}));
/**
 * @private
 */
function findForMesh(mesh) {
    if (!mesh)
        return;
    mesh += "";
    var mesh1 = mesh.substr(0, 4);
    var mesh2 = (+(mesh.substr(0, 6))).toString(36);
    var pref = DATA.mesh2[mesh2] || DATA.mesh1[mesh1];
    if (+pref > 0)
        return [c2(pref)];
    if (pref)
        return pref.map(c2);
}
function getMeshForLocation(latitude, longitude) {
    latitude *= 1.5;
    longitude -= 100;
    if (!(0 <= latitude && latitude < 100))
        return;
    if (!(0 <= longitude && longitude < 100))
        return;
    return c2(latitude % 100) + c2(longitude % 100)
        + ((latitude * 8 % 8) | 0) + ((longitude * 8 % 8) | 0);
}
function fixedString(length) {
    return function (number) { return (number && number.length === length) ?
        number : ("00" + (+number | 0)).substr(-length); };
}
