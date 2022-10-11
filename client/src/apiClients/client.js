function client(endpoint, { body, ...customConfig } = {}) {
  const token = localStorage.getItem('_token_');
  const headers = {};
  if (token) {
    headers['x-auth-token'] = token;
  }

  // fetch can auto-fill the FormData content type
  if (!(body instanceof FormData)) {
    headers['content-type'] = 'application/json';
  }

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers
    }
  };

  if (body) {
    config.body = body instanceof FormData ? body : JSON.stringify(body);
  }

  return request(`${process.env.REACT_APP_API_URL}/${endpoint}`, config);
}

// Requests a URL, returning a promise
function request(url, options) {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(parseJSON)
      .then(response => {
        if (response.ok) {
          return resolve(response.json);
        }
        // extract the error from the server's json
        return reject({ message: response.json.message });
      })
      .catch(error =>
        reject({
          message:
            'The server could not be reached. Please contact customer support.'
        })
      );
  });
}

// Parses the JSON returned by a network request
function parseJSON(response) {
  return new Promise(resolve =>
    response
      .text()
      .then(text => {
        return text ? JSON.parse(text) : {};
      })
      .then(json => {
        resolve({
          status: response.status,
          ok: response.ok,
          json
        });
      })
  );
}

export default client;
