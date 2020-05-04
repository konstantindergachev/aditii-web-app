import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import './TapeSlider.css';

const TapeSlider = ({ arrayOfCategories, allProductsOfCategoryReceiver, getActionCreator }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 690,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const renderSlides = (slides) => {
    return slides.map((slide) => {
      return (
        <div key={slide.id} className="tape-slider__item">
          <div className="tape-slider__wrap">
            <img src={slide.img} alt="branded shoes" className="tape-slider__img" />
            <h2 className="title tape-slider__title">branded {slide.category}</h2>
            <Link
              to={`/${slide.category}`}
              className="tape-slider__btn btn"
              onClick={() => getActionCreator(slide.category, allProductsOfCategoryReceiver)}
            >
              shop
            </Link>
          </div>
        </div>
      );
    });
  };

  return (
    <section className="tape-slider">
      <Slider {...settings}>{renderSlides(arrayOfCategories)}</Slider>
    </section>
  );
};

TapeSlider.propTypes = {
  arrayOfCategories: PropTypes.array.isRequired,
  allProductsOfCategoryReceiver: PropTypes.func.isRequired,
  getActionCreator: PropTypes.func.isRequired,
};

export default TapeSlider;
