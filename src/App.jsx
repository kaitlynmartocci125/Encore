import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Callback from './components/Callback';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/callback" element={<Callback />} />
    </Routes>
  );
}

export default App;
