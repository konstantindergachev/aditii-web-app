import { call, put } from 'redux-saga/effects';
import api from '../../api';
import { TYPES } from '../types/types';

export function* saveAddCartItemToDB(payload) {
  const { payload: pl } = payload;
  const cartItem = { _id: pl.cartItem._id, quantity: pl.cartItem.quantity };
  try {
    const cartItemFromDB = yield call(api.cart.addToCart, cartItem, pl.token);
    yield put({ type: TYPES.CART_ITEM_ADD_ASYNC, payload: cartItemFromDB });
  } catch (err) {
    yield put({ type: TYPES.CART_ITEM_ERROR, error: err.message });
  }
}

export function* removeOneCartItemFromDB(payload) {
  const { payload: pl } = payload;
  const cartItem = { _id: pl.cartItem._id, quantity: pl.cartItem.quantity };
  try {
    const cartItemFromDB = yield call(api.cart.removeOneItemFromCart, cartItem, pl.token);
    yield put({ type: TYPES.CART_ONE_ITEM_REMOVE_ASYNC, payload: cartItemFromDB });
  } catch (err) {
    yield put({ type: TYPES.CART_ITEM_ERROR, error: err.message });
  }
}

export function* removeAllCartItemsOfOneCategoryFromDB(payload) {
  const { payload: pl } = payload;
  const cartItem = { _id: pl.cartItem._id, quantity: pl.cartItem.quantity };
  try {
    const cartItemFromDB = yield call(api.cart.removeAllItemsOfOneCategoryFromCart, cartItem, pl.token);
    yield put({ type: TYPES.CART_ALL_ITEMS_OF_ONE_CATEGORY_REMOVE_ASYNC, payload: cartItemFromDB });
  } catch (err) {
    yield put({ type: TYPES.CART_ITEM_ERROR, error: err.message });
  }
}

export function* clearCartFromDB(payload) {
  const { payload: pl } = payload;
  try {
    const cartFromDB = yield call(api.cart.clearCart, pl.token);
    yield put({ type: TYPES.CLEAR_CART_ASYNC, payload: cartFromDB });
  } catch (err) {
    yield put({ type: TYPES.CLEAR_CART_ERROR, error: err.message });
  }
}

export function* savePurchaseToDB(payload) {
  try {
    const purchaseFromDB = yield call(api.cart.makeAPurchase, payload);
    yield put({ type: TYPES.PURCHASE_CREATE_ASYNC, payload: purchaseFromDB });
  } catch (err) {
    yield put({ type: TYPES.PURCHASE_ERROR, error: err.message });
  }
}
