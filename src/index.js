import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './store/configureStore';

import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import ProductOverview from './components/products/ProductOverview';
import ProductDetail from './components/products/ProductDetail';
import Navigation from './components/navigation/Navigation';

import registerServiceWorker from './registerServiceWorker';
import { injectGlobal } from 'styled-components';
import normalize from 'styled-normalize';
import 'loaders.css/loaders.min.css';

injectGlobal`
${normalize}

body {
  font-family: 'Open Sans', sans-serif;
  font-size: 1rem;
  line-height: 1.5rem;
  padding-top: 64px;
}

h1, h2, h3, h4, h5, h6, a {
  font-weight: bold;
  color: #1a5ca3;
}

h1 {
  font-size: 4.25rem;
  line-height: 4.5rem;
  margin-top: 1.5rem;
  margin-bottom: 3rem;
}

h2 {
  font-size: 2.625rem;
  line-height: 3rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

h3 {
  font-size: 1.625rem;
  line-height: 3rem;
  margin-top: 1.5rem;
  margin-bottom: 0rem;
}

h4, h5, h6 {
  font-size: 1rem;
  line-height: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 0rem;
}

.loader-hidden {
  display: none;
}
.loader-active {
  margin: 0 auto;
  display: table;
}

.square-spin>div {
  border: none !important;
}
`;

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
