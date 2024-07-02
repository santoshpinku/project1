import React, { useState } from 'react';
import axios from 'axios';

function SignupPopup({ onSuccess, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/signup', { email, password });
      setMessage(response.data.message); // Assuming backend sends a success message
      onSuccess(); // Call parent component's success handler
    } catch (error) {
      console.error('Signup failed:', error);
      setMessage('Signup failed. Please try again.'); // Handle error scenario
    }
  };

  return (
    <div className="signup-popup">
      <div className="popup-content">
        <h2>Signup</h2>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button onClick={handleSignup}>Signup</button>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default SignupPopup;
