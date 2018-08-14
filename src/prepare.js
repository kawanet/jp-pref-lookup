"use strict";
// prepare.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var iconv = require("iconv-lite");
var jp_data_mesh_csv_1 = require("jp-data-mesh-csv");
var RADIX2 = 36;
var WARN = function (message) { return console.warn(message); };
function CLI(file) {
    return __awaiter(this, void 0, void 0, function () {
        var mesh1, mesh2, meshIndex1, meshIndex2, list1, list2, data, json;
        return __generator(this, function (_a) {
            mesh1 = {};
            mesh2 = {};
            meshIndex1 = {};
            meshIndex2 = {};
            jp_data_mesh_csv_1.files.forEach(function (name) {
                var file = "./node_modules/jp-data-mesh-csv/" + name;
                WARN("reading: " + file);
                var binary = fs.readFileSync(file, null);
                var data = iconv.decode(binary, "CP932");
                var rows = data.split(/\r?\n/).map(function (line) { return line.split(",").map(function (col) { return col.replace(/^"(.*)"$/, "$1"); }); });
                rows.forEach(function (_a) {
                    var city = _a[0], name = _a[1], mesh = _a[2];
                    if (!+city)
                        return;
                    var pref = Math.floor((+city) / 1000);
                    var code1 = mesh.substr(0, 4);
                    var idx1 = mesh1[code1] || (mesh1[code1] = {});
                    idx1[pref] = (idx1[pref] || 0) + 1;
                    var code2 = mesh.substr(0, 6);
                    var idx2 = mesh2[code2] || (mesh2[code2] = {});
                    idx2[pref] = (idx2[pref] || 0) + 1;
                });
            });
            list1 = Object.keys(mesh1);
            WARN("level 1: " + list1.length + " mesh");
            list1.forEach(function (code1) {
                var idx = mesh1[code1];
                var key = (+code1);
                var array = Object.keys(idx).sort(function (a, b) {
                    return ((idx[b] - idx[a]) || ((+b) - (+a)));
                }).map(function (v) { return +v; });
                meshIndex1[key] = array[0];
            });
            list2 = Object.keys(mesh2);
            WARN("level 2: " + list2.length + " mesh");
            list2.forEach(function (code2) {
                var idx = mesh2[code2];
                var key = (+code2).toString(RADIX2);
                var array = Object.keys(idx).sort(function (a, b) {
                    return ((idx[b] - idx[a]) || ((+b) - (+a)));
                }).map(function (v) { return +v; });
                if (array.length > 1) {
                    meshIndex2[key] = array;
                }
                else {
                    var first = array[0];
                    var code1 = Math.floor(+code2 / 100);
                    if (first !== meshIndex1[code1]) {
                        meshIndex2[key] = first;
                    }
                }
            });
            data = { mesh1: meshIndex1, mesh2: meshIndex2 };
            json = JSON.stringify(data);
            json = json.replace(/(.{76},)(")/g, "$1\n$2");
            if (file) {
                WARN("writing: " + file);
                fs.createWriteStream(file).write(json);
            }
            else {
                process.stdout.write(json);
            }
            return [2 /*return*/];
        });
    });
}
CLI.apply(null, process.argv.slice(2));
