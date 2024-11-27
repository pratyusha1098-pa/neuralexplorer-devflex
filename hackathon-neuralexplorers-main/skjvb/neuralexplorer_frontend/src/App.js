
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
// import Card from 'react-bootstrap/Card';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Navbar, Nav, Button, Modal, Form, Container, ProgressBar } from 'react-bootstrap';
// import './App.css';

// function App() {
//   const [showSubmitModal, setShowSubmitModal] = useState(false);
//   const [showVersionModal, setShowVersionModal] = useState(false);
//   const [showResult, setShowResult] = useState(false);
//   const [currentVersion, setCurrentVersion] = useState('');
//   const [targetedVersion, setTargetedVersion] = useState('');
//   const [url, setUrl] = useState('');
//   const [isEditable, setIsEditable] = useState(false);
//   const [resultCode, setResultCode] = useState('');
//   const [testCasesPassed, setTestCasesPassed] = useState(0);
//   const [testCasesTotal, setTestCasesTotal] = useState(0);
//   const [finalCode, setFinalCode] = useState('');

//   useEffect(() => {
//     // Create a new instance of the mock adapter
//     const mock = new MockAdapter(axios);

//     // Mock the GET request to /api/versions
//     mock.onGet('/api/versions').reply(200, {
//       currentVersion: '1.0.0',
//       targetedVersion: '2.0.0'
//     });

//     // Mock the POST request to /api/convert
//     mock.onPost('/api/convert').reply(200, {
//       resultCode: 'Sample Result Code',
//       testCasesPassed: 5,
//       testCasesTotal: 10,
//       finalCode: 'Sample Final Code'
//     });

//     // Fetch versions from the backend
//     axios.get('/api/versions').then(response => {
//       setCurrentVersion(response.data.currentVersion);
//       setTargetedVersion(response.data.targetedVersion);
//     });
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setShowSubmitModal(false);
//     setShowVersionModal(true);
//   };

//   const handleYes = () => {
//     // Fetch result from the backend
//     axios.post('/api/convert', { url }).then(response => {
//       setResultCode(response.data.resultCode);
//       setTestCasesPassed(response.data.testCasesPassed);
//       setTestCasesTotal(response.data.testCasesTotal);
//       setFinalCode(response.data.finalCode);
//       setShowVersionModal(false);
//       setShowResult(true);
//     });
//   };

//   const handleNo = () => {
//     setIsEditable(true);
//     setShowVersionModal(false);
//   };

//   const handleDownload = (content, filename) => {
//     const element = document.createElement('a');
//     const file = new Blob([content], { type: 'text/plain' });
//     element.href = URL.createObjectURL(file);
//     element.download = filename;
//     document.body.appendChild(element);
//     element.click();
//   };

//   return (
//     <div className="App">
//       <Navbar bg="primary" variant="dark" expand="lg">
//         <Container>
//           <Navbar.Brand href="#home">Home</Navbar.Brand>
//           <Nav className="ml-auto">
//             <Button variant="light" onClick={() => setShowSubmitModal(true)} className="ml-auto">
//               ConversionCode
//             </Button>
//           </Nav>
//         </Container>
//       </Navbar>

//       <Modal show={showSubmitModal} onHide={() => setShowSubmitModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Enter URL</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="formBasicEmail">
            
//               <Form.Label>URL</Form.Label>
              
//               <Form.Control
              
//                 type="text"
//                 placeholder="Enter URL"
//                 value={url}
//                 onChange={(e) => setUrl(e.target.value)}
                
//               />
//               <Form.Label marginTop='10px' >Branch Name </Form.Label>
//               <Form.Control
              
//               type="text"
//               placeholder="Branch Name"
//               onChange={(e) => setUrl(e.target.value)}
              
//             />
//             <text marginTop='10px'>Username</text>
//             <Form.Control
              
//               type="text"
//               placeholder="Username"
//               onChange={(e) => setUrl(e.target.value)}
              
//             />

//             <text>Password</text>
//             <Form.Control
              
//               type="password"
//               placeholder="Password"
//               onChange={(e) => setUrl(e.target.value)}
              
//             />
//             </Form.Group>
//             <Modal.Footer>
//             <Button variant="primary" type="submit">
//               Submit
//             </Button>
//             </Modal.Footer>
//           </Form>
//         </Modal.Body>
//       </Modal>


