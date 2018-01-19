/* global fetch */

import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';

import reducer from './reducers';
import App from './containers/App';
import { loadUrls }from './actions/pie';
import { authenticated }from './actions/user';
import { setBaseEndpoint } from './libs/request';
import { initAuthPool, getToken } from './libs/auth';

const history = createBrowserHistory();

const middleware = [ thunk, routerMiddleware(history) ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);

fetch(global.BOOTSTRAP_URL)
  .then(r => r.json())
  .then(({ _links, cognito, baseEndpointUrl }) => {
    setBaseEndpoint(baseEndpointUrl);
    initAuthPool(cognito.poolId, cognito.clientId);
    store.dispatch(loadUrls(_links.add.href, _links.list.href, _links.view.href));
    getToken().then(token => token && store.dispatch(authenticated()));

    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
      document.getElementById('root')
    );
  })
  .catch(error => {
    console.log(error);
  });
