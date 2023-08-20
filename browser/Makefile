#!/usr/bin/env bash -c make

ALL=\
	../dist/jp-pref-lookup.min.js \
	../build/test.js \

all: $(ALL)

# ES5 - CommonJS for browsers
../dist/jp-pref-lookup.min.js: ../build/bundle.js
	mkdir -p ../dist
	../node_modules/.bin/terser -c -m --ecma 5 -o $@ $<

../build/bundle.js: ../build/es5/jp-pref-lookup.js ../dist/jp-pref-mesh.json
	echo 'var Pref = (function(exports) {' > $@
	echo 'var DATA = ' >> $@
	cat ../dist/jp-pref-mesh.json >> $@
	echo ';' >> $@
	cat $< >> $@
	echo 'return Pref;' >> $@
	echo '})("undefined" !== typeof exports ? exports : {})' >> $@
	perl -i -pe 's#^(.* = require|"use strict"|Object.defineProperty|exports.*= void 0)#// $$&#mg' $@

test: ../build/test.js

../build/test.js: ../test/10.mesh.js
	../node_modules/.bin/browserify ../test/*.js \
		-t [ browserify-sed 's#require\("../"\)#require("../browser/import")#mg;' ] --list | sort
	../node_modules/.bin/browserify -o $@ ../test/*.js \
		-t [ browserify-sed 's#require\("../"\)#require("../browser/import")#mg;' ]

# ES5 - CommonJS
../build/es5/%.js: ../lib/%.ts
	../node_modules/.bin/tsc -p ../tsconfig-es5.json

# ES2021 - CommonJS
../test/%.js: ../test/%.ts
	../node_modules/.bin/tsc -p ../tsconfig.json

clean:
	/bin/rm -fr $(ALL) ../build/

.PHONY: all clean test
