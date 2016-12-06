'use strict';

/*
 * Dockerizar la App:
 * 1) docker run --name node-mysql -v $PWD/BDs/MySQL:/var/lib/mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=node-mysql-app -d mysql:latest
 * 2) docker exec -i node-mysql mysql -uroot -pnode-mysql-app < schema.sql
 *
 * Entrar en la shell del container:
 * docker run -it --link node-mysql:mysql --rm mysql sh -c 'exec mysql -h"$MYSQL_PORT_3306_TCP_ADDR" -P"$MYSQL_PORT_3306_TCP_PORT" -uroot -p"$MYSQL_ENV_MYSQL_ROOT_PASSWORD"'
 */

const mysql = require('mysql'),
  myConnection = require('express-myconnection'),
  dbOptions = {
    host: 'localhost',
    user: 'root',
    password: 'node-mysql-app',
    port: 3306,
    database: 'indentation_war'
  },
  conn = myConnection(mysql, dbOptions, 'request');

module.exports = conn;