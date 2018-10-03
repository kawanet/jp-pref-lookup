"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var jp_pref_lookup_1 = require("../lib/jp-pref-lookup");
var assert = require("assert");
var FILE = __filename.split("/").pop();
describe(FILE, function () {
    it("Sapporo", function () {
        var list = jp_pref_lookup_1.Pref.lookup({ ll: "43.06417,141.34694" });
        assert(contains(list, "01"));
    });
    it("Tokyo", function () {
        var list = jp_pref_lookup_1.Pref.lookup({ lat: 35.68944, lng: 139.69167 });
        assert(contains(list, "13"));
    });
    it("Osaka", function () {
        var list = jp_pref_lookup_1.Pref.lookup({ ll: "34.68639,135.52" });
        assert(contains(list, "27"));
    });
    it("Naha", function () {
        var list = jp_pref_lookup_1.Pref.lookup({ lat: 26.2125, lng: 127.68111 });
        assert(contains(list, "47"));
    });
    it("Mt.Fuji", function () {
        var list = jp_pref_lookup_1.Pref.lookup({ ll: "35.3606,138.7278" });
        assert(contains(list, "19")); // 山梨県
        assert(contains(list, "22")); // 静岡県
    });
    it("invalid", function () {
        var list = jp_pref_lookup_1.Pref.lookup({ ll: "invalid,invalid" });
        assert(!list);
    });
});
function contains(array, value) {
    return array && array.some(function (v) { return (v === value); });
}
