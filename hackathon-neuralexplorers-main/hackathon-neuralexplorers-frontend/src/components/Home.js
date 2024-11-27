// src/components/Home.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set a timeout to navigate to the login page after 10 seconds
    const timer = setTimeout(() => {
      navigate('/login');
    }, 7000);
    
    // Cleanup timeout on component unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="home-container">
      <div className="content">
        <h1 className="fade-in">Hello World</h1>
      </div>
    </div>
  );
};

export default Home;
