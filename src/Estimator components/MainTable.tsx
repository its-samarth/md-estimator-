import React, { useState, useRef } from 'react';

// Define column headers
const headers = [
  'AS NAM', 'AB', 'PCS', 'CRT', 'SIZE', 'GD%', 'FEEL', 'PCS', 'CRT', 'SIZE', 'GDS%',
  'SH', 'CO', 'PUR', 'FL', 'CUT', 'WT%', 'P.CRT', 'POL AM', 'FL %', 'AVG', 'GD%',
  'PCS', 'CRT', 'SIZE', 'GDS%', 'SH', 'CO', 'PUR', 'FL', 'CUT', 'WT%', 'P.CRT',
  'POL AM', 'FL %', 'AVG', 'GD%', 'AVG', '+ -', 'AVG', 'ANT AVG', 'RBC', 'FAN', 'WT%'
];

// Define rows for the "AB" column
const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

// Rows with red borders
const redBorderRows = new Set(['A', 'B', 'E', 'H', 'I']);

const MainTable: React.FC = () => {
  // Initialize data with empty strings
  const initialData = rows.reduce((acc, row) => ({
    ...acc,
    [row]: { 'AS NAM': '', 'AB': '', /* Add other columns as needed */ }
  }), {} as { [key: string]: { [key: string]: string } });

  const [data, setData] = useState(initialData);
  const firstCellRef = useRef<HTMLInputElement | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && firstCellRef.current) {
      const value = firstCellRef.current.value;
      setData(prevData => ({
        ...prevData,
        ...Object.fromEntries(
          rows.map(row => [row, { ...prevData[row], 'AS NAM': value }])
        )
      }));
      // Optionally, blur the input to remove focus after pressing Enter
      firstCellRef.current.blur();
    }
  };

  const containerStyle: React.CSSProperties = {
    overflowX: 'auto', // Enable horizontal scrolling
    maxWidth: '100%',
  };

  const tableStyle: React.CSSProperties = {
    width: 'max-content', // Allow the table to grow based on content
    borderCollapse: 'collapse',
  };

  const thStyle: React.CSSProperties = {
    border: '1px solid #ddd',
    padding: '8px',
    backgroundColor: '#f4f4f4',
    textAlign: 'left',
    position: 'sticky',
    top: 0,
    zIndex: 2, // Make sure header is above content
  };

  const tdStyle: React.CSSProperties = {
    border: '1px solid #ddd',
    padding: '8px',
    backgroundColor: '#e0f7fa',
  };

  const fixedHeaderCellStyle: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 2,
    backgroundColor: '#f4f4f4', // Matching header background color
  };

  const fixedCellStyle: React.CSSProperties = {
    position: 'sticky',
    left: 0,
    backgroundColor: '#e0f7fa', // Consistent background for cells
    zIndex: 1,
  };

  const rowBorderStyle: React.CSSProperties = {
    borderBottom: '2px solid red', // Red border for specified rows
  };

  return (
    <div style={containerStyle}>
      <h1>Main Table</h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                style={{
                  ...thStyle,
                  ...(index === 0 || index === 1 ? fixedHeaderCellStyle : {}),
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              style={redBorderRows.has(row) ? rowBorderStyle : {}}
            >
              {headers.map((header, colIndex) => (
                <td
                  key={colIndex}
                  style={{
                    ...tdStyle,
                    ...(colIndex === 0 || colIndex === 1 ? fixedCellStyle : {}),
                  }}
                >
                  {header === 'AS NAM' && rowIndex === 0 ? (
                    <input
                      type="text"
                      ref={firstCellRef}
                      value={data[row]['AS NAM']}
                      onChange={(e) => setData(prevData => ({
                        ...prevData,
                        [row]: { ...prevData[row], 'AS NAM': e.target.value }
                      }))}
                      onKeyDown={handleKeyDown}
                      style={{ width: '100%', border: 'none', background: 'transparent' }}
                    />
                  ) : (
                    colIndex === 1 ? row : data[row][header] // Display 'AB' values or other data
                  )}
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
