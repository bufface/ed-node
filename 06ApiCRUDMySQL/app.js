'use strict';

/*
* Dockerizar la App:
* 1) docker run --name node-mysql -v $PWD/BDs/MySQL:/var/lib/mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=node-mysql-app -d mysql:latest
* 2) docker exec -i node-mysql mysql -uroot -pnode-mysql-app < schema.sql
*
* Entrar en la shell del container:
* docker run -it --link node-mysql:mysql --rm mysql sh -c 'exec mysql -h"$MYSQL_PORT_3306_TCP_ADDR" -P"$MYSQL_PORT_3306_TCP_PORT" -uroot -p"$MYSQL_ENV_MYSQL_ROOT_PASSWORD"'
*/

const express = require('express'),
  pug = require('pug'),
  bodyParser = require('body-parser'),
  favicon = require('serve-favicon')(`${__dirname}/public/favicon.png`),
  publicDir = express.static(`${__dirname}/public`),
  viewDir = `${__dirname}/views`,
  port = (process.env.PORT || 3000),
  mysql = require('mysql'),
  myConnection = require('express-myconnection'),
  dbOptions = {
    host: 'localhost',
    user: 'root',
    password: 'node-mysql-app',
    port: 3306,
    database: 'indentation_war'
  },
  conn = myConnection(mysql, dbOptions, 'request');

let app = express();

app.set('views', viewDir);
app.set('view engine', 'pug');
app.set('port', port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(publicDir);
app.use(favicon);
app.use(conn);

app.get('/', (req, res, next) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM team', (error, data) => {
      if (!error) {
        res.render('index', {
          title: 'Indentation War',
          data: data
        });
      }
    });
  });
});

app.get('/agregar', (req, res, next) => {
  res.render('add', {title: 'Agregar Contacto'});
});

app.post('/', (req, res, next) => {
  req.getConnection((err, conn) => {
    let contacto = {
      id: 0,
      name: req.body.name,
      twitter: req.body.twitter,
      country: req.body.country,
      side: req.body.side
    };

    conn.query('INSERT INTO team SET ?', contacto, (err, data) => {
      if(!err) {
        res.redirect('/');
      } else {
        res.redirect('/agregar');
      }
    });
  });
});

app.get('/editar/:id', (req, res, next) => {
  let id = req.params.id;

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM team WHERE id = ?', id, (err, data) => {
      if(!err) {
        res.render('edit', {
          title: 'Editar Contacto',
          data: data
        });
      }
    })
  });
});

app.post('/actualizar/:id', (req, res, next) => {
  req.getConnection((err, conn) => {
    let contacto = {
      id: req.body.id,
      name: req.body.name,
      twitter: req.body.twitter,
      country: req.body.country,
      side: req.body.side
    };

    conn.query('UPDATE team SET ? WHERE id = ?', [contacto, contacto.id], (err, data) => {
      if (!err) {
        res.redirect('/');
      } else {
        res.redirect('/editar/:id');
      }
    });
  });
});

app.post('/eliminar/:id', (req, res, next) => {
  req.getConnection((err, conn) => {
    let id = req.params.id;

    conn.query('DELETE FROM team WHERE id = ?', id, (err, data) => {
      if (!err) {
        res.redirect('/');
      } else {
        return next(new Error('Registro no encontrado'));
      }
    });
  });
});

app.use((req, res, next) => {
  let err = new Error();
  err.status = 404;
  err.statusText = 'NOT FOUND';

  res.render('error', {error: err});
});

app.listen(app.get('port'), () => console.log('Iniciando API CRUD Express con MySQL'));