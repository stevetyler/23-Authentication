import { redirect } from 'react-router-dom';

export function getTokenDuration() {
  const expiration = localStorage.getItem('expiration');
  const expirationDate = new Date(expiration);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime(); // getTime() returns milliseconds
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem('token');
  const tokenDuration = getTokenDuration();
  
  if (!token) {
    return null;
  }

  if (tokenDuration <= 0) { 
    return 'EXPIRED';
  }

  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();
  if (!token) {
    return redirect('/auth');
  }
  return null;
}