import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/button/Button';
import './Categories.css';

const Categories = ({ oneProdOfEachCat, allProductsOfCategoryReceiver, getActionCreator, allProductsOfCategory }) => {
  return (
    <section className="categories">
      <h2 className="categories__title">category of products</h2>
      <div className="categories__wrap">
        {oneProdOfEachCat.map((product) => (
          <Link
            to={`/${product.categoryName}`}
            key={product._id}
            className="category "
            onClick={() => {
              if (!Array.isArray(allProductsOfCategory[product.categoryName])) {
                getActionCreator(product.categoryName, allProductsOfCategoryReceiver);
              }
            }}
          >
            <img src={product.productImages[0].url} alt={product.productName} className="category__img" />
            <h3 className="category__title title">{product.categoryName}</h3>
            <span className="category__price price">${product.productPrice}</span>
            <Button type="button" text="buy now" classname="category__btn" />
          </Link>
        ))}
      </div>
    </section>
  );
};

Categories.propTypes = {
  oneProdOfEachCat: PropTypes.array.isRequired,
  allProductsOfCategoryReceiver: PropTypes.func.isRequired,
  getActionCreator: PropTypes.func.isRequired,
  allProductsOfCategory: PropTypes.object.isRequired,
};

export default Categories;
