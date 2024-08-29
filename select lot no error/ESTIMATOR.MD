import React, { useEffect, useState } from 'react';
import { useReactTable, getCoreRowModel, ColumnDef, flexRender, CellContext } from '@tanstack/react-table';
import axios from 'axios';
import './EstimatorTable.css';
import useDataStore from '../zustand/dataStore';
import { calculateColumnSum, calculateColumnAverage } from '../calculations/CalcOps';

interface DataRow {
  [key: string]: any; // Represents a dynamic object with string keys
}

const EstimatorTable: React.FC = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const [columns, setColumns] = useState<ColumnDef<DataRow, any>[]>([]);
  const { storedata, selectedLot } = useDataStore((state) => ({
    storedata: state.data,
    selectedLot: state.selectedLot,
  }));


  const row = storedata[0]|| {}; // Using the first row for calculations; adjust as needed
 
  const { pcs = 0, carat = 0, est = 0, size = 0 } = row; // Provide default values to prevent errors
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DataRow[]>('http://localhost:5000/api/data/estimator');
        const rows = response.data;

        if (rows.length > 0) {
          // Dynamically create column definitions
          const columnDefs: ColumnDef<DataRow, any>[] = Object.keys(rows[0]).map((key, index) => ({
            accessorKey: key,
            header: key,
            cell: index >= 3 ? EditableCell : DefaultCell, // Editable only for columns after the first 3
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

  // Default cell component for non-editable cells
  const DefaultCell = ({ getValue }: CellContext<DataRow, any>) => {
    return <span>{getValue()}</span>;
  };

  // Editable cell component
  const EditableCell = ({ getValue, row, column }: CellContext<DataRow, any>) => {
    const initialValue = getValue();
    const [editableValue, setEditableValue] = useState(initialValue);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditableValue(e.target.value);
      // Optionally, handle the updated value, e.g., send it to an API or update state
    };

    return (
      <input
        type="text"
        value={editableValue ?? ''}
        onChange={handleChange}
        className="editable-cell" // Apply editable cell styling
      />
    );
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="container">
      
      <h1 className="heading">Estimator Data Table</h1>
      
    
      <div>
  
        <h2>Data</h2>
        <pre>{JSON.stringify(storedata, null)}</pre>
        <pre>{JSON.stringify(selectedLot, null, 2)}</pre>
      </div>
     
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

export default EstimatorTable;
