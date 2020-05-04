import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartItemReceiver } from '../../redux/actions/cart-actions';
import './ProductDetail.css';

class ProductDetail extends Component {
  state = {
    _id: '',
    img: '',
    name: '',
    description: '',
    price: '',
    available: false,
    shipping: false,
  };

  static getDerivedStateFromProps(props, state) {
    const { location: { state: st } } = props;
    if (st) {
      return {
        _id: st._id,
        img: st.img,
        name: st.name,
        description: st.description,
        price: st.price,
        available: st.available,
        shipping: st.shipping,
      };
    }
    return null;
  }

  render() {
    const { cartItemReceiver, token } = this.props;
    const QUANTYTI = 1;
    const { _id, img, name, description, price, available, shipping } = this.state;

    return (
      <section className="product">
        <h2 className="product__title title">{name}</h2>
        <img src={img} alt={name} className="product__img" />
        <p className="product__description ">{description}</p>
        <div className="product__price price">
          Price: <span>$ {price}</span>
        </div>
        <div className="product__available ">
          In strock: <span>{!available ? 'not available' : 'available'}</span>
        </div>
        <div className="product__shipping">
          Delivery: <span>{!shipping ? 'no shipping' : 'shipping'}</span>
        </div>
        <Link
          to={{
            pathname: '/cart',
          }}
          className="product__btn btn"
          onClick={() => cartItemReceiver({ _id, img, name, price, quantity: QUANTYTI }, token)}
        >
          buy now
        </Link>
      </section>
    );
  }
}

ProductDetail.propTypes = {
  location: PropTypes.object.isRequired,
  cartItemReceiver: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.users.token,
});

export default connect(mapStateToProps, { cartItemReceiver })(ProductDetail);
