install:
	npm ci

start-frontend:
	make -C frontend start

build:
	npm run build --prefix ./frontend

start:
	npx start-server -s ./frontend/dist
