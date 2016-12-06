'use strict';

const TeamController = require('../controllers/team-controller'),
  tc = new TeamController(),
  express = require('express'),
  router = express.Router();

router
  .get('/teams', tc.getAll)
  .get('/agregar', tc.addForm)
  .post('/teams', tc.save)
  .get('/editar/:_id', tc.getOne)
  .put('/actualizar/:_id', tc.save)
  .delete('/eliminar/:_id', tc.delete);

module.exports = router;