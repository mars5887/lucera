# Lucera API Demo

## Installation

In the project directory, to build the api run:

### `npm install`

In the project directory, to start api run:

### `docker-compose-up`

### Notes:
This will install a NodeJs image and a MongoDB image and wire them together. When the server starts it will load the csv sample data into MongoDB.

If you do not use <a href="https://docs.docker.com/compose/">docker-compose</a> to run the api server, you must <a href="https://www.mongodb.com/download-center/communityon">install MongoDb</a> for your target platform and change the <a href="https://github.com/mars5887/lucera/blob/master/api/lucera-demo-api/src/data/persist/index.js">server definition</a> (var server = [your mongo installation]) for the mongo DB connection. You can then start the api server with 'npm start'

### Mongo Tuning:
There is no<a href="https://docs.mongodb.com/manual/administration/analyzing-mongodb-performance/" >performance tuning</a> set up for mongo instance, i.e. indexes etc. With this in mind, the performance can be even better than it already is.
