lint-frontend:
	make -C frontend lint
start-frontend:
	make -C frontend start
start-backend:
	npm start
build:
	rm -rf frontend/build
	npm run build
start:
	make start-backend
develop:
	make start-backend & make start-frontend
install:
	npm ci