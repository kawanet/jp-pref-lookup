#!/usr/bin/env mocha -R spec

import {strict as assert} from "assert";
import {Pref} from "../";

const FILE = __filename.split("/").pop() as string;

describe(FILE, () => {
    it("all", () => {
        const list = Pref.all();

        // array
        assert.equal(list.length, 47);

        // the first prefecture code
        assert.equal(list.shift(), "01");

        // the last prefecture code
        assert.equal(list.pop(), "47");

        // not damaged
        assert.equal(Pref.all().length, 47);
    });

    it("name", () => {
        // prefecture code string
        assert.equal(Pref.name("01"), "北海道");
        assert.equal(Pref.name("13"), "東京都");
        assert.equal(Pref.name("47"), "沖縄県");

        // prefecture code number
        assert.equal(Pref.name(1), "北海道");
        assert.equal(Pref.name(13), "東京都");
        assert.equal(Pref.name(47), "沖縄県");

        // full name
        assert.equal(Pref.name("北海道"), "北海道");
        assert.equal(Pref.name("東京都"), "東京都");
        assert.equal(Pref.name("沖縄県"), "沖縄県");

        // short name
        assert.equal(Pref.name("東京"), "東京都");
        assert.equal(Pref.name("沖縄"), "沖縄県");
    });

    it("code", () => {
        // full name
        assert.equal(Pref.code("北海道"), "01");
        assert.equal(Pref.code("東京都"), "13");
        assert.equal(Pref.code("京都府"), "26");
        assert.equal(Pref.code("大阪府"), "27");
        assert.equal(Pref.code("沖縄県"), "47");

        // short name
        assert.equal(Pref.code("東京"), "13");
        assert.equal(Pref.code("愛知"), "23");
        assert.equal(Pref.code("京都"), "26");
        assert.equal(Pref.code("大阪"), "27");

        // prefecture code
        assert.equal(Pref.code("01"), "01");
        assert.equal(Pref.code("47"), "47");
    });
});
