import React, { useEffect, useState } from 'react';
import { useReactTable, getCoreRowModel, ColumnDef, flexRender } from '@tanstack/react-table';
import axios from 'axios';

interface DataRow {
  [key: string]: any; // Represents a dynamic object with string keys
}

const DataTable: React.FC = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const [columns, setColumns] = useState<ColumnDef<DataRow, any>[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DataRow[]>('http://localhost:5000/api/data');
        const rows = response.data;

        if (rows.length > 0) {
          const columnDefs: ColumnDef<DataRow, any>[] = Object.keys(rows[0]).map(key => ({
            accessorKey: key,
            header: key,
          }));

          setColumns(columnDefs);
          setData(rows);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <h1>Data Table</h1>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
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

export default DataTable;
