import client from './client';
let cache = null;

function getUser() {
  if (cache) return Promise.resolve(cache);

  const result = client('auth');
  result.then((account) => (cache = account));

  return result;
}

function registerUser(account) {
  return client('user', {
    body: account,
  });
}

function loginUser(account) {
  return client('auth', {
    body: account,
  });
}

export { getUser, registerUser, loginUser };
