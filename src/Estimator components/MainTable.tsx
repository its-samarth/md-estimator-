import React from 'react';

// Define column headers
const headers = [
  'AS NAM', 'AB', 'PCS', 'CRT', 'SIZE', 'GD%', 'FEEL'
];

// Define rows
const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

const MainTable: React.FC = () => {
  return (
    <div>
      <h1>Main Table</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f4f4f4', textAlign: 'left' }}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <td key={colIndex} style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: colIndex === 1 ? '#e0f7fa' : 'transparent' }}>
                  {colIndex === 1 ? row : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MainTable;
