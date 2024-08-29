import React, { useState, useRef } from "react";
import { calculateColumnAverage, calculateColumnSum, updateData } from "../calculations/UpdateData";

// Define column headers
export const headers = [
  "AS NAM",
  "AB",
  "PCS(default)",
  "CRT()",
  "SIZE()",
  "GD%()",
  "FEEL",
  "PCS",
  "CRT",
  "SIZE",
  "GDS%",
  "SH",
  "CO",
  "PUR",
  "FL",
  "CUT",
  "WT%",
  "P.CRT",
  "POL AM",
  "FL %",
  "AVG",
  "GD%",
  "PCS1",
  "CRT1",
  "SIZE1",
  "GDS%1",
  "SH1",
  "CO1",
  "PUR1",
  "FL1",
  "CUT1",
  "WT%1",
  "P.CRT1",
  "POL AM1",
  "FL %1",
  "AVG1",
  "GD%1",
  "AVG og",
  "+ -",
  "AVG +-",
  "ANT AVG",
  "RBC",
  "FAN",
  "WT% final",
];

var calpcs = 45,
  calcarat = 250,
  calsize = 5.58,
  est = 2393;

// Define rows for the "AB" column
export const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J","all"];
const feelrows = [
    1,
    2,
    3.1,
    3.2,
    3.3,
    4.1,
    4.2,
    4.3,
    5.1
  ];
  
// Rows with red borders
const redBorderRows = new Set(["A", "B", "E", "H", "I", "J"]);

const MainTable: React.FC = () => {
  // Initialize data with empty strings
  const initialData = rows.reduce(
    (acc, row) => ({
      ...acc,
      [row]: headers.reduce(
        (obj, header) => ({
          ...obj,
          [header]: "",
        }),
        {}
      ),
    }),
    {} as { [key: string]: { [key: string]: string } }
  );

  const [data, setData] = useState(initialData);
  const firstCellRef = useRef<HTMLInputElement | null>(null);

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && firstCellRef.current) {
      const value = firstCellRef.current.value;
      setData((prevData) => ({
        ...prevData,
        ...Object.fromEntries(
          rows.map((row) => [row, { ...prevData[row], "AS NAM": value }])
        ),
      }));
      // Optionally, blur the input to remove focus after pressing Enter
      firstCellRef.current.blur();
    }
  };
/*const updateData = (row: string, header: string, value: string) => {
    setData((prevData) => {
      const updatedRow = { ...prevData[row], [header]: value };

      // Perform division if necessary
      if (header === "CRT()" || header === "PCS(default)") {
        const crtValue = parseFloat(updatedRow["CRT()"] || "0");
        const pcsValue = parseFloat(updatedRow["PCS(default)"] || "0");

        const sizeValue =
          pcsValue !== 0 ? (crtValue / pcsValue).toFixed(2) : "0"; // Avoid division by zero

        updatedRow["SIZE()"] = sizeValue; // Update the 'SIZE' column with the result
      }
      if (header === 'CRT()') {
        const crtValue = parseFloat(value || '0');
        const gdPercentage = calcarat !== 0 ? ((crtValue / calcarat) * 100).toFixed(2) + '%' : '0%'; // Format as percentage
        updatedRow['GD%()'] = gdPercentage; // Update the 'GD%()' column with the result
      }

      return { ...prevData, [row]: updatedRow };
    });
  };
*/  
  const containerStyle: React.CSSProperties = {
    overflowX: "auto", // Enable horizontal scrolling
    maxWidth: "100%",
  };

  const tableStyle: React.CSSProperties = {
    width: "max-content", // Allow the table to grow based on content
    borderCollapse: "collapse",
  };

  const thStyle: React.CSSProperties = {
    border: "1px solid #ddd",
    padding: "8px",
    backgroundColor: "#f4f4f4",
    textAlign: "left",
    position: "sticky",
    top: 0,
    zIndex: 2, // Make sure header is above content
  };

  const tdStyle: React.CSSProperties = {
    border: "1px solid #ddd",
    padding: "8px",
  };

  const fixedHeaderCellStyle: React.CSSProperties = {
    position: "sticky",
    top: 0,
    zIndex: 2,
    backgroundColor: "#f4f4f4", // Matching header background color
  };

  const fixedCellStyle: React.CSSProperties = {
    position: "sticky",
    left: 0,
    backgroundColor: "#e0f7fa", // Consistent background for cells
    zIndex: 1,
  };

  const rowBorderStyle: React.CSSProperties = {
    borderBottom: "2px solid red", // Red border for specified rows
  };

  // Define column width styles
  const columnWidths: { [key: string]: React.CSSProperties } = {
    "AS NAM": { width: "100px" },
    AB: { width: "50px" },
    // Default width for all other columns
    default: { width: "50px" },
  };

  

  const pcsDefaultSum = calculateColumnSum(data, 'PCS(default)');
  const crtSum = calculateColumnSum(data, 'CRT()');
  const sizeSum = calculateColumnAverage(data, 'SIZE()');
  const gdPercentageSum = calculateColumnSum(data, 'GD%()');
  const pcsSum = calculateColumnSum(data, 'PCS');
  const crtSumAlt = calculateColumnSum(data, 'CRT');
  const sizeSumAlt = calculateColumnAverage(data, 'SIZE');
  const gdsSum = calculateColumnSum(data, 'GDS%');

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
                  ...(columnWidths[header] || {}), // Apply column width styles
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
                    ...(columnWidths[header] || columnWidths['default']), // Apply column width styles
                    ...(header === 'AS NAM' || header === 'AB'
                      ? fixedCellStyle
                      : {}),
                  }}
                >
                  {header === 'AS NAM' && rowIndex === 0 ? (
                    <input
                      type="text"
                      ref={firstCellRef}
                      value={data[row]['AS NAM']}
                      onChange={(e) =>
                        setData((prevData) => ({
                          ...prevData,
                          ...Object.fromEntries(
                            rows.map((row) => [
                              row,
                              { ...prevData[row], 'AS NAM': e.target.value },
                            ])
                          ),
                        }))
                      }
                      onKeyDown={handleEnter}
                      style={{
                        width: '100%',
                        border: 'none',
                        background: 'transparent',
                      }}
                    />
                  ) : header === 'AB' ? (
                    row === 'all' ? (
                      row
                    ) : (
                      data[row][header]
                    )
                  ) : (
                    <input
                      type="text"
                      value={data[row][header]}
                      onChange={(e) =>
                        updateData(
                          row,
                          header,
                          e.target.value,
                          setData,
                          calcarat,
                          
                        )
                      }
                      style={{
                        width: '100%',
                        border: 'none',
                        background: 'transparent',
                      }}
                    />
                  )}
                  {row === 'all' && (
                    {
                      'PCS(default)': pcsDefaultSum,
                      'CRT()': crtSum,
                      'SIZE()': sizeSum,
                      'GD%()': gdPercentageSum,
                      'PCS': pcsSum,
                      'CRT': crtSumAlt,
                      'SIZE': sizeSumAlt,
                      'GDS%': gdsSum
                    }[header] || null
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