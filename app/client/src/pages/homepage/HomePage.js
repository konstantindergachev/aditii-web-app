import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Categories from '../../components/categories/Categories';
import Info from '../../components/info/Info';
import Slider from '../../components/slider/Slider';
import TapeSlider from '../../components/tape-slider/TapeSlider';
import { getActionCreator, receiveCategoryName, receiveFirstFourCategory } from '../../helpers';
import { allProductsOfCategoryReceiver } from '../../redux/actions/products-actions';
import './HomePage.css';

const HomePage = ({ oneProdOfEachCat, categories, popularProduct, allProductsOfCategoryReceiver, allProductsOfCategory }) => {
  const updOneProdOfEachCat = receiveCategoryName(oneProdOfEachCat, categories);
  const arrayOfCategories = receiveFirstFourCategory(updOneProdOfEachCat);
  return (
    <Fragment>
      <Slider popularProduct={popularProduct} />
      <TapeSlider
        arrayOfCategories={arrayOfCategories}
        allProductsOfCategoryReceiver={allProductsOfCategoryReceiver}
        getActionCreator={getActionCreator}
      />
      <Categories
        oneProdOfEachCat={updOneProdOfEachCat}
        allProductsOfCategoryReceiver={allProductsOfCategoryReceiver}
        getActionCreator={getActionCreator}
        allProductsOfCategory={allProductsOfCategory}
      />
      <Info
        popularProduct={popularProduct}
        oneProdOfEachCat={updOneProdOfEachCat}
        allProductsOfCategoryReceiver={allProductsOfCategoryReceiver}
        getActionCreator={getActionCreator}
        allProductsOfCategory={allProductsOfCategory}
      />
    </Fragment>
  );
};

HomePage.propTypes = {
  oneProdOfEachCat: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  popularProduct: PropTypes.object.isRequired,
  allProductsOfCategory: PropTypes.object.isRequired,
  allProductsOfCategoryReceiver: PropTypes.func.isRequired,
};

export default connect(null, { allProductsOfCategoryReceiver })(HomePage);
