const express = require('express');
const router = express.Router();

const productController = require('../controllers/Product.controller');
const productValidate = require('../utils/Product.validate');

router.get('/', productController.getAll);
router.get('/do-create', productController.getCreate);
router.post('/create',productValidate.validateCreate, productController.create);
router.get('/do-edit', productController.getEdit);
router.post('/edit', productValidate.validateEdit, productController.edit);
router.get('/delete', productController.delete);
router.post('/search', productController.search);

module.exports = router;
