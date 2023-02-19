#!/usr/bin/env bash -c make

ALL=\
	dist/jp-pref-mesh.json \
	dist/jp-pref-lookup.mjs \

all: $(ALL)
	make -C browser $@

clean:
	/bin/rm -f dist/*.mjs src/*.js lib/*.js test/*.js
	make -C browser $@

test: all mocha

src/%.js: src/%.ts
	./node_modules/.bin/tsc -p tsconfig.json

dist/jp-pref-mesh.json: src/prepare.js
	node $< $@

dist/%.mjs: build/esm/%.js dist/jp-pref-mesh.json
	cat $< > $@
	perl -i -pe 's#^(.* = require\()#// $$&#mg' $@
	echo "const DATA = " >> $@
	cat dist/jp-pref-mesh.json >> $@

build/esm/%.js: lib/%.ts
	./node_modules/.bin/tsc -p tsconfig-esm.json

update:
	/bin/rm -f dist/jp-pref-mesh.json
	make dist/jp-pref-mesh.json

mocha:
	./node_modules/.bin/mocha test

.PHONY: all clean test update

