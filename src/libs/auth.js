import { CognitoUserPool, CognitoUserAttribute, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';

let pool = undefined;

export const initAuthPool = (poolId, clientId) => {
  pool = new CognitoUserPool({ UserPoolId: poolId, ClientId: clientId });
};

export const register = (username, email, password) =>
  new Promise((res, rej) => {
    const attrs = [new CognitoUserAttribute({ Name: 'email', Value: email })];
    pool.signUp(username, password, attrs, null, err => {
      if (err) rej(err);
      else res(username);
    });
  });

export const confirmRegistration = (username, code) =>
  new Promise((res, rej) => {
    const user = new CognitoUser({ Pool: pool, Username: username });
    user.confirmRegistration(code, true, err => {
      if (err) rej(err);
      else res();
    });
  });

export const login = (username, password) =>
  new Promise((res, rej) => {
    const user = new CognitoUser({ Pool: pool, Username: username });
    const details = new AuthenticationDetails({ Username: username, Password: password });
    user.authenticateUser(details, {
      onSuccess: () => res(),
      onFailure: err => rej(err),
    });
  });

export const logout = () =>
  new Promise(res => {
    const user = pool.getCurrentUser();
    user && user.signOut();
    res();
  });

export const getToken = () =>
  new Promise((res, rej) => {
    const user = pool && pool.getCurrentUser();

    if (!user) {
      res();
      return;
    }

    user.getSession(function(err, session) {
      if (err) rej(err);
      else res(session.getIdToken().getJwtToken());
    });
  });
