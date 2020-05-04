const express = require('express');
const passport = require('passport');
const router = express.Router();

const {
  createCategory,
  getAllCategories,
} = require('../../controllers/categories-controller');

const {
  getFirstProductOfEachCategory,
  getAllProductsOfCategory,
  createProduct,
  getAllProducts,
} = require('../../controllers/products-controller');

router.get('/categories', getAllCategories);
router.get('/first-product-of-each-category', getFirstProductOfEachCategory);
router.get('/', getAllProducts);
router.post('/create-category', createCategory);
router.post('/create-product', createProduct);
router.get('/category', getAllProductsOfCategory);
router.get('/', getAllProducts);

module.exports = router;
