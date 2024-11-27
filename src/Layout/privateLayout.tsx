import React from 'react';
import { Outlet } from 'react-router-dom';
import AppHeader from '../Pages/Login/AppHeader';



const PrivateLayout: React.FC = () => {
  return (
    <div>
      <header >
      <AppHeader />
      </header>
      <main >
        <Outlet /> 
      </main>
    
    </div>
  );
};


export default PrivateLayout;
