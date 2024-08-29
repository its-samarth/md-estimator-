import React, { useEffect, useState } from 'react';
import { useReactTable, getCoreRowModel, ColumnDef, flexRender } from '@tanstack/react-table';
import useDataStore from '../zustand/dataStore';
import useFetchStore from '../zustand/fetchStore';
import './RoughTable.css'

const RoughTable: React.FC = () => {
  const { selectedLot, setSelectedLot } = useDataStore(state => ({
    selectedLot: state.selectedLot,
    setSelectedLot: state.setSelectedLot,
  }));

  const { lotNumbers, fetchLotNumbers, fetchData } = useFetchStore(state => ({
    lotNumbers: state.lotNumbers,
    fetchLotNumbers: state.fetchLotNumbers,
    fetchData: state.fetchData,
  }));

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchLotNumbers();
  }, [fetchLotNumbers]);

  useEffect(() => {
    const fetchDataForLotNo = async () => {
      if (selectedLot) {
        const fetchedData = await fetchData(selectedLot);
        console.log('Fetched data:', fetchedData);
        setData([fetchedData]); // Wrap the fetched data in an array for the table
      }
    };

    fetchDataForLotNo();
  }, [selectedLot, fetchData]);

  const columns: ColumnDef<any>[] = data ? Object.keys(data[0]).map((key) => ({
    accessorKey: key,
    header: key.toUpperCase(),
  })) : [];

  const table = useReactTable({
    data: data || [], // Provide an empty array if data is null
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
      </div>
    </div>
  );
};

export default RoughTable;
