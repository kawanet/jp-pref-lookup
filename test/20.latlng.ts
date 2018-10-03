"use strict";

import "mocha";
import {Pref} from "../lib/jp-pref-lookup";

const assert = require("assert");
const FILE = __filename.split("/").pop() as string;

describe(FILE, () => {
    it("Sapporo", () => {
        const list = Pref.lookup({ll: "43.06417,141.34694"});
        assert(contains(list, "01"));
    });

    it("Tokyo", () => {
        const list = Pref.lookup({lat: 35.68944, lng: 139.69167});
        assert(contains(list, "13"));
    });

    it("Osaka", () => {
        const list = Pref.lookup({ll: "34.68639,135.52"});
        assert(contains(list, "27"));
    });

    it("Naha", () => {
        const list = Pref.lookup({lat: 26.2125, lng: 127.68111});
        assert(contains(list, "47"));
    });

    it("Mt.Fuji", () => {
        const list = Pref.lookup({ll: "35.3606,138.7278"});
        assert(contains(list, "19")); // 山梨県
        assert(contains(list, "22")); // 静岡県
    });

    it("invalid", () => {
        const list = Pref.lookup({ll: "invalid,invalid"});
        assert(!list);
    });
});

function contains(array, value) {
    if (!array) return array;
    return array.filter(_ => (_ === value)).length;
}