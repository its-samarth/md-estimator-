import React from 'react';

// Define column headers
const headers = [
  'AB', 'AVG', '+ -', 'AVG', 'ANT AVG', 'RBC', 'FAN', 'WT%'
];

// Define rows for the AB column
const abRows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

// Define 10 empty rows for other columns
const otherRows = Array.from({ length: 10 }, (_, index) => index + 1);

const AverageTable: React.FC = () => {
  return (
    <div>
      <h1>Average Table</h1>
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
          {abRows.map((ab, rowIndex) => (
            <tr key={rowIndex}>
              <td style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#e0f7fa' }}>
                {ab}
              </td>
              {headers.slice(1).map((_, colIndex) => (
                <td key={colIndex} style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#e0f7fa' }}>
                  {/* Cell content can be added here */}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AverageTable;
