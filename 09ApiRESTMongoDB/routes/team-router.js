'use strict';

const TeamController = require('../controllers/team-controller'),
  tc = new TeamController(),
  express = require('express'),
  router = express.Router();

router
  .get('/', tc.getAll)
  .get('/agregar', tc.addForm)
  .post('/', tc.save)
  .get('/editar/:id', tc.getOne)
  .put('/actualizar/:id', tc.save)
  .delete('/eliminar/:id', tc.delete)
  .use(tc.error404);

module.exports = router;