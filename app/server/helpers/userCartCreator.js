const ObjectId = require('mongodb').ObjectID;

const userCartCreator = async (user, Product) => {
  let totalPriceFromDB = 0;
  const products = await Product.find({ _id: { $in: user.cart.map((cartItem) => ObjectId(cartItem._id)) } })
    .sort({ _id: -1 })
    .select({ images: 1, name: 1, price: 1 });

  if (user.cart.length) {
    const _temp = user.cart.map((item) => ({
      _id: item._id,
      quantity: item.quantity,
    }));

    const userCart = products
      .map((prod) => {
        return _temp.map((item) => {
          if (prod._id.toString() === item._id.toString()) {
            if (item.quantity === 0) {
              return;
            }
            return {
              _id: prod._id,
              img: prod.images,
              name: prod.name,
              price: prod.price,
              quantity: item.quantity,
              itemTotalPrice: prod.price * item.quantity,
            };
          }
        });
      })
      .flat()
      .filter((item) => item);

    if (userCart.length === 1) {
      totalPriceFromDB = userCart[0].itemTotalPrice;
    } else if (userCart.length > 1) {
      totalPriceFromDB = userCart.reduce((acc, cur) => acc + cur.itemTotalPrice, 0);
    } else {
      totalPriceFromDB = 0;
    }
    return { userCart, totalPriceFromDB };
  }
  return { userCart: [], totalPriceFromDB };
};

module.exports = userCartCreator;
