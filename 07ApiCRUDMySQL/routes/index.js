'use strict';

const conn = require('../models/model'),
  express = require('express'),
  router = express.Router();

function error404 (req, res, next) {
  let err = new Error();
  err.status = 404;
  err.statusText = 'NOT FOUND';

  res.render('error', {error: err});
}

router
  .use(conn)

  .get('/', (req, res, next) => {
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
  })

  .get('/agregar', (req, res, next) => {
    res.render('add', {title: 'Agregar Contacto'});
  })

  .post('/', (req, res, next) => {
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
  })

  .get('/editar/:id', (req, res, next) => {
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
  })

  .post('/actualizar/:id', (req, res, next) => {
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
  })

  .post('/eliminar/:id', (req, res, next) => {
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
  })

  .use(error404);

module.exports = router;