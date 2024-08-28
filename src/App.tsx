// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ImportExport from './pages/ImportExport';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ImportExport />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
