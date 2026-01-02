import { redirect } from 'react-router-dom';

export function action({ request, params }) {
  localStorage.removeItem('token');

  return redirect('/');
}