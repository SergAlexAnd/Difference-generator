install: 
	npm install

run-json:
	npx babel-node src/bin/gendiff.js __tests__/__fixtures__/__flat__/after.json __tests__/__fixtures__/__flat__/before.json

run-yaml:
	npx babel-node src/bin/gendiff.js __tests__/__fixtures__/__flat__/after.yml __tests__/__fixtures__/__flat__/before.yml

run-ini:
	npx babel-node src/bin/gendiff.js __tests__/__fixtures__/__flat__/after.ini __tests__/__fixtures__/__flat__/before.ini

run-json-nest:
	npx babel-node src/bin/gendiff.js __tests__/__fixtures__/__nested__/after.json __tests__/__fixtures__/__nested__/before.json

run-yaml-nest:
	npx babel-node src/bin/gendiff.js __tests__/__fixtures__/__nested__/after.yml __tests__/__fixtures__/__nested__/before.yml

run-ini-nest:
	npx babel-node src/bin/gendiff.js __tests__/__fixtures__/__nested__/after.ini __tests__/__fixtures__/__nested__/before.ini

run-format-json:
	npx babel-node src/bin/gendiff.js --format json __tests__/__fixtures__/__nested__/after.ini __tests__/__fixtures__/__nested__/before.ini

publish: 
	npm publish

lint:
	npx eslint .

test:
	jest --coverage