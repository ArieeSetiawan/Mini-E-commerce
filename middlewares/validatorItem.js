const {check, validationResult} = require ('express-validator');
const fs = require ('fs');

const rules = [
    check('title')
    .notEmpty().withMessage('Title cannot be Empty')
    .bail(),
    check('price')
    .notEmpty().withMessage('Price cannot be Empty')
    .isFloat({min:100, max: 100000000}).withMessage('Price Range between IDR 100 to IDR 100.000.000')
    .bail(),
    check('stock')
    .notEmpty().withMessage('Quantity cannot be Empty')
    .isFloat({min:1, max: 10000}).withMessage('Quantity Range between 1 to 10.000')
    .bail(),
];

const validateItem = [
    rules,
    (req,res,next)=>{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            fs.unlinkSync(req.files[0].path)
            return res.status(422).json({errors: errors.array()})
        }
        next();
    }
];

module.exports = validateItem;