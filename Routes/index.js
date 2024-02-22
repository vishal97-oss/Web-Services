const routes = require('express').Router();
const contactController = require('../control/personal');
// const mongodb = require('./DB/connect.js');


routes.post('/Cars', contactController.createcarInfo)

routes.put('/Cars/:id', contactController.updatecarinfo)

routes.get('/Cars/:id', contactController.getSingle )

routes.get('/Cars', contactController.getAll)

routes.use('/', require('./swagger'))

routes.delete('/Cars/:id', contactController.deleteContact)




module.exports = routes;