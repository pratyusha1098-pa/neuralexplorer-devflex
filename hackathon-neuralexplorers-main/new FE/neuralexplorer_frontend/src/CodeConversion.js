// src/CodeConversion.js
import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Spinner, ProgressBar, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CodeConversion.css';

function CodeConversion() {
  const [gitRepo, setGitRepo] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [branchName, setBranchName] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress === 100) {
      fetchLanguageVersion();
      // toast.info("I'm here");
    }
  }, [progress]);

  async function fetchLanguageVersion() {
    try {
      // const response = await fetch(`${process.env.REACT_APP_API_URL}/getLanguageVersion`);
      // toast.info(`Response status: ${response.json}`);
      // // if (!response.ok) {
      // //   throw new Error('Network response was not ok');
      // // }
      // const data = await response.json();
      // const { variable1, variable2 } = data;
      // console.log('Language :', "Python");
      // console.log('Version :', "3.6");

      toast.info(`  Language is : python`);
      toast.info(`Version is : "3.6"`);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate GitHub URL
    const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    if (!urlPattern.test(gitRepo)) {
      toast.error('Please enter a valid GitHub URL.');
      return;
    }

    // Validate username
    if (username.length < 5) {
      toast.error('Username should be at least 5 characters long.');
      return;
    }

    // Set loading state to true
    setLoading(true);
    setProgress(0);

    // Simulate a backend call with progress
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setLoading(false);
          toast.success('Download completed successfully!');
          return 100;
        }
        return prevProgress + 10;
      });
    }, 1000); // Simulate a 10-second download process
  };

  return (
    <Container className="code-conversion-container">
      <h2>Code Conversion</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formGitRepo">
          <Form.Label><strong>Git Repository <span className="text-danger">*</span></strong></Form.Label>
          <Form.Control
            type="text"
            placeholder="https://github.com/username/repo"
            value={gitRepo}
            onChange={(e) => setGitRepo(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formUsername">
          <Form.Label><strong>Username <span className="text-danger">*</span></strong></Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label><strong>Password <span className="text-danger">*</span></strong></Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBranchName">
          <Form.Label><strong>Branch Name <span className="text-danger">*</span></strong></Form.Label>
          <Form.Control
            type="text"
            placeholder="main"
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />{' '}
              Downloading...
            </>
          ) : (
            'Submit'
          )}
        </Button>
      </Form>
      {loading && (
        <div className="loading-overlay">
          <ProgressBar now={progress} label={`${progress}%`} className="progress-bar-custom" />
        </div>
      )}
      
      {/* fetchLanguageVersion(); */}
      <ToastContainer />
    </Container>
  );
}

export default CodeConversion;