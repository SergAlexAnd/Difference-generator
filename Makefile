install: 
	npm install

run:
	npx babel-node 'dist/bin/gendiff.js'

publish: 
	npm publish

lint:
	npx eslint .