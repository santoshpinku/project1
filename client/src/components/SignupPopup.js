import React, { useState } from 'react';
import axios from 'axios';

function SignupPopup({ onSuccess, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/signup', { email, password });
      setMessage(response.data.message); // Assuming backend sends a success message
      onSuccess(); // Call parent component's success handler
    } catch (error) {
      console.error('Signup failed:', error);
      setErrorMessage('Signup failed. Please try again.'); // Handle error scenario
    }
  };

  return (
    <div className="signup-popup">
      <div className="popup-content">
        <h2>Signup</h2>
        <div className="form-group">
          <label htmlFor="signup-email">Email:</label>
          <input type="email" id="signup-email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="signup-password">Password:</label>
          <input type="password" id="signup-password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="form-group">
          <button onClick={handleSignup}>Signup</button>
          <button onClick={onClose}>Close</button>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default SignupPopup;
