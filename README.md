# Node boilerplate

> Simple node boilerplate create by Ciro Chang

## Endpoints
You can check the endpoints of the API coping and pasting the [swagger.yml](docs/swagger.yml) file in the [editor.swagger.io](https://editor.swagger.io). Or run the API and access the endpoint `/api-docs`.

## Requirements

- node 8.11.4

## Running in local
``` bash
# change the file .env.example to .env
mv .env.example .env
# install dependences
npm install
# serve with hot reload at localhost:3000
npm run start
```

## Running in a docker container
``` bash
# build the docker image
docker build -t <some name> .
# run the image
docker run -p <port>:<port> --env-file .env -d <some name>
```
