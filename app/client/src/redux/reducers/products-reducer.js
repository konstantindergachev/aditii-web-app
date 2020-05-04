import { TYPES } from '../types/types';
const initialState = {
  products: [],
  oneProductOfEachCategory: [],
  allProductsOfCategory: {
    handbags: [],
    accessories: [],
    mens_store: [],
    shoes: [],
    vintage: [],
    wallets: [],
  },
  error: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TYPES.ONE_PRODUCTS_OF_EACH_CATEGORY_FETCH_ASYNC:
      return {
        ...state,
        oneProductOfEachCategory: Array.isArray(action.payload) ? action.payload : [],
      };
    case TYPES.ALL_PRODUCTS_OF_CATEGORY_FETCH_ASYNC:
      switch (action.payload.category) {
        case 'handbags':
          return {
            ...state,
            allProductsOfCategory: { handbags: action.payload.products },
          };
        case 'accessories':
          return {
            ...state,
            allProductsOfCategory: { accessories: action.payload.products },
          };
        case 'mens_store':
          return {
            ...state,
            allProductsOfCategory: { mens_store: action.payload.products },
          };
        case 'shoes':
          return {
            ...state,
            allProductsOfCategory: { shoes: action.payload.products },
          };
        case 'vintage':
          return {
            ...state,
            allProductsOfCategory: { vintage: action.payload.products },
          };
        case 'wallets':
          return {
            ...state,
            allProductsOfCategory: { wallets: action.payload.products },
          };

        default:
          return state;
      }
    case TYPES.PRODUCTS_FETCH_ASYNC:
      return {
        ...state,
        products: action.payload,
      };
    case TYPES.PRODUCTS_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
