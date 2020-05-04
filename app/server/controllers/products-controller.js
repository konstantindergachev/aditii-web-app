const Category = require('../models/category-model');
const Product = require('../models/product-model');
const ObjectId = require('mongodb').ObjectID;

const { errorHandler } = require('../../../handlers/errorHandlers');

module.exports = {
  //@route GET api/products/test
  //@desc Get the test products route
  //@access Public
  async testProductsRouter(req, res) {
    return await res.json({ msg: 'Сообщение от тестового роута products!' });
  },
  //@route GET api/products
  //@desc Get all products
  //@access Public
  async getAllProducts(req, res) {
    try {
      const products = await Product.find().populate('category');
      res.status(200).json(products);
    } catch (err) {
      errorHandler(res, err);
    }
  },
  //@route GET api/products/first-products
  //@desc Get first product of each category
  //@accessPublic
  async getFirstProductOfEachCategory(req, res) {
    try {
      const products = await Product.aggregate([
        { $sort: { category: 1 } },
        {
          $group: {
            _id: '$category',
            productName: { $first: '$name' },
            productPrice: { $first: '$price' },
            productImages: { $first: '$images' },
          },
        },
      ]);
      res.status(200).json(products);
    } catch (err) {
      errorHandler(res, err);
    }
  },
  //@route GET api/products/handbags
  //@desc Get collection of handbags
  //@accessPublic
  async getAllProductsOfCategory(req, res) {
    try {
      const category = await Category.findOne({ name: req.query.categoryName });
      const products = await Product.find({ category: category._id });
      res.status(200).json(products);
    } catch (err) {
      errorHandler(res, err);
    }
  },
  //@route POST api/products/product
  //@desc Create the product route
  //@access Private
  async createProduct(req, res) {
    try {
      const newArticle = new Product(req.body);
      const savedArticle = await newArticle.save();
      res
        .status(201)
        .json({ msg: 'Product is created successful', article: savedArticle });
    } catch (err) {
      errorHandler(res, err);
    }
  },

  //@route GET api/products/product
  //@desc GET products by id for product cart route
  //@access Private
  async getProductsById(req, res) {
    let type = req.query.type;
    let ids = req.query._id;
    if (type === 'array') {
      let tempIds = req.query._id.split(',');
      ids = [];
      ids = tempIds.map((id) => ObjectId(id));
    }
    try {
      const articles = await Product.find({ _id: { $in: ids } }).populate([
        'brand',
        'wood',
      ]);
      res.status(200).json(articles);
    } catch (err) {
      errorHandler(res, err);
    }
  },
};
