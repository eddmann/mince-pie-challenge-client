import React from 'react';
import { Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware, push } from 'react-router-redux';

import reducer from './reducers';
import App from './containers/App';
import { loadUrls } from './actions/pie';
import { authenticated } from './actions/user';

export default function app({
  history,
  services: { request, auth },
  links: { add, list, view },
}) {
  const middleware = [thunk.withExtraArgument({ request, auth, push }), routerMiddleware(history)];
  if (process.env.NODE_ENV === 'development') {
    middleware.push(createLogger());
  }

  const store = createStore(reducer, applyMiddleware(...middleware));

  store.dispatch(loadUrls(add, list, view));

  return auth.getToken()
    .then(token => token && store.dispatch(authenticated()))
    .then(() => (
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    ));
};
