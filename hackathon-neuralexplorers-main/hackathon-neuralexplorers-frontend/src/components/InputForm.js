// // // src/components/InputForm.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import '../styles/InputForm.css';

// // const InputForm = ({ onSubmit }) => {
// //   const [githubLink, setGithubLink] = useState('');
// //   const [currentVersion, setCurrentVersion] = useState('');
// //   const [targetVersion, setTargetVersion] = useState('');
// //   const navigate = useNavigate(); // Hook for navigating to the results page

// //   // List of Java versions for dropdowns
// //   const javaVersions = [
// //     'Java 8', 'Java 9', 'Java 10', 'Java 11', 'Java 12', 'Java 13', 'Java 14',
// //     'Java 15', 'Java 16', 'Java 17', 'Java 18', 'Java 19'
// //   ];

// //   // Utility to get the numeric value of the Java version (e.g., "Java 8" -> 8)
// //   const getVersionNumber = (version) => parseInt(version.replace('Java ', ''), 10);

// //   // Validation checks
// //   const isValidURL = (url) => {
// //     const githubUrlPattern = /^https:\/\/github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+(\/tree\/[a-zA-Z0-9_.-]+)?$/;
// //     return githubUrlPattern.test(url);
// //   };

// //   const getDownloadLink = () => {
// //     // Extract username, repository, and branch (if any)
// //     const match = githubLink.match(/github\.com\/([^/]+)\/([^/]+)(\/tree\/([^/]+))?/);
// //     if (!match) return null;

// //     const username = match[1];
// //     const repository = match[2];
// //     const branch = match[4] || 'main';  // Default to 'main' if no branch specified

// //     return `https://github.com/${username}/${repository}/archive/refs/heads/${branch}.zip`;
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     // Validate GitHub link
// //     if (!isValidURL(githubLink)) {
// //       toast.error('Please enter a valid GitHub repository link.');
// //       return;
// //     }

// //     // Validate that the target version is greater than the current version
// //     if (getVersionNumber(currentVersion) >= getVersionNumber(targetVersion)) {
// //       toast.error('The target version must be greater than the current version.');
// //       return;
// //     }

// //     // If validation passes, show success message
// //     toast.success('Submission successful! Preparing download link...');
// //     onSubmit({ githubLink, currentVersion, targetVersion });

// //     // Navigate to results page after 4 seconds
// //     setTimeout(() => {
// //       navigate('/results');
// //     }, 4000); // 4-second delay
// //   };

// //   return (
// //     <form className="input-form" onSubmit={handleSubmit}>
// //       <h2>GitHub Version Updater</h2>

// //       {/* GitHub Link Input */}
// //       <div className="form-group">
// //         <label>GitHub Link:</label>
// //         <input
// //           type="text"
// //           value={githubLink}
// //           onChange={(e) => setGithubLink(e.target.value)}
// //           placeholder="https://github.com/user/repo or https://github.com/user/repo/tree/branch"
// //           required
// //         />
// //       </div>

// //       {/* Current Version Dropdown */}
// //       <div className="form-group">
// //         <label>Current Version:</label>
// //         <select
// //           value={currentVersion}
// //           onChange={(e) => setCurrentVersion(e.target.value)}
// //           required
// //         >
// //           <option value="">Select Current Version</option>
// //           {javaVersions.map((version) => (
// //             <option key={version} value={version}>
// //               {version}
// //             </option>
// //           ))}
// //         </select>
// //       </div>

// //       {/* Target Version Dropdown */}
// //       <div className="form-group">
// //         <label>Target Version:</label>
// //         <select
// //           value={targetVersion}
// //           onChange={(e) => setTargetVersion(e.target.value)}
// //           required
// //         >
// //           <option value="">Select Target Version</option>
// //           {javaVersions.map((version) => (
// //             <option key={version} value={version}>
// //               {version}
// //             </option>
// //           ))}
// //         </select>
// //       </div>

