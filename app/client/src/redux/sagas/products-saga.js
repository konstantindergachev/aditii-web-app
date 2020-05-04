import { call, put } from 'redux-saga/effects';
import api from '../../api';
import { TYPES } from '../types/types';

export function* receiveCategoriesFromDB() {
  try {
    const categories = yield call(api.products.fetchAllCategories);
    yield put({ type: TYPES.CATEGORIES_FETCH_ASYNC, payload: categories });
  } catch (err) {
    yield put({ type: TYPES.CATEGORIES_ERROR, error: err.message });
  }
}

export function* receiveFirstProductsOfEachCategoryFromDB() {
  try {
    const products = yield call(api.products.fetchFirstProductsOfEachCategory);
    yield put({
      type: TYPES.ONE_PRODUCTS_OF_EACH_CATEGORY_FETCH_ASYNC,
      payload: products,
    });
  } catch (err) {
    yield put({ type: TYPES.PRODUCTS_ERROR, error: err.message });
  }
}

export function* receiveAllProductsOfCategoryFromDB(dispatch) {
  try {
    const products = yield call(() =>
      api.products.fetchAllProductsOfCategory(dispatch.payload)
    );
    yield put({
      type: TYPES.ALL_PRODUCTS_OF_CATEGORY_FETCH_ASYNC,
      payload: { products, category: dispatch.payload },
    });
  } catch (err) {
    yield put({ type: TYPES.PRODUCTS_ERROR, error: err.message });
  }
}

export function* receiveProductsFromDB() {
  try {
    const products = yield call(api.products.fetchAllProducts);
    yield put({ type: TYPES.PRODUCTS_FETCH_ASYNC, payload: products });
  } catch (err) {
    yield put({ type: TYPES.PRODUCTS_ERROR, error: err.message });
  }
}
