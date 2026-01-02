import { Outlet, useSubmit, useLoaderData } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { useEffect } from 'react';

function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if(!token) {
      console.log('No token found in RootLayout');
      return;
    }
    setTimeout(() => {
      submit(
        null,
        { method: 'post', action: '/logout' }
      );
    }, 1 * 60 * 60 * 1000); 
    console.log('Token refresh scheduled in RootLayout');
  }, [token]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
