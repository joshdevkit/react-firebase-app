import React from 'react';
import Navbar from '../../../components/Navbar';
import { Helmet } from 'react-helmet-async';
import RightSidebar from './layouts/RightSidebar';
import LeftSidebar from './layouts/LeftSidebar';
import MainContent from '../main/MainContent';

const DefaultHomePageLayout = () => (
  <div>
    <Helmet>
      <title>Home - User Dashboard</title>
    </Helmet>
    <Navbar />
    <div className="flex flex-col lg:flex-row min-h-screen mt-1">
      <LeftSidebar />
      <MainContent />
      <RightSidebar />
    </div>
  </div>
);

export default DefaultHomePageLayout;
