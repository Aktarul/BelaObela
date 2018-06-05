var express = require('express');
var router = express.Router();
var orderController = require('../controller/order');
var authConttoller = require('../controller/auth');

router.post('/', orderController.createOrder);
router.get('/', orderController.getAllOrder);
// router.delete('/:id', authConttoller.userAuthenticate, productController.deleteProduct);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;