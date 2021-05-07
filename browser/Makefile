#!/usr/bin/env bash -c make

all: dist test

dist: ../dist/jp-pref-lookup.min.js

../dist/jp-pref-lookup.min.js: ../build/bundle.js
	mkdir -p ../dist
	../node_modules/.bin/terser -c -m --ecma 5 -o $@ $<

../build/bundle.js: ../build/lib/jp-pref-lookup.js ../dist/jp-pref-mesh.json
	echo 'var Pref = (function(exports) {' > $@
	echo 'var DATA = ' >> $@
	cat ../dist/jp-pref-mesh.json >> $@
	echo ';' >> $@
	cat ../build/lib/jp-pref-lookup.js >> $@
	echo 'return Pref;' >> $@
	echo '})("undefined" !== typeof exports ? exports : {})' >> $@
	perl -i -pe 's#^(var DATA = require|"use strict"|Object.defineProperty|exports.*= void 0)#// $$&#mg' $@

test: dist ../build/test.js

../build/test.js: ../build/test/10.mesh.js
	../node_modules/.bin/browserify -o ../build/test.js ../build/test/*.js \
		-t [ browserify-sed \
		's#require\("../"\)#require("../../browser/import")#mg;' \
		's#"../package.json"#"../../package.json"#g' ]

../build/%.js: ../%.ts
	../node_modules/.bin/tsc -p ../browser

clean:
	/bin/rm -fr ../build

.PHONY: all clean test
