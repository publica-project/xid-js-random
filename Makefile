.PHONY: closure

closure:
	@mkdir -p dist
	@rm -rf tmp
	tscc src/seed.ts --module commonjs --outDir tmp --exportAs seed
	mv tmp/seed.js dist/seed.cc.js
