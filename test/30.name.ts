"use strict";

import "mocha";
import {Pref} from "../lib/jp-pref-lookup";

const assert = require("assert");
const FILE = __filename.split("/").pop() as string;

describe(FILE, () => {
    it("all", () => {
        const list = Pref.all();

        // array
        assert.strictEqual(list.length, 47);

        // the first prefecture code
        assert.strictEqual(list.shift(), "01");

        // the last prefecture code
        assert.strictEqual(list.pop(), "47");

        // not damaged
        assert.strictEqual(Pref.all().length, 47);
    });

    it("name", () => {
        // prefecture code string
        assert.strictEqual(Pref.name("01"), "北海道");
        assert.strictEqual(Pref.name("13"), "東京都");
        assert.strictEqual(Pref.name("47"), "沖縄県");

        // prefecture code number
        assert.strictEqual(Pref.name(1), "北海道");
        assert.strictEqual(Pref.name(13), "東京都");
        assert.strictEqual(Pref.name(47), "沖縄県");

        // full name
        assert.strictEqual(Pref.name("北海道"), "北海道");
        assert.strictEqual(Pref.name("東京都"), "東京都");
        assert.strictEqual(Pref.name("沖縄県"), "沖縄県");

        // short name
        assert.strictEqual(Pref.name("東京"), "東京都");
        assert.strictEqual(Pref.name("沖縄"), "沖縄県");
    });

    it("code", () => {
        // full name
        assert.strictEqual(Pref.code("北海道"), "01");
        assert.strictEqual(Pref.code("東京都"), "13");
        assert.strictEqual(Pref.code("京都府"), "26");
        assert.strictEqual(Pref.code("大阪府"), "27");
        assert.strictEqual(Pref.code("沖縄県"), "47");

        // short name
        assert.strictEqual(Pref.code("東京"), "13");
        assert.strictEqual(Pref.code("愛知"), "23");
        assert.strictEqual(Pref.code("京都"), "26");
        assert.strictEqual(Pref.code("大阪"), "27");

        // prefecture code
        assert.strictEqual(Pref.code("01"), "01");
        assert.strictEqual(Pref.code("47"), "47");
    });
});
