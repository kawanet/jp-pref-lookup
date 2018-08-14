// prepare.ts

import * as fs from "fs";
import * as iconv from "iconv-lite";
import {files} from "jp-data-mesh-csv";

const RADIX2 = 36;
const WARN = message => console.warn(message);

async function CLI(file) {
    const mesh1 = {};
    const mesh2 = {};
    const meshIndex1 = {};
    const meshIndex2 = {};

    files.forEach(name => {
        const file = "./node_modules/jp-data-mesh-csv/" + name;
        WARN("reading: " + file);

        const binary = fs.readFileSync(file, null);

        const data = iconv.decode(binary, "CP932");

        const rows = data.split(/\r?\n/).map(line => line.split(",").map(col => col.replace(/^"(.*)"$/, "$1")));

        rows.forEach(([city, name, mesh]) => {
            if (!+city) return;

            const pref = Math.floor((+city) / 1000);

            const code1 = mesh.substr(0, 4);
            const idx1 = mesh1[code1] || (mesh1[code1] = {});
            idx1[pref] = (idx1[pref] || 0) + 1;

            const code2 = mesh.substr(0, 6);
            const idx2 = mesh2[code2] || (mesh2[code2] = {});
            idx2[pref] = (idx2[pref] || 0) + 1;
        });
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

    const data = {mesh1: meshIndex1, mesh2: meshIndex2};
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
