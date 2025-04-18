import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './components/RegisterForm'; // Register form
import LoginForm from './components/LoginForm';     // Login form
import Dashboard from './components/Dashboard';    // Dashboard for authenticated users

const App = () => {
  return (
    <Router>
      <div>
        <h1>Welcome to GandadaGudi</h1>
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
