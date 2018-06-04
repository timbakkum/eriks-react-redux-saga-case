import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './store';

import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import ProductOverview from './components/products/ProductOverview';
import ProductDetail from './components/products/ProductDetail';
import Navigation from './components/navigation/Navigation';

import registerServiceWorker from './registerServiceWorker';
import './index.css';

const { store, persistor } = configureStore();
const history = createHistory();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <Fragment>
          <Navigation />
          <Route exact path="/" component={ProductOverview} />
          <Route path="/product/:id" component={ProductDetail} />
        </Fragment>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
