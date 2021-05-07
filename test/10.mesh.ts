"use strict";

import "mocha";
import {strict as assert} from "assert";
import {Pref} from "../";

const FILE = __filename.split("/").pop() as string;

describe(FILE, () => {
    it("lookup({mesh: 5339})", () => {
        const list = Pref.lookup({mesh: "5339"});
        assert.ok(contains(list, "13"));
    });

    it("lookup({mesh: 533946})", () => {
        const list = Pref.lookup({mesh: "533946"});
        assert.ok(contains(list, "13"));
    });

    it("lookup({mesh: 53393680})", () => {
        const list = Pref.lookup({mesh: "53393680"});
        assert.ok(contains(list, "13"));
    });

    it("invalid", () => {
        const list = Pref.lookup({mesh: "invalid"});
        assert.ok(Array.isArray(list));
        assert.equal(list.length, 0);
    });
});

function contains(array: any[], value: string): boolean {
    return array && array.some(v => (v === value));
}