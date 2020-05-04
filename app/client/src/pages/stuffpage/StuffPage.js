import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../components/ui/spinner/Spinner';
import './StuffPage.css';

const StuffPage = ({ allProductsOfCategory, categoryName }) => {
  const renderCollection = (stuff, categoryName) => {
    if (stuff.hasOwnProperty(categoryName) && Array.isArray(stuff[categoryName])) {
      return stuff[categoryName].map((item) => (
        <Link
          to={{
            pathname: `/${categoryName}/${item._id}`,
            state: {
              _id: item._id,
              img: item.images[0].url,
              name: item.name,
              description: item.description,
              price: item.price,
              available: item.available,
              shipping: item.shipping,
            },
          }}
          key={item._id}
          className="category"
        >
          <img src={item.images[0].url} alt={item.name} className="category__img" />
          <h3 className="category__title title">{item.name}</h3>
          <span className="category__price price">${item.price}</span>
          <button className="category__btn btn">details</button>
        </Link>
      ));
    } else {
      return <Spinner />;
    }
  };

  return (
    <section className={`stuff ${categoryName}`}>
      <h2 className="categories__title categories__title-category">{categoryName}</h2>
      <div className="categories__wrap">{renderCollection(allProductsOfCategory, categoryName)}</div>
    </section>
  );
};

StuffPage.propTypes = {
  allProductsOfCategory: PropTypes.object.isRequired,
  categoryName: PropTypes.string.isRequired,
};

export default StuffPage;
