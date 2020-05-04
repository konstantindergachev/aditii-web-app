const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../../config/keys');
const validatorRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const Category = require('../models/category-model');
const Product = require('../models/product-model');
const ObjectId = require('mongodb').ObjectID;
const { errorHandler } = require('../../../handlers/errorHandlers');

module.exports = {
  //@route GET api/products/test
  //@desc Get the test products route
  //@access Public
  async testCategorysRouter(req, res) {
    return await res.json({ msg: 'Сообщение от тестового роута categorys' });
  },

  //@route POST api/products/category
  //@desc Create the category
  //@access Private
  async createCategory(req, res) {
    try {
      const newCategory = new Category({ name: req.body.name });
      await newCategory.save();
      res.status(201).json({ msg: 'Торговая марка успешно создана' });
    } catch (err) {
      errorHandler(res, err);
    }
  },
  //@route GET api/products/category?offset=2&limit=5
  //@desc Get all the categorys
  //@access Private
  async getAllCategories(req, res) {
    try {
      const popularProduct = Product.find({}).sort({ sold: -1 }).limit(1);
      const categories = Category.aggregate([
        { $sort: { sold: 1 } },
        {
          $group: {
            _id: '$_id',
            name: { $first: '$name' },
          },
        },
      ]);
      const [ product, cats ] = await Promise.all([ popularProduct, categories ]);
      res.status(200).json({
        cats,
        popularProduct: {
          _id: product[0]._id,
          image: product[0].images[0].url,
          name: product[0].name,
          description: product[0].description,
          sold: product[0].sold,
        },
      });
    } catch (err) {
      errorHandler(res, err);
    }
  },
};
