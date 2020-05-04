import PropTypes from 'prop-types';
import React from 'react';
import './PopularPage.css';

const PopularPage = ({ location: { state: { image, name, description, sold } } }) => {
  return (
    <section className="popular">
      <div className="popular__wrapper">
        <h2 className="popular__title title">{name}</h2>
        <img src={image} alt={name} className="popular__img" />
        <p className="popular__description ">{description}</p>
        <div className="popular__sold">
          Sold: <span>{sold}</span>
        </div>
      </div>
    </section>
  );
};

PopularPage.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  sold: PropTypes.number,
};

export default PopularPage;
