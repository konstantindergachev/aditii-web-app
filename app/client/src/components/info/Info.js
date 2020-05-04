import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { contacts, information, store } from '../../helpers/info-items';
import './Info.css';

const Info = ({ popularProduct, oneProdOfEachCat, allProductsOfCategoryReceiver, getActionCreator, allProductsOfCategory }) => {
  return (
    <section className="information">
      <div className="list__wrap center">
        <div className="list">
          <h2 className="list__title title">information</h2>
          <ul className="list__list">
            {Object.entries(information).map(([ key, val ]) => (
              <li key={key} className="list__item">
                <Link to={key}>{val}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="list">
          <h2 className="list__title title">store</h2>
          <ul className="list__list">
            {Object.entries(store).map(([ key, val ]) => (
              <li key={key} className="list__item">
                {!Object.keys(popularProduct).length ? (
                  <Link to={key}>{val}</Link>
                ) : (
                  <Link
                    to={{
                      pathname: key,
                      state: popularProduct,
                    }}
                  >
                    {val}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="list">
          <h2 className="list__title title">collections</h2>
          <ul className="list__list">
            {oneProdOfEachCat.map((product) => (
              <li key={product._id} className="list__item">
                <Link
                  to={`/${product.categoryName}`}
                  onClick={() => {
                    if (!Array.isArray(allProductsOfCategory[product.categoryName])) {
                      getActionCreator(product.categoryName, allProductsOfCategoryReceiver);
                    }
                  }}
                >
                  {product.categoryName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="list">
          <h2 className="list__title title">contacts</h2>
          <ul className="list__list">
            {Object.entries(contacts).map(([ key, val ]) => (
              <li key={key} className="list__item">
                {key}: {val}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

Info.propTypes = {
  popularProduct: PropTypes.object.isRequired,
  oneProdOfEachCat: PropTypes.array.isRequired,
  allProductsOfCategory: PropTypes.object.isRequired,
  allProductsOfCategoryReceiver: PropTypes.func.isRequired,
  getActionCreator: PropTypes.func.isRequired,
};

export default Info;
