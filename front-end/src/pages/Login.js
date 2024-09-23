    // src/pages/Login.js
import React, { useState } from 'react';
import { loginUser } from '../api/api';

const Login = ({ setToken }) => {
  const [userData, setUserData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await loginUser(userData);
    setToken(data.token);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={userData.password}
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
