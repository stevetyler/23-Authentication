export function getAuthToken() {
  const token = localStorage.getItem('token');
  return token;
}

export function isUserAuthenticated() {
  const token = getAuthToken();
  return !!token;
}