import { takeLatest } from 'redux-saga/effects';
import {
  clearCartFromDB,
  removeAllCartItemsOfOneCategoryFromDB,
  removeOneCartItemFromDB,
  saveAddCartItemToDB,
  savePurchaseToDB,
} from '../sagas/cart-saga';
import {
  receiveAllProductsOfCategoryFromDB,
  receiveCategoriesFromDB,
  receiveFirstProductsOfEachCategoryFromDB,
  receiveProductsFromDB,
} from '../sagas/products-saga';
import { receiveUserFromDB, saveNewUserToDB } from '../sagas/users-saga';
import { TYPES } from '../types/types';

export default function* rootSaga() {
  yield takeLatest(TYPES.USER_REGISTER, saveNewUserToDB);
  yield takeLatest(TYPES.USER_LOGIN, receiveUserFromDB);
  yield takeLatest(TYPES.CATEGORIES_FETCH, receiveCategoriesFromDB);
  yield takeLatest(TYPES.ONE_PRODUCTS_OF_EACH_CATEGORY_FETCH, receiveFirstProductsOfEachCategoryFromDB);
  yield takeLatest(TYPES.ALL_PRODUCTS_OF_CATEGORY_FETCH, receiveAllProductsOfCategoryFromDB);
  yield takeLatest(TYPES.PRODUCTS_FETCH, receiveProductsFromDB);
  yield takeLatest(TYPES.CART_ITEM_ADD, saveAddCartItemToDB);
  yield takeLatest(TYPES.CART_ONE_ITEM_REMOVE, removeOneCartItemFromDB);
  yield takeLatest(TYPES.CART_ALL_ITEMS_OF_ONE_CATEGORY_REMOVE, removeAllCartItemsOfOneCategoryFromDB);
  yield takeLatest(TYPES.CLEAR_CART, clearCartFromDB);
  yield takeLatest(TYPES.PURCHASE_CREATE, savePurchaseToDB);
}
