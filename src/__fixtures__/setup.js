import React from 'react';
import Enzyme, { mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import createMemoryHistory from 'history/createBrowserHistory';
import createScenario from './scenario';
import createRequestStack from './request';
import app from '../app';

Enzyme.configure({ adapter: new Adapter() });

export const scenario = createScenario(() => {
  const history = createMemoryHistory();
  const request = createRequestStack();
  const auth = { getToken: () => Promise.resolve() };

  return {
    request,
    auth,
    renderApp: (path = '/') => {
      history.replace(path);
      return app({
        history,
        services: { request, auth },
        links: { add: 'add.url', list: 'list.url', view: 'view.url/{id}' },
      }).then(mount);
    },
  };
});
