import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignupPopup from './SignupPopup'; // Import SignupPopup component
import '../App.css'; // Adjust the path based on your actual file location

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSignup, setShowSignup] = useState(false); // State to manage SignupPopup visibility
  const navigate = useNavigate();

  const handleSignupSuccess = () => {
    // Handle actions after successful signup, such as closing the popup or redirecting
    setShowSignup(false); // Close the popup after successful signup
    // Additional logic as needed (e.g., showing a success message)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      if (response.status === 200) {
        navigate('/dashboard'); // Redirect to dashboard upon successful login
      } else {
        setError('Login failed'); // Handle other possible errors
      }
    } catch (err) {
      setError('Login failed. Please try again.'); // Handle network errors or other issues
    }
  };

  const handleSignupClick = () => {
    setShowSignup(true); // Display SignupPopup when Signup button is clicked
  };

  return (
    <div className="App">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Create An Account</h2>
          {error && <p className="error-message">{error}</p>}
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="submit">Login</button>
          <button type="button" onClick={handleSignupClick}>Signup</button>
        </form>
      </div>
      {showSignup && (
        <div className="signup-popup">
          <div className="popup-content">
            <SignupPopup onSuccess={handleSignupSuccess} onClose={() => setShowSignup(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
