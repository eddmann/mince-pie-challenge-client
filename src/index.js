/* global fetch */

import { render } from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import * as auth from './libs/auth';
import * as request from './libs/request';
import app from './app';

fetch(global.BOOTSTRAP_URL)
  .then(r => r.json())
  .then(({ _links, cognito, baseEndpointUrl }) => {
    request.setBaseEndpoint(baseEndpointUrl);
    auth.initAuthPool(cognito.poolId, cognito.clientId);

    return app({
      history: createBrowserHistory(),
      services: { request, auth },
      links: { add: _links.add.href, list: _links.list.href, view: _links.view.href },
    });
  })
  .then(instance => {
    render(instance, document.getElementById('root'));
  })
  .catch(error => {
    console.log(error);
  });
