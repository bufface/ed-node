'use strict';

/*
 * Dockerizar la App:
 * 1) docker run --name node-mongo -v /Users/bufface_valtech/BDs/Mongo:/data/db -d -p27017:27017 mongo:latest
 * 2) docker exec -i node-mysql mysql -uroot -pnode-mysql-app < schema.sql
 *
 * Entrar en la shell del container:
 * docker run -it --link node-mysql:mysql --rm mysql sh -c 'exec mysql -h"$MYSQL_PORT_3306_TCP_ADDR" -P"$MYSQL_PORT_3306_TCP_PORT" -uroot -p"$MYSQL_ENV_MYSQL_ROOT_PASSWORD"'
 */

const mongoose = require('mongoose'),
  conf = require('./db-conf');

mongoose.connect(`mongodb:\/\/${conf.mongo.host}/${conf.mongo.database}`);

module.exports = mongoose;