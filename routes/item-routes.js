const router = require('express').Router();
const itemController = require('../controllers/item-controller');
// const validateRegister = require('../middlewares/validatorRegister');
const validateItem = require('../middlewares/validatorItem');
const { authentication, authorization } = require ('../middlewares/auth')
const multer = require ('../config/multer')

router.post('/create',authentication, authorization.seller,multer.array('image'),validateItem,itemController.createItem);
router.get('/',itemController.getAllItem);
router.get('/seller/:id',itemController.getItemBySellerID);
router.get('/:id',itemController.getItemByID);
router.put('/:id',authentication, authorization.seller,itemController.editItem);
router.delete('/:id',authentication, authorization.seller,itemController.deleteItem);

module.exports = router;