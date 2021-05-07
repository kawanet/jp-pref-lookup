#!/usr/bin/env bash -c make

MESH_JSON=dist/jp-pref-mesh.json

all: $(MESH_JSON)
	make -C browser $@

clean:
	/bin/rm -f $(MESH_JSON) src/*.js lib/*.js test/*.js
	make -C browser $@

test: all mocha

src/%.js: src/%.ts
	./node_modules/.bin/tsc -p .

$(MESH_JSON): src/prepare.js
	node $< $(MESH_JSON)

mocha:
	./node_modules/.bin/mocha test

.PHONY: all clean test
