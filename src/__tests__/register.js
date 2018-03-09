import { scenario } from '../__fixtures__/setup';

scenario('registers a new user', ({ given, when, then, fixtures: { auth, renderApp } }) => {
  const USERNAME = 'sample_username';
  const EMAIL = 'sample@email.com';
  const PASSWORD = 'sample_password';
  const CODE = '1234';

  given('an unauthenicated user on the register page', () => {
    auth.register = jest.fn(() => Promise.resolve(USERNAME));
    auth.confirmRegistration = jest.fn(() => Promise.resolve());

    return renderApp('/register');
  });

  when('register with valid details', wrapper => {
    wrapper.find('input#username').simulate('change', { target: { id: 'username', value: USERNAME }});
    wrapper.find('input#email').simulate('change', { target: { id: 'email', value: EMAIL }});
    wrapper.find('input#password').simulate('change', { target: { id: 'password', value: PASSWORD }});
    wrapper.find('Button').simulate('click');
  });

  when('submit correct validation code', wrapper => {
    wrapper.find('input#code').simulate('change', { target: { id: 'code', value: CODE }});
    wrapper.find('Button').simulate('click');
  });

  then('successfully register and be redirected to login page', wrapper => {
    expect(auth.register).toBeCalledWith(USERNAME, EMAIL, PASSWORD);
    expect(auth.confirmRegistration).toBeCalledWith(USERNAME, CODE);
    expect(wrapper.find('.Login')).toMatchSnapshot();
  });
});
