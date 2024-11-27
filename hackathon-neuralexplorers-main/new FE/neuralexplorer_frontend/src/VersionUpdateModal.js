import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const VersionUpdateModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVersion, setCurrentVersion] = useState('');
  const [targetedVersion, setTargetedVersion] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchVersionInfo();
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  const fetchVersionInfo = async () => {
    try {
      const response = await fetch('/api/version-info'); // Replace with your backend endpoint
      const data = await response.json();
      setCurrentVersion(data.currentVersion);
      setTargetedVersion(data.targetedVersion);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching version info:', error);
    }
  };

  const handleUpdate = () => {
    // Handle the update logic here
    console.log('Updating to the targeted version...');
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal show={isModalOpen} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Update Available</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Current Version: {currentVersion}</p>
        <p>Targeted Version: {targetedVersion}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleUpdate}>
          Update
        </Button>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VersionUpdateModal;