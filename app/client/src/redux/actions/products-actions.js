import { TYPES } from '../types/types';

export const categoriesReceiver = (categories) => {
  return {
    type: TYPES.CATEGORIES_FETCH,
    payload: categories,
  };
};

export const oneProductsOfEachCategoryReceiver = (products) => {
  return {
    type: TYPES.ONE_PRODUCTS_OF_EACH_CATEGORY_FETCH,
    payload: products,
  };
};

export const allProductsOfCategoryReceiver = (categoryName) => {
  return {
    type: TYPES.ALL_PRODUCTS_OF_CATEGORY_FETCH,
    payload: categoryName,
  };
};

export const productsReceiver = (products) => {
  return {
    type: TYPES.PRODUCTS_FETCH,
    payload: products,
  };
};