// //       {/* Submit Button */}
// //       <button type="submit" className="submit-button">Submit</button>

// //       {/* Download Button */}
// //       {/* {isValidURL(githubLink) && (
// //         <a
// //           href={getDownloadLink()}
// //           download
// //           className="download-button"
// //           onClick={() => toast.info('Downloading repository...')}
// //         >
// //           Download Repository
// //         </a>
// //       )} */}

// //       {/* ToastContainer for notifications */}
// //       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
// //     </form>
// //   );
// // };

// // export default InputForm;


// // import { useState } from 'react';
// import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';

// const InputForm = () => {
//   const [repoUrl, setRepoUrl] = useState('');
//   const [currentVersion, setCurrentVersion] = useState('');
//   const [targetVersion, setTargetVersion] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const validateUrl = (url) => {
//     const regex = /^(https:\/\/github\.com\/[\w-]+\/[\w-]+)$/;
//     return regex.test(url);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateUrl(repoUrl)) {
//       setError('Invalid GitHub repository URL');
//       return;
//     }
//     if (!currentVersion) {
//       setError('Current version is required');
//       return;
//     }
//     if (!targetVersion) {
//       setError('Target version is required');
//       return;
//     }
//     setError('');
//     const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
//     try {
//         const response = await axios.post(`${apiUrl}/upload`, {
//         repo_url: repoUrl,
//         current_version: currentVersion,
//         target_version: targetVersion,
//       });
//       if (response.status === 200) {
//         alert('Repository contents uploaded successfully');
//         navigate('/results');
//       }
//     } catch (error) {
//       console.error('Error uploading repository contents', error);
//       alert('Failed to upload repository contents');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         GitHub Repository URL:
//         <input
//           type="text"
//           value={repoUrl}
//           onChange={(e) => setRepoUrl(e.target.value)}
//           required
//         />
//       </label>
//       <br />
//       <label>
//         Current Version:
//         <input
//           type="text"
//           value={currentVersion}
//           onChange={(e) => setCurrentVersion(e.target.value)}
//           required
//         />
//       </label>
//       <br />
//       <label>
//         Target Version:
//         <input
//           type="text"
//           value={targetVersion}
//           onChange={(e) => setTargetVersion(e.target.value)}
//           required
//         />
//       </label>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <br />
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default InputForm;




import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InputForm = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [currentVersion, setCurrentVersion] = useState('');
  const [targetVersion, setTargetVersion] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateUrl = (url) => {
    // const regex = /^(https:\/\/dev\.azure\.com\/[\w-]+\/[\w-]+\/_git\/[\w-]+)$/;
    // return regex.test(url);
    return true
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateUrl(repoUrl)) {
      setError('Invalid Azure DevOps repository URL');
      return;
    }
    if (!currentVersion) {
      setError('Current version is required');
      return;
    }
    if (!targetVersion) {
      setError('Target version is required');
      return;
    }
    setError('');
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    const username = "GH01415752@devcorptenant.com";
    const password = "NE@hack1234";

    try {
      const response = await axios.post(`${apiUrl}/clone`, {
        repo_url: repoUrl,
        current_version: currentVersion,
        target_version: targetVersion,
      }, {
        auth: {
          username: username,
          password: password
        }
      });

      if (response.status === 200) {
        alert('Repository contents uploaded successfully');
        navigate('/results');
      }
    } catch (error) {
      console.error('Error uploading repository contents', error);
      alert('Failed to upload repository contents');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Repository URL:</label>
        <input
          type="text"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />
      </div>
      <div>
        <label>Current Version:</label>
        <input
          type="text"
          value={currentVersion}
          onChange={(e) => setCurrentVersion(e.target.value)}
        />
      </div>
      <div>
        <label>Target Version:</label>
        <input
          type="text"
          value={targetVersion}
          onChange={(e) => setTargetVersion(e.target.value)}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default InputForm;