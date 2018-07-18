var express = require('express');
var router = express.Router();
var productController = require('../controller/product');
var authConttoller = require('../controller/auth');

router.get('/search/:cat',productController.getCatProduct);
router.get('/searchAll/:cat',productController.getSearchProduct);
router.get('/top/:topSearch',productController.getTopProduct);
router.post('/', productController.createProduct);
router.post('/:id', productController.updateProduct);
router.patch('/:id', productController.updateProduct2);
router.get('/:id', productController.getProduct);
router.get('/', productController.getAllProduct);
//router.patch('/:id', productController.updateProduct);
router.delete('/:id', authConttoller.userAuthenticate, productController.deleteProduct);

module.exports = router;