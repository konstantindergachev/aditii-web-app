const express = require('express');
const passport = require('passport');
const fileUpload = require('express-fileupload');
const router = express.Router();
const {
  testRouter,
  makeARegister,
  getLogin,
  uploadImage,
  removeImage,
  addToCart,
  removeOneItemFromCart,
  removeAllItemsOfOneCateogryFromCart,
  removeCart,
  productsBuy,
  updateProfile,
  resetUser,
} = require('../../controllers/users-controller');

router.get('/test', testRouter);
router.post('/register', makeARegister);
router.post('/login', getLogin);
router.post('/cart', passport.authenticate('jwt', { session: false }), addToCart);
router.post('/remove_one_item_from_cart', passport.authenticate('jwt', { session: false }), removeOneItemFromCart);
router.post(
  '/remove_all_items_of_one_category_from_cart',
  passport.authenticate('jwt', { session: false }),
  removeAllItemsOfOneCateogryFromCart
);
router.get('/remove_cart', passport.authenticate('jwt', { session: false }), removeCart);
router.post('/buy', passport.authenticate('jwt', { session: false }), productsBuy);
router.use(fileUpload());
router.post('/uploadimage', passport.authenticate('jwt', { session: false }), uploadImage);
router.get('/removeimage', passport.authenticate('jwt', { session: false }), removeImage);
router.patch('/update_profile', passport.authenticate('jwt', { session: false }), updateProfile);
router.post('/reset_user', resetUser);

module.exports = router;
