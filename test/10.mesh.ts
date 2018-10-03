"use strict";

import "mocha";
import {Pref} from "../lib/jp-pref-lookup";

const assert = require("assert");
const FILE = __filename.split("/").pop() as string;

describe(FILE, () => {
    it("lookup({mesh: 5339})", () => {
        const list = Pref.lookup({mesh: "5339"});
        assert(contains(list, "13"));
    });

    it("lookup({mesh: 533946})", () => {
        const list = Pref.lookup({mesh: "533946"});
        assert(contains(list, "13"));
    });

    it("lookup({mesh: 53393680})", () => {
        const list = Pref.lookup({mesh: "53393680"});
        assert(contains(list, "13"));
    });

    it("invalid", () => {
        const list = Pref.lookup({mesh: "invalid"});
        assert(!list);
    });
});

function contains(array: any[], value: string): boolean {
    return array && array.some(v => (v === value));
}