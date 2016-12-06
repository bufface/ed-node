'use strict';

const TeamModel = require('../models/team-model'),
  tm = new TeamModel();

class TeamController {
  getAll(req, res, next) {
    tm.getAll((docs) => {
      res.render('index', {
        title: 'Indentation War',
        data: docs
      });
    });
  }

  getOne(req, res, next) {
    let _id = req.params._id;

    tm.getOne(_id, (data) => {
      res.render('edit', {
        title: 'Editar Contacto',
        data: data
      });
    });
  }

  save(req, res, next) {
    let contacto = {
      _id: (req.body._id || null),
      name: req.body.name,
      twitter: req.body.twitter,
      country: req.body.country,
      side: req.body.side
    };

    tm.save(contacto, () => {res.redirect('/');});
  }

  delete(req, res, next) {
    let _id = req.params._id;

    tm.delete(_id, () => res.redirect('/') );
  }

  addForm(req, res, next) {
    res.render('add', {title: 'Agregar Contacto'});
  }
}

module.exports = TeamController;