import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducers from './redux/reducers';
import rootSaga from './redux/root-saga/root-saga';

const initialState = {};
const sagaMiddleware = createSagaMiddleware();
const middleware = [ sagaMiddleware ];

const store = createStore(
  rootReducers,
  initialState,
  compose(
    applyMiddleware(...middleware)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

sagaMiddleware.run(rootSaga);

export default store;
