import { useState } from 'react';
import './assets/js/init-alpine'
import Aside from './component/module/Aside';
import Menu from './component/inc/Menu';
import Header from './component/inc/Header';
import Main from './component/inc/Main';
import routes from './component/Router/routes';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import PrivateRoute from './component/Router/PrivateRoute';
import Login from './component/Auth/Login';

export default function Backend(){
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isPagesMenuOpen, setIsPagesMenuOpen] = useState(false);

  const location = useLocation();


  const toggleSideMenu = (e) => {
    e.preventDefault();

    setIsSideMenuOpen(!isSideMenuOpen)
    
  }


  const togglePagesMenu = (e) => {
    e.preventDefault();
    setIsPagesMenuOpen(!isPagesMenuOpen)

  }
    return (
        <>
            <div
        className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${ isSideMenuOpen ? 'overflow-hidden' : ''}`}
      >
      <Menu />
      {
        isSideMenuOpen ? (
          <div
          // x-show="isSideMenuOpen"
          // x-transition:enter="ease-in-out duration-150"
          // x-transition:enter-start="opacity-0"
          // x-transition:enter-end="opacity-100"
          // x-transition:leave="transition ease-in-out duration-150"
          // x-transition:leave-start="opacity-100"
          // x-transition:leave-end="opacity-0"
          className="fixed inset-0 z-10 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
        ></div>
        ) : 
        ''
      }
      <Aside isSideMenuOpen={isSideMenuOpen} />
      <div className="flex flex-col flex-1 w-full">
        <Header />
        <Main>
          <Outlet />
        </Main>
        
      </div>
    </div>
        </>
    )
}