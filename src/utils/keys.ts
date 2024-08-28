// keyNavigationUtils.ts
import { headers, rows } from '../Estimator components/MainTable'; // Update the path accordingly

export const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, row: string, header: string) => {
  const rowIndex = rows.indexOf(row);
  const colIndex = headers.indexOf(header);

  switch (e.key) {
    case 'ArrowDown':
      if (rowIndex < rows.length - 1) {
        const nextRow = rows[rowIndex + 1];
        const nextCell = document.querySelector(`td[data-row="${nextRow}"][data-header="${header}"] input`) as HTMLInputElement | null;
        nextCell?.focus();
      }
      break;
    case 'ArrowUp':
      if (rowIndex > 0) {
        const prevRow = rows[rowIndex - 1];
        const prevCell = document.querySelector(`td[data-row="${prevRow}"][data-header="${header}"] input`) as HTMLInputElement | null;
        prevCell?.focus();
      }
      break;
    case 'ArrowLeft':
      if (colIndex > 0) {
        const prevHeader = headers[colIndex - 1];
        const prevCell = document.querySelector(`td[data-row="${row}"][data-header="${prevHeader}"] input`) as HTMLInputElement | null;
        prevCell?.focus();
      }
      break;
    case 'ArrowRight':
      if (colIndex < headers.length - 1) {
        const nextHeader = headers[colIndex + 1];
        const nextCell = document.querySelector(`td[data-row="${row}"][data-header="${nextHeader}"] input`) as HTMLInputElement | null;
        nextCell?.focus();
      }
      break;
    case 'Enter':
      e.preventDefault(); // Prevent default Enter key behavior
      if (rowIndex < rows.length - 1) {
        const nextRow = rows[rowIndex + 1];
        const nextCell = document.querySelector(`td[data-row="${nextRow}"][data-header="${header}"] input`) as HTMLInputElement | null;
        nextCell?.focus();
      }
      break;
  }
};
