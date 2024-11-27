// src/components/DisplayResults.js
import React from 'react';
import '../styles/DisplayResults.css';

const DisplayResults = ({ data }) => {
  return (
    <div className="results-container">
      <h3>Submitted Data</h3>
      <p><strong>GitHub Link:</strong> {data.githubLink}</p>
      <p><strong>Current Version:</strong> {data.currentVersion}</p>
      <p><strong>Target Version:</strong> {data.targetVersion}</p>
    </div>
  );
};

export default DisplayResults;
