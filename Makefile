#!/usr/bin/env bash -c make

MAIN_OUT=dist/jp-pref-lookup.min.js
MAIN_TMP=tmp/jp-pref-lookup.browserify.js
MAIN_SRC=lib/*.js

MESH_SRC=src/prepare.js
MESH_JSON=dist/jp-pref-mesh.json

CLASS=Pref

all: $(MAIN_OUT)

clean:
	/bin/rm -f $(MAIN_OUT) $(MAIN_TMP) $(MESH_JSON)

test: all mocha

$(MESH_JSON): $(MESH_SRC)
	node $(MESH_SRC) $(MESH_JSON)

$(MAIN_TMP): $(MAIN_SRC) $(MESH_JSON)
	mkdir -p tmp
	echo 'module.exports = require("./lib/jp-pref-lookup").Pref;' | \
	./node_modules/.bin/browserify - -s $(CLASS) --debug | \
	perl -pe 's,"\.+/(dist|lib)/,",' | \
	egrep -v '^"use strict";|__esModule' > $@

$(MAIN_OUT): $(MAIN_TMP)
	./node_modules/.bin/uglifyjs -c -m -o $@ $<

mocha:
	./node_modules/.bin/mocha test

.PHONY: all clean test
