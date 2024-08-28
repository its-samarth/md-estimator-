import React from 'react';

// Define column headers
const headers = [
  'AB', // Added 'AB' column
  'PCS', 'CRT', 'SIZE', 'GDS%', 'SH', 'CO', 'PUR', 'FL', 'CUT', 'WT%', 'P.CRT', 'POL AM',
  'FL %', 'AVG', 'GD%'
];

// Define rows with 'AB' values from A to J
const rows = [
  { ab: 'A' }, { ab: 'B' }, { ab: 'C' }, { ab: 'D' }, { ab: 'E' },
  { ab: 'F' }, { ab: 'G' }, { ab: 'H' }, { ab: 'I' }, { ab: 'J' }
];

const CalculationTable: React.FC = () => {
  return (
    <div>
      <h1>Calculation Table</h1>
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
                <td key={colIndex} style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#e0f7fa' }}>
                  {header === 'AB' ? row.ab : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CalculationTable;
