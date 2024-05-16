import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from './Navbar';



const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home - User Dashboard</title>
      </Helmet>
      <Navbar />
    </div>
  );
};

export default Home;