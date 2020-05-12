import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import './Slider.css';

const Slider = ({ popularProduct }) => {
  if (Object.keys(popularProduct).length) {
    return (
      <section className="slider">
        <div className="center slider__wrap">
          <div className="slider__left">
            <img src={popularProduct.image} alt="levis's" className="t-shirt" />
          </div>
          <div className="slider__right">
            <h2 className="slider__title">{popularProduct.name}</h2>
            <p className="slider__text">{popularProduct.description} </p>
            <Link
              to={{
                pathname: '/popular',
                state: popularProduct,
              }}
              className="main__btn btn"
            >
              shop now
            </Link>
          </div>
        </div>
      </section>
    );
  }
  return null;
};

Slider.propTypes = {
  popularProduct: PropTypes.object.isRequired,
};

export default Slider;
