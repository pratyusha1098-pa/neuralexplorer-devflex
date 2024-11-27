import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Spinner, ProgressBar } from 'react-bootstrap';
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
  const [showForm, setShowForm] = useState(false);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     window.location.href = '/version-update';
  //   }, 10000); // 10 seconds

  //   return () => clearTimeout(timer);
  // }, []);

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
      toast.error('Username must be at least 5 characters long.');
      return;
    }

    setLoading(true);
    // Your existing submit logic
  };

  return (
    <Container>
      <Button id ="primaryButton"variant="primary" onClick={() => setShowForm(true)}>
        Implement GenAI
      </Button>
      {showForm && (
        <Form onSubmit={handleSubmit} className="mt-4">
          <Form.Group controlId="formGitRepo">
            <Form.Label><strong>Git Repository <span className="text-danger">*</span></strong></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Git Repository URL"
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

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
      {loading && (
        <div>
          <Spinner animation="border" />
          <ProgressBar now={progress} />
          <div className="mt-2">Uploading your code...</div>
        </div>
      )}
      <ToastContainer />
    </Container>
  );
}

export default CodeConversion;