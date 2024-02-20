install:
	npm ci

dev:
	npm run dev

start:
	npm start

client-start:
	npm run dev --prefix client

client-build:
	npm run build --prefix client

lint:
	npm run lint && npm run lint --prefix client