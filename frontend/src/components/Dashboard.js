import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom'; // Use Navigate instead of Redirect

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You need to log in first');
      return;
    }

    axios
      .get('/api/protected', { headers: { 'x-auth-token': token } })
      .then(response => setUserData(response.data))
      .catch(err => setError(err.response?.data?.msg || 'Something went wrong'));
  }, []);

  if (error) {
    return <Navigate to="/login" />; // Redirect to login if no token
  }

  return (
    <div>
      <h2>Dashboard</h2>
      {userData ? (
        <div>
          <h3>Welcome, {userData.name}</h3>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
