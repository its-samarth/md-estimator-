import React, { useState } from 'react';
import axios from 'axios';

const ConnectionTester: React.FC = () => {
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const testConnection = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/test-connection'); // Corrected API path
      setStatus(response.data.message);
    } catch (error) {
      setStatus(`Error: ${(error as any).response?.data?.message || 'Unable to connect'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>PostgreSQL Connection Tester</h1>
      <button onClick={testConnection} disabled={loading}>
        {loading ? 'Testing...' : 'Test Connection'}
      </button>
      <p>Status: {status}</p>
    </div>
  );
};

export default ConnectionTester;
