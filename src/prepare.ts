// prepare.ts

const Parser = require("jp-city-lookup/src/parser").Parser;
const RADIX2 = 36;

function CLI(stream) {

	return Parser.init().then(() => {
		const count1 = {};
		const count2 = {};

		Parser.all().forEach(city => {
			const pref = Math.floor(city / 1000);

			Parser.mesh(city).forEach(code => {
				const code1 = code.substr(0, 4);
				const idx1 = count1[code1] || (count1[code1] = {});
				idx1[pref] = (idx1[pref] || 0) + 1;

				const code2 = code.substr(0, 6);
				const idx2 = count2[code2] || (count2[code2] = {});
				idx2[pref] = (idx2[pref] || 0) + 1;
			});
		});

		const mesh1 = {};

		Object.keys(count1).forEach(code1 => {
			const idx = count1[code1];
			const key = (+code1);
			const array = Object.keys(idx).sort((a, b) => {
				return ((idx[b] - idx[a]) || ((+b) - (+a)));
			}).map(v => +v);

			mesh1[key] = array[0];
		});


		const mesh2 = {};

		Object.keys(count2).forEach(code2 => {
			const idx = count2[code2];
			const key = (+code2).toString(RADIX2);
			const array = Object.keys(idx).sort((a, b) => {
				return ((idx[b] - idx[a]) || ((+b) - (+a)));
			}).map(v => +v);

			if (array.length > 1) {
				mesh2[key] = array;
			} else {
				const first = array[0];
				const code1 = Math.floor(+code2 / 100);
				if (first !== mesh1[code1]) {
					mesh2[key] = first;
				}
			}
		});

		const data = {mesh1: mesh1, mesh2: mesh2};

		let json = JSON.stringify(data);
		json = json.replace(/(.{76},)(")/g, "$1\n$2");
		stream.write(json);
	});
}

CLI(process.stdout);
