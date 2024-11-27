import React from 'react';
import { Outlet, useLocation  } from 'react-router-dom';
import AppHeader from '../Pages/Login/AppHeader';

import AppFooter from '../Pages/Login/AppFooter';

const PublicLayout: React.FC = () => {

  const location = useLocation()
  const showFooter = !location.pathname.includes('/register'); // Hide footer if URL contains "/register"


  return (
    <div>
      <header >
        <AppHeader />
      </header>
      <main >
        <Outlet /> {/* Public routes will render here */}
      
      </main>
      {showFooter && (
        <footer>
          <AppFooter />
        </footer>
      )}
     
    </div>
  );
};


export default PublicLayout;
