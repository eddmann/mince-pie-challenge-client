/* global fetch */

import { getToken } from './auth';

let endpoint = undefined;

export const setBaseEndpoint = e => { endpoint = e; };

const isType = (response, type) =>
  response.headers.get('Content-Type') === type;

const parseJson = r =>
  isType(r, 'application/hal+json') ? r.json() : r.text();

const handleError = r => {
  if (r.ok) return r;

  if (isType(r, 'application/problem+json')) {
    return r.json().then(json => {
      if (json.errors) throw new Error(json.errors.map(e => e.reason));
      throw new Error(json.detail);
    });
  }

  throw new Error(r.statusText);
};

const generateHeaders = (body, token) => {
  const headers = {};
  if (body) headers['Content-Type'] = 'application/json';
  if (token) headers['Authorization'] = token;
  return headers;
};

export const api = (path, method = 'GET', body = undefined) =>
  getToken()
    .then(token => fetch(`${endpoint}${path}`, {
      method,
      headers: generateHeaders(body, token),
      body: body && JSON.stringify(body),
    }))
    .then(handleError)
    .then(parseJson);

export const upload = (url, file) =>
  fetch(url, {
    method: 'PUT',
    body: file
  })
  .then(handleError);
