"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var jp_pref_lookup_1 = require("../lib/jp-pref-lookup");
var assert = require("assert");
var FILE = __filename.split("/").pop();
describe(FILE, function () {
    it("lookup({mesh: 5339})", function () {
        var list = jp_pref_lookup_1.Pref.lookup({ mesh: "5339" });
        assert(contains(list, "13"));
    });
    it("lookup({mesh: 533946})", function () {
        var list = jp_pref_lookup_1.Pref.lookup({ mesh: "533946" });
        assert(contains(list, "13"));
    });
    it("lookup({mesh: 53393680})", function () {
        var list = jp_pref_lookup_1.Pref.lookup({ mesh: "53393680" });
        assert(contains(list, "13"));
    });
    it("invalid", function () {
        var list = jp_pref_lookup_1.Pref.lookup({ mesh: "invalid" });
        assert(Array.isArray(list));
        assert.strictEqual(list.length, 0);
    });
});
function contains(array, value) {
    return array && array.some(function (v) { return (v === value); });
}
