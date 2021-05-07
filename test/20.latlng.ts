#!/usr/bin/env mocha -R spec

import {strict as assert} from "assert";
import {Pref} from "../";

const FILE = __filename.split("/").pop() as string;

describe(FILE, () => {
    it("Sapporo", () => {
        const list = Pref.lookup({ll: "43.06417,141.34694"});
        assert.ok(contains(list, "01"));
    });

    it("Tokyo", () => {
        const list = Pref.lookup({lat: 35.68944, lng: 139.69167});
        assert.ok(contains(list, "13"));
    });

    it("Osaka", () => {
        const list = Pref.lookup({ll: "34.68639,135.52"});
        assert.ok(contains(list, "27"));
    });

    it("Naha", () => {
        const list = Pref.lookup({lat: 26.2125, lng: 127.68111});
        assert.ok(contains(list, "47"));
    });

    it("Mt.Fuji", () => {
        const list = Pref.lookup({ll: "35.3606,138.7278"});
        assert.ok(contains(list, "19")); // 山梨県
        assert.ok(contains(list, "22")); // 静岡県
    });

    it("invalid", () => {
        const list = Pref.lookup({ll: "invalid,invalid"});
        assert.ok(Array.isArray(list));
        assert.equal(list.length, 0);
    });
});

function contains(array: any[], value: string): boolean {
    return array && array.some(v => (v === value));
}