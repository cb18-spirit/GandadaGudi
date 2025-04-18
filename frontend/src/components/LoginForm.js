import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use useNavigate here

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token); // Store JWT token in localStorage
      navigate('/dashboard'); // Redirect to the dashboard page after login
    } catch (err) {
      setError(err.response?.data?.msg || 'Something went wrong');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={password} 
            onChange={handleChange} 
            required 
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
