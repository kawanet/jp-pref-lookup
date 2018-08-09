"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jp_pref_lookup_1 = require("../lib/jp-pref-lookup");
var assert = require("assert");
var FILE = __filename.split("/").pop();
describe(FILE, function () {
    it("all", function () {
        var list = jp_pref_lookup_1.Pref.all();
        // array
        assert.strictEqual(list.length, 47);
        // the first prefecture code
        assert.strictEqual(list.shift(), "01");
        // the last prefecture code
        assert.strictEqual(list.pop(), "47");
        // not damaged
        assert.strictEqual(jp_pref_lookup_1.Pref.all().length, 47);
    });
    it("name", function () {
        // prefecture code string
        assert.strictEqual(jp_pref_lookup_1.Pref.name("01"), "北海道");
        assert.strictEqual(jp_pref_lookup_1.Pref.name("13"), "東京都");
        assert.strictEqual(jp_pref_lookup_1.Pref.name("47"), "沖縄県");
        // prefecture code number
        assert.strictEqual(jp_pref_lookup_1.Pref.name(1), "北海道");
        assert.strictEqual(jp_pref_lookup_1.Pref.name(13), "東京都");
        assert.strictEqual(jp_pref_lookup_1.Pref.name(47), "沖縄県");
        // full name
        assert.strictEqual(jp_pref_lookup_1.Pref.name("北海道"), "北海道");
        assert.strictEqual(jp_pref_lookup_1.Pref.name("東京都"), "東京都");
        assert.strictEqual(jp_pref_lookup_1.Pref.name("沖縄県"), "沖縄県");
        // short name
        assert.strictEqual(jp_pref_lookup_1.Pref.name("東京"), "東京都");
        assert.strictEqual(jp_pref_lookup_1.Pref.name("沖縄"), "沖縄県");
    });
    it("code", function () {
        // full name
        assert.strictEqual(jp_pref_lookup_1.Pref.code("北海道"), "01");
        assert.strictEqual(jp_pref_lookup_1.Pref.code("東京都"), "13");
        assert.strictEqual(jp_pref_lookup_1.Pref.code("京都府"), "26");
        assert.strictEqual(jp_pref_lookup_1.Pref.code("大阪府"), "27");
        assert.strictEqual(jp_pref_lookup_1.Pref.code("沖縄県"), "47");
        // short name
        assert.strictEqual(jp_pref_lookup_1.Pref.code("東京"), "13");
        assert.strictEqual(jp_pref_lookup_1.Pref.code("愛知"), "23");
        assert.strictEqual(jp_pref_lookup_1.Pref.code("京都"), "26");
        assert.strictEqual(jp_pref_lookup_1.Pref.code("大阪"), "27");
        // prefecture code
        assert.strictEqual(jp_pref_lookup_1.Pref.code("01"), "01");
        assert.strictEqual(jp_pref_lookup_1.Pref.code("47"), "47");
    });
});
