
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecordPage from './RecordPage';
import VerifyPage from './VerifyPage';
import SuccessPage from './SuccessPage';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      <Routes>
        <Route path="/" element={<RecordPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </div>
  );
};

export default Index;
