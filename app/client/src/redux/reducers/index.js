import { combineReducers } from 'redux';
import cartReducer from './cart-reducer';
import categoriesReducer from './categories-reducer';
import productsReducer from './products-reducer';
import usersReducer from './users-reducer';

export default combineReducers({
  users: usersReducer,
  products: productsReducer,
  categories: categoriesReducer,
  carts: cartReducer,
});
