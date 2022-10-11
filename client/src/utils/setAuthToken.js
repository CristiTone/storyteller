const setAuthToken = token => {
  if (token) {
    localStorage.setItem('_token_', token);
  } else {
    localStorage.removeItem('_token_');
  }
};

export default setAuthToken;
