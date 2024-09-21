init: build run

build:
	docker build -t react-demo:latest .

run:
	docker run -it --rm --name REACT_DEMO -p 3000:3000 -v ./app:/app/app react-demo:latest
