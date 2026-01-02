import { redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  if (mode !== 'login' && mode !== 'signup') {
    throw Response.json({ message: 'Unsupported mode.' }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  console.log('auth routeauthData', authData);

  const response = await fetch('http://localhost:8080/' + (mode === 'login' ? 'login' : 'signup'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });

  console.log('response', response);
  if (response.status === 422 || response.status === 401) {
    return response; // react-router will handle this response and extract the data
  }

  if (!response.ok) {
    throw Response.json(
      { message: 'Could not authenticate user.' },
      { status: 500 }
    );
  }

  // manage the token, e.g., store in localStorage or context
  const resData = await response.json();
  localStorage.setItem('token', resData.token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('expiration', expiration.toISOString());

  return redirect('/');
}