//       <Modal show={showVersionModal} onHide={() => setShowVersionModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Version Information</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>Current Version: {currentVersion}</p>
//           <p>Targeted Version: {targetedVersion}</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleNo}>
//             No
//           </Button>
//           <Button variant="primary" onClick={handleYes}>
//             Yes
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {showResult && (
//         <Container className="result-container">
//           <div className="result-box">
//             <h5>Result Code</h5>
//             <pre>{resultCode}</pre>
//             <Button variant="primary" onClick={() => handleDownload(resultCode, 'resultCode.txt')}>
//               Download Result Code
//             </Button>
//           </div>
//           <div className="result-box">
//             <h5>Test Cases</h5>
//             <ProgressBar now={(testCasesPassed / testCasesTotal) * 100} label={`${testCasesPassed}/${testCasesTotal}`} />
//             <Card style={{ marginTop:'10px' }}>
//               <Card.Body> test case 1 is running.......2 is running.......3 is running...</Card.Body>
//             </Card>
            
//           </div>
//           <div className="result-box">
//             <h5>Final Code</h5>
//             <pre>{finalCode}</pre>
//             <Button variant="primary" onClick={() => handleDownload(finalCode, 'finalCode.txt')}>
//               Download Final Code
//             </Button>
//           </div>
//         </Container>
//       )}
//     </div>
//   );
// }

// export default App;




// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Button, Modal, Form, Container, ProgressBar } from 'react-bootstrap';
import './App.css';
// import TestCasesPage from './TestCasesPage';
import CodeConversion from './CodeConversion';
import DeployPage from './DeployPage';

function App() {
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showVersionModal, setShowVersionModal] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [currentVersion, setCurrentVersion] = useState('');
  const [targetedVersion, setTargetedVersion] = useState('');
  const [url, setUrl] = useState('');
  const [isEditable, setIsEditable] = useState(false);
  const [resultCode, setResultCode] = useState('');
  const [testCasesPassed, setTestCasesPassed] = useState(0);
  const [testCasesTotal, setTestCasesTotal] = useState(0);
  const [finalCode, setFinalCode] = useState('');

  useEffect(() => {
    // Create a new instance of the mock adapter
    const mock = new MockAdapter(axios);

    // Mock the GET request to /api/versions
    mock.onGet('/api/versions').reply(200, {
      currentVersion: '1.0.0',
      targetedVersion: '2.0.0'
    });

    // Mock the POST request to /api/convert
    mock.onPost('/api/convert').reply(200, {
      resultCode: 'Sample Result Code',
      testCasesPassed: 5,
      testCasesTotal: 10,
      finalCode: 'Sample Final Code'
    });

    // Fetch versions from the backend
    axios.get('/api/versions').then(response => {
      setCurrentVersion(response.data.currentVersion);
      setTargetedVersion(response.data.targetedVersion);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSubmitModal(false);
    setShowVersionModal(true);
  };

  const handleYes = () => {
    // Fetch result from the backend
    axios.post('/api/convert', { url }).then(response => {
      setResultCode(response.data.resultCode);
      setTestCasesPassed(response.data.testCasesPassed);
      setTestCasesTotal(response.data.testCasesTotal);
      setFinalCode(response.data.finalCode);
      setShowVersionModal(false);
      setShowResult(true);
    });
  };

  const handleNo = () => {
    setIsEditable(true);
    setShowVersionModal(false);
  };

  const handleDownload = (content, filename) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <Router>
      <div className="App">
        <Navbar bg="primary" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">DEVFLEX</Navbar.Brand>
            <Nav className="ml-auto">
              <Button variant="light" as={Link} to="/code-conversion" className="ml-auto">
                ConversionCode
              </Button>
            </Nav>
          </Container>
        </Navbar>
        <Routes>
          {/* <Route path="/" element={<img src="your-image-url.jpg" alt="Landing" className="landing-image" />} /> */}
          <Route path="/code-conversion" element={<CodeConversion />} />
        </Routes>

        <Modal show={showSubmitModal} onHide={() => setShowSubmitModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Enter URL</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>URL</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="Enter URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  readOnly={!isEditable}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
        

        <Modal show={showVersionModal} onHide={() => setShowVersionModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Version Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Current Version: {currentVersion}</p>
            <p>Targeted Version: {targetedVersion}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleNo}>
              No
            </Button>
            <Button variant="primary" onClick={handleYes}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>

        {showResult && (
          <Container className="result-container">
            <div className="result-box">
              <h5>Result Code</h5>
              <pre>{resultCode}</pre>
              <Button variant="primary" onClick={() => handleDownload(resultCode, 'resultCode.txt')}>
                Download Result Code
              </Button>
            </div>
            <div className="result-box">
              <h5>Test Cases</h5>
              <ProgressBar now={(testCasesPassed / testCasesTotal) * 100} label={`${testCasesPassed}/${testCasesTotal}`} />
            </div>
            <div className="result-box">
              <h5>Final Code</h5>
              <pre>{finalCode}</pre>
              <Button variant="primary" onClick={() => handleDownload(finalCode, 'finalCode.txt')}>
                Download Final Code
              </Button>
            </div>
          </Container>
        )}
      </div>
      <Routes>
        <Route path="/" element={<CodeConversion />} />
        {/* <Route path="/version-update" element={<VersionUpdateModal />} /> */}
        {/* <Route path="/test-cases" element={<TestCasesPage />} /> */}
        <Route path="/deploy" element={<DeployPage />} />
      </Routes>
    </Router>
  );
}

export default App;