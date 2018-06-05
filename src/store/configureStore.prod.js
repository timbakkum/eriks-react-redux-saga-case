import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './../reducers';
import mySaga from './../sagas';

import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

const history = createHistory();
const routingMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Only add certain middlewares in dev
const middlewares = [routingMiddleware, sagaMiddleware];

const store = createStore(persistedReducer, applyMiddleware(...middlewares));
const persistor = persistStore(store);

sagaMiddleware.run(mySaga);

export default () => ({ store, persistor });
