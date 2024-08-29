import React, { useEffect, useState } from 'react';
import useDataStore from '../zustand/dataStore';
import useFetchStore from '../zustand/fetchStore';

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
        console.log('Fetched data:', fetchedData); // Check the fetched data
        setData(fetchedData); // Set the fetched data to the state
      }
    };

    fetchDataForLotNo();
  }, [selectedLot, fetchData]);

  // Render the table with data
  const renderTable = (data: any) => {
    if (!data) return <p>No data available</p>;

    const headers = Object.keys(data);
    const values = Object.values(data);

    return (
      <table>
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {values.map((value, index) => (
              <td key={index}>{String(value)}</td>
            ))}
          </tr>
        </tbody>
      </table>
    );
  };

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

      {/* Render the fetched data in a table */}
      {renderTable(data)}
    </div>
  );
};

export default RoughTable;
