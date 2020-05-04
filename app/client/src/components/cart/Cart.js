import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  cartAllItemsOfOneCategoryRemover,
  cartCleaner,
  cartItemReceiver,
  cartOneItemRemover,
  makeAPurchase,
} from '../../redux/actions/cart-actions';
import Button from '../ui/button/Button';
import Message from '../ui/message/Message';
import CartItem from './cart-item/CartItem';
import './Cart.css';

class Cart extends Component {
  clearCart = () => {
    const { token, cartCleaner } = this.props;
    cartCleaner(token);
  };
  handleRemove = (product) => {
    const { token, cartAllItemsOfOneCategoryRemover } = this.props;
    cartAllItemsOfOneCategoryRemover(product, token);
  };

  incrementCartItem = ({ itemTotalPrice, ...product }) => {
    const { token, cartItemReceiver } = this.props;
    cartItemReceiver(product, token);
  };
  decrementCartItem = (product) => {
    const { token, cartOneItemRemover } = this.props;
    cartOneItemRemover(product, token);
  };

  handlePurchase = (cart) => {
    const { token, makeAPurchase } = this.props;

    const updCart = cart.map((item) => ({
      _id: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      date: Date.now(),
    }));
    makeAPurchase(updCart, token);
  };

  render() {
    const { isAuth, cart, totalPrice, info } = this.props;
    return (
      <section className="cart">
        {isAuth && cart.length ? (
          <div className="cart__wrapper">
            <table>
              <thead>
                <tr>
                  <th>Product image</th>
                  <th>Product name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <CartItem
                type="cart"
                cart={cart}
                removeItem={this.handleRemove}
                incrementCartItem={this.incrementCartItem}
                decrementCartItem={this.decrementCartItem}
              />
            </table>
            <h3 className="cart__total-price">
              Total: <span>{totalPrice}</span>
            </h3>
            {isAuth ? (
              <div className="cart__btn-wrapper">
                <Button type="button" text="clear cart" classname="clear__btn" eventHandler={this.clearCart} />
                <Button type="button" text="buy" classname="buy__btn" eventHandler={() => this.handlePurchase(cart)} />
              </div>
            ) : (
              <Message msg="You need to authorized to make a purchase!" classname="msg__warning" />
            )}
          </div>
        ) : isAuth && !cart.length && info ? (
          <Message msg={info} classname="msg__info" />
        ) : isAuth && !cart.length && !info ? (
          <Message msg="Your cart is empty. You need to make a purchase!" classname="msg__warning" />
        ) : (
          <Message msg="You need to authorized!" classname="msg__warning" />
        )}
      </section>
    );
  }
}

Cart.propTypes = {
  isAuth: PropTypes.bool,
  cart: PropTypes.oneOfType([ PropTypes.number.isRequired, PropTypes.array.isRequired ]),
  totalPrice: PropTypes.number,
  token: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  cartItemReceiver: PropTypes.func.isRequired,
  cartOneItemRemover: PropTypes.func.isRequired,
  cartAllItemsOfOneCategoryRemover: PropTypes.func.isRequired,
  cartCleaner: PropTypes.func.isRequired,
  makeAPurchase: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { users, carts } = state;
  return {
    isAuth: users.user.isAuth,
    cart: carts.cart.length ? carts.cart : 0,
    totalPrice: !carts.totalPrice ? users.user.totalPrice : carts.totalPrice,
    token: users.token,
    info: carts.info,
  };
};

export default connect(mapStateToProps, {
  cartItemReceiver,
  cartOneItemRemover,
  cartAllItemsOfOneCategoryRemover,
  cartCleaner,
  makeAPurchase,
})(Cart);
