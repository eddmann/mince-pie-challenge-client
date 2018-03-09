import { scenario } from '../__fixtures__/setup';

scenario('login as user', ({ given, when, then, fixtures: { request, auth, renderApp } }) => {
  const USERNAME = 'sample_username';
  const PASSWORD = 'sample_password';

  given('an unauthenicated user on the login page', () => {
    auth.login = jest.fn(() => Promise.resolve());

    request.push({
      path: 'list.url',
      method: 'GET',
      response: {
        _links: { self: { href: '/pies' } },
        _embedded: { pies: [] },
        total: 0,
      },
    });

    return renderApp('/login');
  });

  when('attempt to login with correct credentials', wrapper => {
    wrapper.find('input#username').simulate('change', { target: { id: 'username', value: USERNAME }});
    wrapper.find('input#password').simulate('change', { target: { id: 'password', value: PASSWORD }});
    wrapper.find('Button').simulate('click');
  });

  then('logged in and taken to browse listing page', wrapper => {
    expect(auth.login).toBeCalledWith(USERNAME, PASSWORD);
    expect(wrapper.find('.Browse')).toMatchSnapshot();
  });
});

scenario('display public navigation', ({ given, when, then, fixtures: { auth, renderApp } }) => {
  given('an unauthenicated user', () => {
    auth.getToken = () => Promise.resolve(undefined);
  });

  when('visit a page', () => renderApp('/irrelevant-url'));

  then('displays unauthenicated navigation', wrapper => {
    expect(wrapper.find('.item')).toMatchSnapshot();
  });
});

scenario('display private navigation', ({ given, when, then, fixtures: { auth, renderApp } }) => {
  given('an authenicated user', () => {
    auth.getToken = () => Promise.resolve('SAMPLE_TOKEN');
  });

  when('visit a page', () => renderApp('/irrelevant-url'));

  then('displays authenicated navigation', wrapper => {
    expect(wrapper.find('.item')).toMatchSnapshot();
  });
});

scenario('access private route as public user', ({ given, when, then, fixtures: { auth, renderApp } }) => {
  given('an unauthenicated user', () => {
    auth.getToken = () => Promise.resolve();
  });

  when('visit an private page', () => renderApp('/add'));

  then('redirected to login page', wrapper => {
    expect(wrapper.find('.Login')).toMatchSnapshot();
  });
});

scenario('access public route as authenticated user', ({ given, when, then, fixtures: { request, auth, renderApp } }) => {
  given('an authenicated user', () => {
    auth.getToken = () => Promise.resolve('SAMPLE_TOKEN');

    request.push({
      path: 'list.url',
      method: 'GET',
      response: {
        _links: { self: { href: '/pies' } },
        _embedded: { pies: [] },
        total: 0,
      },
    });
  });

  when('visit an public page', () => renderApp('/login'));

  then('redirected to browse listings page', wrapper => {
    expect(wrapper.find('.Browse')).toMatchSnapshot();
  });
});
