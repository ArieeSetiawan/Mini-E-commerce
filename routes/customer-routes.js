const router = require('express').Router();
const customerController = require('../controllers/customer-controller');
const validateRegister = require('../middlewares/validatorRegister');
const validateLogin = require('../middlewares/validatorLogin');
const { authentication, authorization } = require ('../middlewares/auth')

router.post('/register',validateRegister,customerController.register);
router.post('/login',validateLogin,customerController.login);
router.get('/', authentication, authorization.customer,customerController.getAllCustomer);
router.get('/:id', authentication, authorization.customer, customerController.getCustomerbyID);
router.put('/:id',authentication, authorization.customer, customerController.editCustomerbyID);
router.delete('/:id', authentication, authorization.customer,customerController.deleteCustomer);

module.exports = router;