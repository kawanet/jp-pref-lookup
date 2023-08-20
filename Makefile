#!/usr/bin/env bash -c make

ALL=\
	dist/jp-pref-mesh.json \
	dist/jp-pref-lookup.mjs \

all: $(ALL)
	make -C browser $@

clean:
	/bin/rm -fr $(ALL) build/ dist/*.js src/*.js lib/*.js test/*.js
	make -C browser $@

test: all mocha
	node -e 'import("./dist/jp-pref-lookup.mjs").then(x => console.log(x.Pref.name(13)))'
	node -e 'console.log(require("./dist/jp-pref-lookup.min.js").Pref.name(13))'

# ES2021 - CommonJS
src/%.js: src/%.ts
	./node_modules/.bin/tsc -p tsconfig.json

dist/jp-pref-mesh.json: src/prepare.js
	node $< $@

# ES2021 - ES Module
dist/%.mjs: build/esm/%.js dist/jp-pref-mesh.json
	cat $< > $@
	perl -i -pe 's#^(.* = require\()#// $$&#mg' $@
	echo "const DATA = " >> $@
	cat dist/jp-pref-mesh.json >> $@

# ES2021 - ES Module
build/esm/%.js: lib/%.ts
	./node_modules/.bin/tsc -p tsconfig-esm.json

update:
	/bin/rm -f dist/jp-pref-mesh.json
	make dist/jp-pref-mesh.json

mocha:
	./node_modules/.bin/mocha test

.PHONY: all clean test mocha update

