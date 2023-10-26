import { useState } from 'react';
import './assets/js/init-alpine'
import Aside from './component/module/Aside';
import Menu from './component/inc/Menu';
import Header from './component/inc/Header';
import Main from './component/inc/Main';
import routes from './component/Router/routes';
import { Route, Routes, useLocation } from 'react-router-dom';
import PrivateRoute from './component/Router/PrivateRoute';
import Login from './component/Auth/Login';
import Backend from './Backend';
import Dashboard from './component/Dashboard/Dashboard';
import Register from './component/Auth/Register';
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000'

axios.interceptors.request.use(function(config){
  const token = localStorage.getItem('token')
  config.headers.Authorization = token ? `Bearer ${token}` : null;
  return config;
})

export default function App(){

  return (
    <>
      <PrivateRoute>
        <Route path='admin/*' element={<Backend />}>
          {
            routes.map(el => (
              <Route path={el.path} key={el.key} name={el.name} element={el.component} />
            ))
          }
        </Route>
        <Route path='/auth/login' element={<Login />} />
        <Route path='/auth/register' element={<Register />} />
        <Route path='*' element={<h1>No Found</h1>} />
    </PrivateRoute>
    </>
  )
}
