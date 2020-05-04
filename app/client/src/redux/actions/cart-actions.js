import { TYPES } from '../types/types';

export const cartItemReceiver = (cartItem, token) => {
  return {
    type: TYPES.CART_ITEM_ADD,
    payload: { cartItem, token },
  };
};

export const cartOneItemRemover = (cartItem, token) => {
  return {
    type: TYPES.CART_ONE_ITEM_REMOVE,
    payload: { cartItem, token },
  };
};
export const cartAllItemsOfOneCategoryRemover = (cartItem, token) => {
  return {
    type: TYPES.CART_ALL_ITEMS_OF_ONE_CATEGORY_REMOVE,
    payload: { cartItem, token },
  };
};
export const cartCleaner = (token) => {
  const cart = [];
  return {
    type: TYPES.CLEAR_CART,
    payload: { cart, token },
  };
};

export const makeAPurchase = (purchase, token) => {
  return {
    type: TYPES.PURCHASE_CREATE,
    payload: { purchase, token },
  };
};
