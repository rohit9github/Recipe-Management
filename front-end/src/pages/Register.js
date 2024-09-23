// Register.js
import React, { useState } from 'react';
import { registerUser } from '../api/api'; // Adjust the import based on your file structure

const Register = ({ setToken }) => {
  const [userData, setUserData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(userData);
      setToken(data.token); // Assuming your API returns a token
      setError(''); // Clear any previous error
    } catch (error) {
      // Handle the error properly
      if (error.response) {
        // Server responded with a status other than 200
        setError(error.response.data.message || 'Registration failed');
      } else {
        // Other errors (e.g., network issues)
        setError('Network error. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={userData.username}
        onChange={handleChange}
        placeholder="Username"
        required
      />
      <input
        type="password"
        name="password"
        value={userData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <button type="submit">Register</button>
      {error && <p className="error">{error}</p>} {/* Display error message */}
    </form>
  );
};

export default Register;
