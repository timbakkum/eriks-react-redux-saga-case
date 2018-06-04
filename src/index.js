import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import './index.css';

import ProductOverview from './components/products/ProductOverview';
import ProductDetail from './components/products/ProductDetail';
import Navigation from './components/navigation/Navigation';

import registerServiceWorker from './registerServiceWorker';

const history = createHistory();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <React.Fragment>
        <Navigation />
        <Route exact path="/" component={ProductOverview} />
        <Route path="/product/:id" component={ProductDetail} />
      </React.Fragment>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
