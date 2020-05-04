import { TYPES } from '../types/types';
const initialState = {
  categories: [],
  popularProduct: {},
  error: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TYPES.CATEGORIES_FETCH_ASYNC:
      return {
        ...state,
        categories: Array.isArray(action.payload.cats) ? action.payload.cats : [],
        popularProduct: Object.keys(action.payload.popularProduct) ? action.payload.popularProduct : {},
      };
    case TYPES.CATEGORIES_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
