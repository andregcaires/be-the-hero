const express = require('express');

const institutionController = require('./controllers/institution-controller');
const incidentController = require('./controllers/incident-controller');
const profileController = require('./controllers/profile-controller');
const sessionController = require('./controllers/session-controller');

const routes = express.Router();

routes.post('/institutions', institutionController.create);
routes.get('/institutions', institutionController.select);

routes.post('/incidents', incidentController.create);
routes.get('/incidents', incidentController.select);
routes.delete('/incidents:id', incidentController.delete);

routes.get('/profile', profileController.select);
routes.post('/sessions', sessionController.create);

module.exports = routes;