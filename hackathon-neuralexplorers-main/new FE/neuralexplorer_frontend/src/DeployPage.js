// src/components/Home.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeployPage.css';

const DeployPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set a timeout to navigate to the login page after 10 seconds
    const timer = setTimeout(() => {
      navigate('/login');
    }, 120000);
    
    // Cleanup timeout on component unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="home-container">
      <div className="content">
        <h1 className="fade-in">Your code is updating ... </h1>
      </div>
    </div>
  );
};

export default DeployPage;