import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from './components/Home';
import Register from './auth/Register';
import Profile from './auth/Profile';
import { useAuth } from './contexts/AuthContext';
import Login from './auth/Login';

import ChatList from './components/chatlist';
import ForgotPassword from './auth/ForgotPassword';
import DefaultHomePageLayout from './auth/views/ui/DefaultHomePageLayout';
function App() {
  
  const { currentUser } = useAuth();
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          {currentUser ? (
            <>
              <Route path="/profile" element={<Profile />} />
              <Route path="/chat" element={<ChatList />} />
              <Route path="/" element={<DefaultHomePageLayout />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <>
              <Route path='/forgot' element={<ForgotPassword />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          )}
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
