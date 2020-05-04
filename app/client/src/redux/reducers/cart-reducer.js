import { TYPES } from '../types/types';

const initialState = {
  cart: [],
  totalPrice: 0,
  purchase: [],
  info: '',
  error: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TYPES.CART_ITEM_ADD_ASYNC:
      const { msg, cart } = action.payload;
      return {
        ...state,
        cart: cart.cart,
        totalPrice: cart.totalPrice,
        info: msg,
      };
    case TYPES.CART_ONE_ITEM_REMOVE_ASYNC: {
      const { msg, cart } = action.payload;
      return {
        ...state,
        cart: cart.cart,
        totalPrice: cart.totalPrice,
        info: msg,
      };
    }
    case TYPES.CART_ALL_ITEMS_OF_ONE_CATEGORY_REMOVE_ASYNC: {
      const { msg, cart } = action.payload;
      return {
        ...state,
        cart: cart.cart,
        totalPrice: cart.totalPrice,
        info: msg,
      };
    }
    case TYPES.CLEAR_CART:
      return {
        ...state,
        cart: action.payload.cart,
      };
    case TYPES.PURCHASE_CREATE_ASYNC:
      return {
        ...state,
        cart: action.payload.cart,
        info: action.payload.msg,
        purchase: action.payload.purchase,
      };
    case TYPES.CART_ITEM_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case TYPES.USER_LOGIN_ASYNC:
      return {
        ...state,
        cart: action.payload.cart,
        purchase: action.payload.history,
      };
    default:
      return state;
  }
}
