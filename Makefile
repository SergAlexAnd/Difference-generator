install: 
	npm install

run:
	npx babel-node src/bin/gendiff.js __tests__/__fixtures__/after.json __tests__/__fixtures__/before.json

publish: 
	npm publish

lint:
	npx eslint .