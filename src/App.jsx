import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Callback from './Callback';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/callback" element={<Callback />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
