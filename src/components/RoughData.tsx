import React, { useEffect, useState } from 'react';
import { useReactTable, getCoreRowModel, ColumnDef, flexRender } from '@tanstack/react-table';
import axios from 'axios';
import './RoughData.css';  // Import the CSS file

interface DataRow {
  [key: string]: any; // Represents a dynamic object with string keys
}

const RoughData: React.FC = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const [columns, setColumns] = useState<ColumnDef<DataRow, any>[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DataRow[]>('http://localhost:5000/api/data/estimator');
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
    <div className="container">
      <h1 className="heading">Estimator Data Table</h1>
      <table className="table">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className="header-row">
              {headerGroup.headers.map(header => (
                <th key={header.id} className="header-cell">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="body-row">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="body-cell">
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

export default RoughData;
