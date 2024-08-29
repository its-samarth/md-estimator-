// calculations.ts

export const calculateColumnSum = (data: any[], column: string): number => {
    return data.reduce((acc, row) => {
      const value = parseFloat(row[column]) || 0;
      return acc + value;
    }, 0);
  };
  
  export const calculateColumnAverage = (data: any[], column: string): number => {
    let totalValue = 0;
    let count = 0;
  
    data.forEach(row => {
      const value = parseFloat(row[column]) || 0;
      if (!isNaN(value) && value !== 0) {
        totalValue += value;
        count++;
      }
    });
  
    
  const average = count > 0 ? totalValue / count : 0;
  return parseFloat(average.toFixed(2)); // Return rounded average
};
  

export const calculateSize = (data: any[]): any[] => {
    return data.map(row => {
      const pcs = parseFloat(row['pcs']) || 0;
      const crt = parseFloat(row['crt']) || 0;
  
      if (pcs > 0 && crt > 0) {
        return {
          ...row,
          size: (crt / pcs).toFixed(2)  // Calculate size and round to 2 decimals
        };
      }
      return row;
    });
  };