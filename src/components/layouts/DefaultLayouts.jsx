import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../Navbar';

function DefaultLayouts() {

    const { currentUser } = useAuth()
    if (!currentUser) {
        return <Navigate to='/login' />;
    }
  return (
    <div>
      <Outlet />
       <Navbar />
    </div>
  )
}

export default DefaultLayouts