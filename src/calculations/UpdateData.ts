// Import the rows from your component
import { log } from "console";
import { rows } from "../Estimator components/MainTable";

export const updateData = (
  row: string,
  header: string,
  value: string,
  setData: React.Dispatch<React.SetStateAction<{ [key: string]: { [key: string]: string } }>>,
  calcarat: number,

 
) => {
  setData((prevData) => {
    const updatedRow = { ...prevData[row], [header]: value };

    // Perform division for CRT() and PCS(default)
    if (header === "CRT()" || header === "PCS(default)") {
      const crtValue = parseFloat(updatedRow["CRT()"] || "0");
      const pcsValue = parseFloat(updatedRow["PCS(default)"] || "0");
  
      const sizeValue = pcsValue !== 0 ? (crtValue / pcsValue).toFixed(2) : "0"; // Avoid division by zero
      updatedRow["SIZE()"] = sizeValue; // Update the 'SIZE()' column
    }

    // Calculate GD%() if header is CRT()
    if (header === 'CRT()') {
      const crtValue = parseFloat(value || '0');
      const gdPercentage = calcarat !== 0 ? ((crtValue / calcarat) * 100).toFixed(2) + '%' : '0%'; // Format as percentage
      updatedRow['GD%()'] = gdPercentage; // Update the 'GD%()' column
    }

    // Perform division for CRT and PCS
    if (header === "CRT" || header === "PCS") {
      const crtValue = parseFloat(updatedRow["CRT"] || "0");
      const pcsValue = parseFloat(updatedRow["PCS"] || "0");
  
      const sizeValue = pcsValue !== 0 ? (crtValue / pcsValue).toFixed(2) : "0"; // Avoid division by zero
      updatedRow["SIZE"] = sizeValue; // Update the 'SIZE' column
    }

    // Calculate GDS% if header is CRT
   
      
      
  
    return { ...prevData, [row]: updatedRow };
  });
};

// Function to calculate the column sum
export const calculateColumnSum = (data: { [key: string]: { [key: string]: string } }, column: string): number => {
  const sum = rows.reduce((acc, row) => {
    const value = parseFloat(data[row][column]) || 0; // Convert to number and handle NaN
    return acc + value;
  }, 0);
  return parseFloat(sum.toFixed(3));
};

export const calculateColumnAverage = (data: { [key: string]: { [key: string]: string } }, column: string): number => {
    let totalValue = 0;
    let count = 0;
  
    rows.forEach((row) => {
      const value = parseFloat(data[row][column]) || 0;
      if (!isNaN(value) && value !== 0) {
        totalValue += value;
        count++;
      }
    });
  
    // Avoid division by zero if no valid cells are found
    return count > 0 ? parseFloat((totalValue / count).toFixed(3)) : 0;
  };
  
  
