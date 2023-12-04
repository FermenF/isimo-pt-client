import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { routes } from './Router';
import { AlertProvider } from '@context/AlertContext';
import { AuthContextProvider } from '@context/AuthContext';

import 'flowbite';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AlertProvider>
      <AuthContextProvider>
        <RouterProvider router={routes}></RouterProvider>
      </AuthContextProvider>
    </AlertProvider>
  </React.StrictMode>
);
