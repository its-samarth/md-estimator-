import React, { useEffect } from 'react';
import { useReactTable, getCoreRowModel, ColumnDef, flexRender } from '@tanstack/react-table';
import useDataStore from '../zustand/dataStore';
import useFetchStore from '../zustand/fetchStore';
import './RoughTable.css';

const RoughTable: React.FC = () => {
  // Access data and methods from the store
  const { data, setData, selectedLot, setSelectedLot } = useDataStore(state => ({
    data: state.data,
    setData: state.setData,
    selectedLot: state.selectedLot,
    setSelectedLot: state.setSelectedLot,
  }));

  const { lotNumbers, fetchLotNumbers, fetchData } = useFetchStore(state => ({
    lotNumbers: state.lotNumbers,
    fetchLotNumbers: state.fetchLotNumbers,
    fetchData: state.fetchData,
  }));

  useEffect(() => {
    fetchLotNumbers();
  }, [fetchLotNumbers]);

  useEffect(() => {
    const fetchDataForLotNo = async () => {
      if (selectedLot) {
        const fetchedData = await fetchData(selectedLot);
        //console.log('Fetched data:', fetchedData);
        if (fetchedData) {
          setData([fetchedData]); // Save fetched data to the store
        } else {
          setData([]); // Set to empty if no data is returned
        }
      }
    };

    fetchDataForLotNo();
  }, [selectedLot, fetchData, setData]);

  // Generate columns dynamically based on the data in the store
  const columns: ColumnDef<any>[] = data.length > 0 ? Object.keys(data[0]).map((key) => ({
    accessorKey: key,
    header: key.toUpperCase(),
  })) : [];

  // Initialize table instance using the data from the store
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="container">
      <h1 className="heading">Select LOT NO</h1>

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

      {/* Render table using TanStack */}
      <div>
        {data.length > 0 ? (
          <table className="table">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="header-row">
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="header-cell">
                      {flexRender(header.column.columnDef.header, header.getContext())}
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
        ) : (
          <p>No data available. Please select a LOT NO.</p>
        )}
      </div>
    </div>
  );
};

export default RoughTable;
