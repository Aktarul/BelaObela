var express = require('express');
var router = express.Router();
var categoryController = require('../controller/subCategory');
var authConttoller = require('../controller/auth');

router.post('/', categoryController.createSubCategory);
// router.patch('/:id', categoryController.updatecategory);
router.get('/:id', categoryController.getSubCategory);
router.get('/', categoryController.getAllSubCategory);
// router.patch('/:id', categoryController.updateSubCategory);
// router.delete('/:id', authConttoller.userAuthenticate, categoryController.deletecategory);
router.delete('/:id', categoryController.deleteSubCategory);

module.exports = router;