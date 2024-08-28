import React from 'react';
import { useReactTable, getCoreRowModel, ColumnDef, flexRender } from '@tanstack/react-table';

// Define the data type
interface DataRow {
  [key: string]: any;
}

// Define columns
const columns: ColumnDef<DataRow, any>[] = [
  { accessorKey: 'lotNo', header: 'LOT NO' },
  { accessorKey: 'no', header: 'NO' },
  { accessorKey: 'pcs', header: 'PCS' },
  { accessorKey: 'carat', header: 'CARAT' },
  { accessorKey: 'size', header: 'SIZE' },
  { accessorKey: 'est', header: 'EST' },
  { accessorKey: 'desInvReal', header: 'DES (INV-REAL)' },
  { accessorKey: 'desName', header: 'DES (NAME)' },
  { accessorKey: 'buyerName', header: 'BUYER NAME:' },
  { accessorKey: 'sizeFrTo', header: 'SIZE FR-TO' },
  { accessorKey: 'origin', header: 'ORIGIN' },
  { accessorKey: 'mine', header: 'MINE' },
  { accessorKey: 'party', header: 'PARTY' },
  { accessorKey: 'country', header: 'COUNTRY' },
  { accessorKey: 'tenderLocSite', header: 'TENDER/LOC/SITE' },
  { accessorKey: 'date', header: 'DATE' },
  { accessorKey: 'boxNo', header: 'BOX NO:' },
];

// Sample data
const data: DataRow[] = [
  {
    lotNo: 'AC267',
    no: 267,
    pcs: 30,
    carat: 170.27,
    size: 5.68,
    est: 2931.76,
    desInvReal: '0',
    desName: 'Z HIGH 1ST WHT',
    buyerName: '0',
    sizeFrTo: '5-10',
    origin: 'CAN',
    mine: 'BON-MPV',
    party: '',
    country: '',
    tenderLocSite: '',
    date: '31-7-24',
    boxNo: '0',
  },
];

// Define inline styles using CSSProperties from React
const tableStyles: { [key: string]: React.CSSProperties } = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    border: '1px solid #ddd',
    padding: '8px',
    backgroundColor: '#f4f4f4',
    textAlign: 'left',
  },
  td: {
    border: '1px solid #ddd',
    padding: '8px',
    backgroundColor: '#e0f7fa',
    textAlign: 'left',
  },
};

const HeaderTable: React.FC = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <h1>Horizontal Table with Data</h1>
      <table style={tableStyles.table}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} style={tableStyles.th}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} style={tableStyles.td}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HeaderTable;
