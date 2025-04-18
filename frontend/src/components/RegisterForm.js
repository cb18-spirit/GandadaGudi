import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For redirection after successful registration

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/api/auth/register', { name, email, password });
      alert(response.data.msg); // Show success message
      navigate('/login'); // Redirect to login page after successful registration
    } catch (err) {
      setError(err.response?.data?.msg || 'Something went wrong');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input 
            type="text" 
            name="name" 
            placeholder="Full Name" 
            value={name} 
            onChange={handleChange} 
            required 
          />
        </div>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
