#!/usr/bin/env node

import * as fs from "fs";
import * as GridMaster from "jp-grid-square-master";

const RADIX2 = 36;
const WARN = (message: string) => console.warn(message);

type PrefIndex = { [pref: string]: number };
type MeshIndex = { [mesh: string]: PrefIndex };
type MeshMaster = { [mesh: string]: number | number[] };
type MasterJSON = { mesh1: MeshMaster, mesh2: MeshMaster };

const enum C {
    都道府県市区町村コード = 0,
    市区町村名 = 1,
    基準メッシュコード = 2,
    備考 = 3,
}

async function CLI(file: string) {
    const mesh1 = {} as MeshIndex;
    const mesh2 = {} as MeshIndex;
    const meshIndex1 = {} as MeshMaster;
    const meshIndex2 = {} as MeshMaster;

    await GridMaster.all({
        progress: WARN,
        each: row => {
            const city = +row[C.都道府県市区町村コード];
            if (!city) return;

            const pref = Math.floor(city / 1000);
            const mesh = row[C.基準メッシュコード];

            const code1 = mesh.substr(0, 4);
            const idx1 = mesh1[code1] || (mesh1[code1] = {});
            idx1[pref] = (idx1[pref] || 0) + 1;

            const code2 = mesh.substr(0, 6);
            const idx2 = mesh2[code2] || (mesh2[code2] = {});
            idx2[pref] = (idx2[pref] || 0) + 1;
        }
    });

    const list1 = Object.keys(mesh1);
    WARN("level 1: " + list1.length + " mesh");
    list1.forEach(code1 => {
        const idx = mesh1[code1];
        const key = (+code1);
        const array = Object.keys(idx).sort((a, b) => {
            return ((idx[b] - idx[a]) || ((+b) - (+a)));
        }).map(v => +v);

        meshIndex1[key] = array[0];
    });

    const list2 = Object.keys(mesh2);
    WARN("level 2: " + list2.length + " mesh");
    list2.forEach(code2 => {
        const idx = mesh2[code2];
        const key = (+code2).toString(RADIX2);
        const array = Object.keys(idx).sort((a, b) => {
            return ((idx[b] - idx[a]) || ((+b) - (+a)));
        }).map(v => +v);

        if (array.length > 1) {
            meshIndex2[key] = array;
        } else {
            const first = array[0];
            const code1 = Math.floor(+code2 / 100);
            if (first !== meshIndex1[code1]) {
                meshIndex2[key] = first;
            }
        }
    });

    const data = {mesh1: meshIndex1, mesh2: meshIndex2} as MasterJSON;
    let json = JSON.stringify(data);
    json = json.replace(/(.{76},)(")/g, "$1\n$2");

    if (file) {
        WARN("writing: " + file);
        fs.createWriteStream(file).write(json);
    } else {
        process.stdout.write(json);
    }
}

CLI.apply(null, process.argv.slice(2));
