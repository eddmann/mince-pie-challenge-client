export default function createRequestStack(responses = []) {
  const push = ({ path, method, body, response }) => responses.push({ path, method, body, response });

  const api = (path, method, body = undefined) => {
    const actual = { path, method, body };

    if (responses.length === 0) {
      return fail(`Expected: Nil, Actual: ${JSON.stringify(actual)}`);
    }

    const { response, ...expected } = responses.shift();

    expect(expected).toEqual(actual);

    return Promise.resolve(response);
  };

  const upload = (url, file) => api(url, 'PUT', file);

  return { push, api, upload };
};
