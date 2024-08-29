import React from 'react';
import useDataStore from '../zustand/dataStore';


const TrialComponent: React.FC = () => {
  // Retrieve the data and columns from the Zustand store
  const { data, columns, selectedLot } = useDataStore((state) => ({
    data: state.data,
    columns: state.columns,
    selectedLot: state.selectedLot,
  }));

  return (
    <div>
      <h1>Stored Data Display</h1>

      {/* Display Selected Lot */}
      <div>
        <strong>Selected Lot:</strong> {selectedLot || 'None'}
      </div>

      {/* Display Columns */}
      <div>
        <h2>Columns</h2>
        <pre>{JSON.stringify(columns, null, 2)}</pre>
      </div>

      {/* Display Data */}
      <div>
        <h2>Data</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default TrialComponent;
