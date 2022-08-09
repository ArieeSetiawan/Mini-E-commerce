const router = require('express').Router();
const userController = require('../controllers/user-controller');
const validateUserRegister = require('../middlewares/validatorUserRegister');
const validateLogin = require('../middlewares/validatorLogin');
const { authentication, authorization } = require ('../middlewares/auth')

router.post('/register',validateUserRegister,userController.register);
router.post('/login',validateLogin,userController.login);
router.get('/',authentication, authorization.admin, userController.getAllUser);
router.get('/:id',authentication, authorization.admin, userController.getUserbyID);
router.put('/:id',authentication, authorization.admin, userController.editUserbyID);
router.delete('/:id',authentication, authorization.admin, userController.deleteUser);

module.exports = router;