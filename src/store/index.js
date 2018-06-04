import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './../reducers';
import mySaga from './../sagas';

import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

const history = createHistory();
const middleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(middleware, sagaMiddleware)
);

sagaMiddleware.run(mySaga);

export default store;
