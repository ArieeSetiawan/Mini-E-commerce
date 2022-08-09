const router = require('express').Router();
const orderController = require('../controllers/order-controller');
const { authentication, authorization } = require ('../middlewares/auth')

router.post('/',authentication, authorization.customer,orderController.createOrder);
router.get('/',authentication, authorization.customer,orderController.getAllOrderfromCustID);
router.get('/:id',authentication, authorization.customer,orderController.getOrderbyID);
router.put('/:id',authentication, authorization.customer,orderController.updateOrder);
router.delete('/:id',authentication, authorization.customer,orderController.deleteOrder);

module.exports = router