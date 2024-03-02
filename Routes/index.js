const routes = require('express').Router();
const contactController = require('../control/personal');
// const mongodb = require('./DB/connect.js');
const {carValidation} = require('../Validation/uservalidation');
const { requiresAuth } = require('express-openid-connect');


routes.post('/Cars', requiresAuth() , carValidation(), contactController.createcarInfo)

routes.put('/Cars/:id' ,requiresAuth(), carValidation(), contactController.updatecarinfo)

routes.get('/Cars/:id',requiresAuth(), contactController.getSingle )

routes.get('/Cars',requiresAuth(), contactController.getAll)

routes.use('/', require('./swagger'))

routes.delete('/Cars/:id', requiresAuth(), contactController.deleteContact)

routes.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).send({msg: 'Login Require'});
    }
    next(err, req, res);
});


module.exports = routes;