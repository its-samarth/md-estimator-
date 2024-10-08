import React, { useEffect, useState } from 'react';
import { useReactTable, getCoreRowModel, ColumnDef, flexRender, CellContext } from '@tanstack/react-table';
import axios from 'axios';
import './EstimatorTable.css';
import useDataStore from '../zustand/dataStore';
import { calculateColumnSum, calculateColumnAverage } from '../calculations/CalcOps';

interface DataRow {
  [key: string]: any;
}

const COLUMN_HEADERS = {
  ab:'ab',
  pcs: 'pcs',
  crt: 'crt',
  size: 'size',
};

const EstimatorTable: React.FC = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const [columns, setColumns] = useState<ColumnDef<DataRow, any>[]>([]);
  const [sums, setSums] = useState<{ [key: string]: number }>({
    pcs: 0,
    crt: 0,
    size: 0,
  });

  const { storedata } = useDataStore((state) => ({
    storedata: state.data,
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DataRow[]>('http://localhost:5000/api/data/estimator');
        const rows = response.data;

        if (rows.length > 0) {
          const columnDefs: ColumnDef<DataRow, any>[] = Object.keys(rows[0]).map((key) => ({
            accessorKey: key,
            header: key,
            cell: EditableCell,
          }));

          setColumns(columnDefs);
          setData(rows);
          updateSums(rows); // Initialize sums when data is fetched
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    updateSums(data); // Update sums when data changes
  }, [data]);

  const updateSums = (data: DataRow[]) => {
    const pcsSum = calculateColumnSum(data, 'pcs');
    const crtSum = calculateColumnSum(data, 'crt');
    const sizeSum = calculateColumnAverage(data, 'size');

    setSums({
      pcs: pcsSum,
      crt: crtSum,
      size: sizeSum,
    });
  };

  const DefaultCell = ({ getValue }: CellContext<DataRow, any>) => {
    return <span>{getValue()}</span>;
  };

  const EditableCell = ({ getValue, row, column }: CellContext<DataRow, any>) => {
    const initialValue = getValue();
    const [editableValue, setEditableValue] = useState(initialValue);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditableValue(e.target.value);
    };

    const handleBlur = () => {
      const newValue = editableValue;

      // Update the data state
      setData(prevData => {
        const updatedData = prevData.map((item, index) => {
          if (index === row.index) {
            return { ...item, [column.id]: newValue };
          }
          return item;
        });

        return updatedData;
      });
    };

    return (
      <input
        type="text"
        value={editableValue ?? ''}
        onChange={handleChange}
        onBlur={handleBlur}
        className="editable-cell"
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
        <pre>{JSON.stringify(storedata)}</pre>
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
          {table.getRowModel().rows.map((row, rowIndex) => (
            <tr key={row.id} className="body-row">
              {row.getVisibleCells().map(cell => {
                const header = cell.column.columnDef.header as string;

                return (
                  <td key={cell.id} className="body-cell">
                    {rowIndex === table.getRowModel().rows.length - 1 ? (
                      // Display sums in the last row
                      {
                        [COLUMN_HEADERS['ab']]: "all",
                        [COLUMN_HEADERS['pcs']]: sums.pcs,
                        [COLUMN_HEADERS['crt']]: sums.crt,
                        [COLUMN_HEADERS['size']]: sums.size,
                      }[header] ?? null
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EstimatorTable;
