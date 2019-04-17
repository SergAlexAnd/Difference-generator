install: 
	npm install

run-json:
	npx babel-node src/bin/gendiff.js __tests__/__fixtures__/after.json __tests__/__fixtures__/before.json

run-yaml:
	npx babel-node src/bin/gendiff.js __tests__/__fixtures__/after.yaml __tests__/__fixtures__/before.yaml

run-ini:
	npx babel-node src/bin/gendiff.js __tests__/__fixtures__/after.ini __tests__/__fixtures__/before.ini

publish: 
	npm publish

lint:
	npx eslint .

test:
	jest