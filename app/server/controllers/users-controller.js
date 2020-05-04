const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../../config/keys');
const validatorRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const validateResetInput = require('../validation/reset');
const validatorUpdateProfileInput = require('../validation/update-profile');
const User = require('../models/user-model');
const Product = require('../models/product-model');
// const Payment = require('../models/payment-model');
const { errorHandler } = require('../../../handlers/errorHandlers');
const ObjectId = require('mongodb').ObjectID;
const cloudinary = require('cloudinary');
// const nodemailer = require('nodemailer');
// const regEmail = require('../emails/registration');
const uuid = require('../helpers/uuid');
const userCartCreator = require('../helpers/userCartCreator');

const { imageUrl, cloud_name, api_key, api_secret } = require('../../../config/keys');
cloudinary.config({ cloud_name, api_key, api_secret });

module.exports = {
  //@route GET api/users/test
  //@desc Get the test users route
  //@access Public
  async testRouter(req, res) {
    await res.json({ msg: 'Сообщение от тестового роута' });
  },

  //@route POST api/users/register
  //@desc Register users route
  //@access Public
  async makeARegister(req, res) {
    const { errors, isValid } = validatorRegisterInput(req.body);
    // console.log('errors: ', errors);
    if (!isValid) return res.status(400).json({ success: false, errors });

    const user = await User.findOne({ email: req.body.email });

    if (user) {
      errors.email = 'Email already using';
      return res.status(409).json({ success: false, errors });
    } else {
      const newUser = new User({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
      });
      try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newUser.password, salt);
        newUser.password = hash;
        const savedUser = await newUser.save();
        res.status(201).json({ success: true, savedUser, info: 'Registration is success!' });

        // const transporter = nodemailer.createTransport({
        //   service: 'Gmail',
        //   auth: {
        //     user: keys.emailFrom,
        //     pass: keys.emailPass,
        //   },
        // });
        // await transporter.sendMail(regEmail(req.body.name, req.body.lastname, req.body.email));
        // transporter.close();
      } catch (err) {
        errorHandler(res, err);
      }
    }
  },
  //@route POST api/users/login
  //@desc Login users route
  //@access Public
  async getLogin(req, res) {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
      return res.status(400).json({ success: false, errors });
    }

    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email });

    const { userCart, totalPriceFromDB } = await userCartCreator(user, Product);
    if (!user) {
      errors.email = 'Пользователь с таким емайл не найден';
      return res.status(404).json({ success: false, errors });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const jwtPayload = {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        totalPrice: totalPriceFromDB,
        history: user.history,
        isAdmin: user.role === 0 ? false : true,
        isAuth: true,
      };
      const token = await jwt.sign(jwtPayload, keys.secretOrKey, {
        expiresIn: 3600,
      });
      res.status(200).json({
        token: `Bearer ${token}`,
        cart: userCart,
        history: user.history,
      });
    } else {
      errors.password = 'Please check your data';
      return res.status(401).json({ success: false, errors });
    }
  },
  //@route POST api/users/basket
  //@desc POST add products to cart
  //@access Private
  async addToCart(req, res) {
    try {
      const prodId = req.body._id;
      let isDuplicateProduct = false;
      const user = await User.findOne({ _id: req.user._id });
      user.cart.forEach((item) => {
        //attention use ==
        if (item._id == prodId) {
          isDuplicateProduct = true;
        }
      });
      if (isDuplicateProduct) {
        const user = await User.findOneAndUpdate(
          { _id: req.user._id, 'cart._id': ObjectId(prodId) },
          { $inc: { 'cart.$.quantity': 1 } },
          { new: true }
        );

        const { userCart, totalPriceFromDB } = await userCartCreator(user, Product);

        res.status(201).send({ msg: 'Product added to car successful', cart: { cart: userCart, totalPrice: totalPriceFromDB } });
      } else {
        const user = await User.findByIdAndUpdate(
          { _id: req.user._id },
          {
            $push: {
              cart: {
                _id: ObjectId(prodId),
                quantity: 1,
                date: Date.now(),
              },
            },
          },
          { new: true }
        );
        const { userCart, totalPriceFromDB } = await userCartCreator(user, Product);
        res.status(201).send({ msg: 'Product added to car successful', cart: { cart: userCart, totalPrice: totalPriceFromDB } });
      }
    } catch (err) {
      errorHandler(res, err);
    }
  },

  //@route POST api/users/remove_one_item_from_cart
  //@desc POST remove one product from cart
  //@access Private
  async removeOneItemFromCart(req, res) {
    const prodId = req.body._id;
    try {
      let update = {
        $inc: { 'cart.$.quantity': -1 },
      };
      if (req.body.quantity === 1) {
        update = {
          $pull: { cart: { _id: ObjectId(prodId) } },
        };
      }
      const user = await User.findOneAndUpdate({ _id: req.user._id, 'cart._id': ObjectId(prodId) }, update, { new: true });
      const { userCart, totalPriceFromDB } = await userCartCreator(user, Product);
      res.status(201).send({ msg: 'Product removed from car successful', cart: { cart: userCart, totalPrice: totalPriceFromDB } });
    } catch (err) {
      errorHandler(res, err);
    }
  },

  //@route POST api/users/remove_all_items_of_one_category_from_cart
  //@desc POST remove all products of one category from cart
  //@access Private
  async removeAllItemsOfOneCateogryFromCart(req, res) {
    const prodId = req.body._id;
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $pull: { cart: { _id: ObjectId(prodId) } },
        },
        { new: true }
      );
      const { userCart, totalPriceFromDB } = await userCartCreator(user, Product);
      res.status(201).send({ msg: 'Product removed from car successful', cart: { cart: userCart, totalPrice: totalPriceFromDB } });
    } catch (err) {
      errorHandler(res, err);
    }
  },

  //@route POST api/users/remove_vart
  //@desc POST remove all products from cart
  //@access Private
  async removeCart(req, res) {
    try {
      const user = await User.findOneAndUpdate({ _id: req.user._id }, { $set: { cart: [] } }, { new: true });
      res.status(200).send({
        msg: 'All products removed from cart successful',
        user,
        userCart: user.cart,
      });
    } catch (err) {
      errorHandler(res, err);
    }
  },

  //@route POST api/users/buy
  //@desc POST products buy route
  //@access Private
  async productsBuy(req, res) {
    //user history
    const userHistory = req.body.map((item) => {
      return {
        _id: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        paymentId: uuid(),
        dateOfPurchase: item.date,
      };
    });
    //payments dash
    // const transactionData = {};
    // transactionData.user = {
    //   _id: req.user._id,
    //   name: req.user.name,
    //   lastname: req.user.lastname,
    //   email: req.user.email,
    // };
    // transactionData.payment = req.body.paymentData;
    // transactionData.products = userHistory;

    const update = {
      $push: { history: userHistory },
      cart: [],
    };

    try {
      const user = await User.findByIdAndUpdate({ _id: req.user._id }, update, { new: true });

      //   const payment = new Payment(transactionData);
      //   const savedPayment = await payment.save();

      //   const prodQuantity = savedPayment.products.map((item) => {
      //     return {
      //       _id: item._id,
      //       quantity: item.quantity,
      //     };
      //   });

      //   for await (const item of prodQuantity) {
      //     await Product.update({ _id: item._id }, { $inc: { sold: item.quantity } }, { new: false });
      //   }
      res.status(200).send({
        msg: 'Purchase is successful',
        cart: [],
        purchase: user.history,
      });
    } catch (err) {
      errorHandler(res, err);
    }
  },
  //@route POST api/users/reset_password
  //@desc Post Creare reset password route
  //@access Private
  async resetUser(req, res) {
    const { errors, isValid } = validateResetInput(req.body);
    if (!isValid) {
      return res.status(400).json({ success: false, errors });
    }

    const email = req.body.email;
    const user = await User.findOne({ email });

    if (!user) {
      errors.email = 'User with this old password does not exist.';
      return res.status(404).json({ success: false, errors });
    }

    const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);

    if (isMatch) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.newPassword, salt);
      user.password = hash;
      await User.findOneAndUpdate({ email }, { $set: user }, { new: true });
      try {
        return res.status(200).json({ success: true, msg: 'Your password is updated', user });
      } catch (err) {
        errorHandler(res, err);
      }
    } else {
      errors.oldPassword = 'Your old password is wrong! Please, check your old password.';
      return res.status(404).json({ success: false, errors });
    }
  },
  //@route POST api/users/uploadimage
  //@desc Post admin upload image
  //@access Private
  async uploadImage(req, res) {
    if (!req.files.length) {
      res.status(400).send({ msg: 'File is not published.' });
    }
    const uploadFile = req.files.file;
    const fileName = req.files.file.name;
    try {
      await uploadFile.mv(`${imageUrl}${fileName}`);
      result = await cloudinary.uploader.upload(`${imageUrl}${fileName}`);
      res.status(201).send({ publicId: result.public_id, url: result.url });
    } catch (err) {
      errorHandler(res, err);
    }
  },
  //@route GET api/users/removeimage
  //@desc GET admin remove image
  //@access Private
  async removeImage(req, res) {
    const imageId = req.query.public_id;
    try {
      await cloudinary.uploader.destroy(imageId);
      res.status(200).send({ msg: 'Image remove success' });
    } catch (err) {
      errorHandler(res, err);
    }
  },

  //@route PATCH api/users/update_profile
  //@desc Update users profile route
  //@access Private
  async updateProfile(req, res) {
    const { errors, isValid } = validatorUpdateProfileInput(req.body);
    if (!isValid)
      return res.status(400).json({
        msg: 'Your data not updated. Sorry. Try again later.',
        errors,
      });

    try {
      const user = await User.findOneAndUpdate({ _id: req.user._id }, { $set: req.body }, { new: true });
      res.status(200).json({
        newName: user.name,
        newLastName: user.lastname,
        newEmail: user.email,
      });
    } catch (err) {
      errorHandler(res, err);
    }
  },
};
