"use strict";

const DATA = require("../dist/jp-pref-mesh.json");

export module Pref {
    const CODE = {};
    const NAME = {};

    const SRC = (
        "北海道,青森県,岩手県,宮城県,秋田県,山形県,福島県,茨城県,栃木県,群馬県," +
        "埼玉県,千葉県,東京都,神奈川県,新潟県,富山県,石川県,福井県,山梨県,長野県," +
        "岐阜県,静岡県,愛知県,三重県,滋賀県,京都府,大阪府,兵庫県,奈良県,和歌山県," +
        "鳥取県,島根県,岡山県,広島県,山口県,徳島県,香川県,愛媛県,高知県,福岡県," +
        "賀県,長崎県,熊本県,大分県,宮崎県,鹿児島県,沖縄県");
    const ALL = SRC.split(",").map((name, idx) => {
        const code = c2(++idx);
        CODE[name] = code;
        NAME[code] = NAME[idx] = name;
        return code;
    });

    export function all(): Array<string> {
        return ALL.slice();
    }

    export function code(name: string): string {
        return CODE[name] || // full name
            CODE[name + "都"] || // short name
            CODE[name + "府"] ||
            CODE[name + "県"] ||
            (NAME[name] && c2(+name)); // prefecture code
    }

    export function name(code): string {
        return NAME[code] || // prefecture code
            NAME[+Pref.code(code)]; // name
    }

    export function lookup(options: {
        /// latitude,longitude
        ll?: string,
        /// latitude
        lat?: number,
        /// longitude
        lng?: number,
        /// mesh code
        mesh?: string,
    }): string[] {
        if (!options) return;

        // by pair of latitude and longitude
        const lat = +options.lat;
        const lng = +options.lng;
        if (lat || lng) {
            return findForMesh(getMeshForLocation(lat, lng));
        }

        // by comma separated latitude and longitude
        const ll = options.ll;
        if (ll) {
            const latlng = ("" + ll).split(",");
            return findForMesh(getMeshForLocation(latlng[0], latlng[1]));
        }

        // mesh code
        const mesh = options.mesh;
        if (mesh) {
            return findForMesh(mesh);
        }
    }
}

function findForMesh(mesh) {
    mesh += "";
    const mesh1 = mesh.substr(0, 4);
    const mesh2 = (+(mesh.substr(0, 6))).toString(36);
    const pref = DATA.mesh2[mesh2] || DATA.mesh1[mesh1];
    return (+pref > 0) ? [c2(pref)] : (pref && pref.map(c2));
}

function getMeshForLocation(latitude, longitude) {
    latitude *= 1.5;
    longitude -= 100;

    if (!(0 <= latitude && latitude < 100)) return;
    if (!(0 <= longitude && longitude < 100)) return;

    return c2(latitude) + c2(longitude)
        + ((latitude * 8 % 8) | 0) + ((longitude * 8 % 8) | 0);
}

function c2(number) {
    number |= 0;
    number %= 100;
    return (number < 10 ? "0" : "") + number;

}
