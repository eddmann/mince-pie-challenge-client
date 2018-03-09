build:
	docker-compose run --rm react-create-app rm -fr node_modules && npm install

test:
	docker-compose run --rm react-create-app npm test

start:
	docker-compose run --service-ports --rm react-create-app npm start

shell:
	docker-compose run --service-ports --rm react-create-app bash
