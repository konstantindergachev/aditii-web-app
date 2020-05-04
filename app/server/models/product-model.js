const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    unique: 1,
    maxlength: 100,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    maxlength: 100000,
    required: true,
  },
  price: {
    type: Number,
    maxlength: 255,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'categories',
    required: true,
  },
  shipping: {
    type: Boolean,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
  sold: {
    type: Number,
    maxlength: 100,
    default: 0,
  },
  publish: {
    type: Boolean,
    required: true,
  },
  images: { type: Array, default: [] },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Product = mongoose.model('products', ProductSchema);
