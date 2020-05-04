import PropTypes from 'prop-types';
import React from 'react';
import './CartItem.css';

const CartItem = ({ cart, removeItem, incrementCartItem, decrementCartItem }) => {
  return (
    <tbody>
      {cart.map((product) => (
        <tr key={product._id}>
          <td className="cart__item">
            <div className="cart__image">
              <img src={product.img[0].url} alt={product.name} />
            </div>
          </td>
          <td className="cart__item">{product.name}</td>
          <td className="cart__item">
            <span onClick={() => decrementCartItem(product)}>&#10094;</span>
            {product.quantity}
            <span onClick={() => incrementCartItem(product)}>&#10095;</span>
          </td>
          <td className="cart__item">$ {product.price}</td>
          <td className="cart__item">
            <div className="cart__remove-btn" onClick={() => removeItem(product)}>
              &#10006;
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

CartItem.propTypes = {
  cart: PropTypes.oneOfType([ PropTypes.array.isRequired, PropTypes.object.isRequired ]),
  removeItem: PropTypes.func.isRequired,
  incrementCartItem: PropTypes.func.isRequired,
  decrementCartItem: PropTypes.func.isRequired,
};

export default CartItem;
