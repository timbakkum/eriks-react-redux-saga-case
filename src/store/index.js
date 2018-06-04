import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './../reducers';
import mySaga from './../sagas';

import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

const history = createHistory();
const routingMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

// Only add certain middlewares in dev
const middlewares =
  process.env.NODE_ENV !== 'production'
    ? [
        require('redux-immutable-state-invariant').default(),
        routingMiddleware,
        sagaMiddleware
      ]
    : [routingMiddleware, sagaMiddleware];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(mySaga);

export default store;
