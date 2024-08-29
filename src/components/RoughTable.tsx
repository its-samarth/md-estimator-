import React, { useEffect, useState } from 'react';
import { useReactTable, getCoreRowModel, ColumnDef, flexRender } from '@tanstack/react-table';
import axios from 'axios';
import './RoughData.css';  // Import the CSS file

interface DataRow {
  [key: string]: any; // Represents a dynamic object with string keys
}

const RoughTable: React.FC = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const [columns, setColumns] = useState<ColumnDef<DataRow, any>[]>([]);
  const [lotNumbers, setLotNumbers] = useState<string[]>([]);
  const [selectedLot, setSelectedLot] = useState<string>('');

  // Fetch LOT NOs for the dropdown
  useEffect(() => {
    const fetchLotNumbers = async () => {
      try {
        const response = await axios.get<string[]>('http://localhost:5000/api/data/lot-numbers');
        setLotNumbers(response.data);
      } catch (error) {
        console.error('Error fetching lot numbers:', error);
      }
    };

    fetchLotNumbers();
  }, []);

  // Fetch data based on selected LOT NO
  useEffect(() => {
    if (selectedLot) {
      const fetchData = async () => {
        try {
          const response = await axios.get<DataRow>(`http://localhost:5000/api/data/rough-table-singledata?lotNo=${selectedLot}`);
          const row = response.data;

          if (row) {
            const columnDefs: ColumnDef<DataRow, any>[] = Object.keys(row).map(key => ({
              accessorKey: key,
              header: key,
            }));

            setColumns(columnDefs);
            setData([row]); // Set data as an array with one row
          } else {
            setData([]); // Clear data if no row found
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [selectedLot]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="container">
      <h1 className="heading">Rough Data Table</h1>

      {/* Dropdown for selecting LOT NO */}
      <div className="dropdown-container">
        <label htmlFor="lot-select">Select LOT NO:</label>
        <select
          id="lot-select"
          value={selectedLot}
          onChange={(e) => setSelectedLot(e.target.value)}
        >
          <option value="">-- Select a LOT NO --</option>
          {lotNumbers.map((lotNo) => (
            <option key={lotNo} value={lotNo}>
              {lotNo}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
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

export default RoughTable;
