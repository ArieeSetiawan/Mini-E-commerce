const router = require('express').Router();
const sellerController = require('../controllers/seller-controller');
const validateRegister = require('../middlewares/validatorRegister');
const validateLogin = require('../middlewares/validatorLogin');
const { authentication, authorization } = require ('../middlewares/auth')

router.post('/register',validateRegister,sellerController.register);
router.post('/login',validateLogin,sellerController.login);
router.get('/', authentication, authorization.seller,sellerController.getAllSeller);
router.get('/:id', authentication, authorization.seller, sellerController.getSellerbyID);
router.put('/:id',authentication, authorization.seller, sellerController.editSellerbyID);
router.delete('/:id', authentication, authorization.seller,sellerController.deleteSeller);

module.exports = router;