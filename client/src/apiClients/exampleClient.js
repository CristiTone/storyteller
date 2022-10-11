import client from './client';
let cache = null;

function getAccount(noCache) {
  if (!noCache && cache) return Promise.resolve(cache);

  const result = client('accounts');
  result.then(account => (cache = account));

  return result;
}

function createAccount(account) {
  return client('accounts', {
    body: account
  });
}

function updateAccount(account) {
  return client('accounts', { method: 'PUT', body: account }).then(() => {
    cache = account;
  });
}

export { getAccount, createAccount, updateAccount };
