// prepare.ts
var Parser = require("jp-city-lookup/src/parser").Parser;
var RADIX2 = 36;
function CLI(stream) {
    return Parser.init().then(function () {
        var count1 = {};
        var count2 = {};
        Parser.all().forEach(function (city) {
            var pref = Math.floor(city / 1000);
            Parser.mesh(city).forEach(function (code) {
                var code1 = code.substr(0, 4);
                var idx1 = count1[code1] || (count1[code1] = {});
                idx1[pref] = (idx1[pref] || 0) + 1;
                var code2 = code.substr(0, 6);
                var idx2 = count2[code2] || (count2[code2] = {});
                idx2[pref] = (idx2[pref] || 0) + 1;
            });
        });
        var mesh1 = {};
        Object.keys(count1).forEach(function (code1) {
            var idx = count1[code1];
            var key = (+code1);
            var array = Object.keys(idx).sort(function (a, b) {
                return ((idx[b] - idx[a]) || ((+b) - (+a)));
            }).map(function (v) { return +v; });
            mesh1[key] = array[0];
        });
        var mesh2 = {};
        Object.keys(count2).forEach(function (code2) {
            var idx = count2[code2];
            var key = (+code2).toString(RADIX2);
            var array = Object.keys(idx).sort(function (a, b) {
                return ((idx[b] - idx[a]) || ((+b) - (+a)));
            }).map(function (v) { return +v; });
            if (array.length > 1) {
                mesh2[key] = array;
            }
            else {
                var first = array[0];
                var code1 = Math.floor(+code2 / 100);
                if (first !== mesh1[code1]) {
                    mesh2[key] = first;
                }
            }
        });
        var data = { mesh1: mesh1, mesh2: mesh2 };
        var json = JSON.stringify(data);
        json = json.replace(/(.{76},)(")/g, "$1\n$2");
        stream.write(json);
    });
}
CLI(process.stdout);
