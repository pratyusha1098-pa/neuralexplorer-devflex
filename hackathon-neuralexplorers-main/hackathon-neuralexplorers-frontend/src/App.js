// src/App.js
import React, { useState } from 'react';
import Home from './components/Home';
import InputForm from './components/InputForm';
import DisplayResults from './components/DisplayResults';
import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const App = () => {
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  // return (
  //   <div className="app-container">
  //     <InputForm onSubmit={handleFormSubmit} />
  //     {formData && <DisplayResults data={formData} />}
  //   </div>
  // );

  return (
    <Router>
      <div className="app-container">
        <Routes>

           {/* Route for the home page */}
           <Route path="/" element={<Home />} />

          {/* Route for the form */}
          <Route path="/login" element={<InputForm onSubmit={handleFormSubmit} />} />

          {/* Route for displaying results */}
          <Route path="/results" element={<DisplayResults data={formData} />} />
        </Routes>
      </div>
    </Router>
  );

};

export default App;
