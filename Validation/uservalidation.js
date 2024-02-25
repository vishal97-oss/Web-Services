const {body} = require('express-validator');
const { MinKey } = require('mongodb');

const carValidation = () => {
    return [
        body('Make').notEmpty().isString(),
        body('Model').notEmpty().isString(),
        body('Year').notEmpty().isInt(),
        body('Miles').notEmpty().isInt(),
        body('Drive').notEmpty().isString(),
        body('Engine').notEmpty().isString(),
        body('horsePower').notEmpty().isInt({min: 100, max: 500}),
    ];
};

module.exports = {carValidation};