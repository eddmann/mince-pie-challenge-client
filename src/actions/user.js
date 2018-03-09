export const register = (username, email, password) => (dispatch, getState, { auth }) => {
  dispatch({ type: 'SUBMIT_REGISTRATION' });

  auth
    .register(username, email, password)
    .then(username => {
      dispatch({ type: 'REGISTRATION_SUCCESS', username });
    })
    .catch(error => {
      dispatch({ type: 'REGISTRATION_ERROR', error: error.message });
    });
};

export const confirmRegistration = (username, code) => (dispatch, getState, { auth, push }) => {
  dispatch({ type: 'CONFIRM_REGISTRATION' });

  auth
    .confirmRegistration(username, code)
    .then(() => {
      dispatch({ type: 'REGISTRATION_CONFIRMATION_SUCCESS' });
      dispatch(push('/login'));
    })
    .catch(error => {
      dispatch({ type: 'REGISTRATION_CONFIRMATION_ERROR', error: error.message });
    });
};

export const authenticated = () => {
  return { type: 'AUTHENTICATED' };
};

export const clearSuccessMessage = () => {
  return { type: 'CLEAR_SUCCESS_MESSAGE' };
};

export const login = (username, password, from) => (dispatch, getState, { auth, push }) => {
  dispatch({ type: 'ATTEMPT_LOGIN' });

  auth
    .login(username, password)
    .then(() => {
      dispatch({ type: 'LOGIN_SUCCESS' });
      dispatch(push(from));
    })
    .catch(error => {
      dispatch({ type: 'LOGIN_FAILURE', error: error.message });
    });
};

export const logout = () => (dispatch, getState, { auth, push }) => {
  dispatch({ type: 'ATTEMPT_LOGOUT' });

  auth.logout().then(() => {
    dispatch({ type: 'LOGOUT_SUCCESS' });
    dispatch(push('/'));
  });
};
