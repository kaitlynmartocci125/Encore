import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Callback from './components/Callback';
import Dashboard from './components/Dashboard'; // ✅ Add this line

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* ✅ Add this route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
