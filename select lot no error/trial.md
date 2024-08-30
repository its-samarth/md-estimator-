import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridCellEditStopParams } from '@mui/x-data-grid';
import axios from 'axios';
import './EstimatorTable.css';
import useDataStore from '../zustand/dataStore';
import { calculateColumnSum, calculateColumnAverage } from '../calculations/CalcOps';

interface DataRow {
  id: number;
  pcs?: number;
  carat?: number;
  est?: number;
  size?: number;
  [key: string]: any;
}



const Trial: React.FC = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [pcs, setPcs] = useState<number | undefined>(undefined);
  const [carat, setCarat] = useState<number | undefined>(undefined);
  const [est, setEst] = useState<number | undefined>(undefined);
  const [size, setSize] = useState<number | undefined>(undefined);

  
  const { storedata } = useDataStore((state) => ({
    storedata: state.data,
  }));

  useEffect(() => {
    if (storedata.length > 0) {
      const [item] = storedata; // Extract the first item

      setPcs(item.pcs);
      setCarat(item.carat);
      setEst(item.est);
      setSize(item.size);
    }
  }, [storedata]);

  

  useEffect(() => {

    

    const fetchData = async () => {
      try {
        const response = await axios.get<DataRow[]>('http://localhost:5000/api/data/estimator');
        const rows = response.data;

        if (rows.length > 0) {
          const columnDefs: GridColDef[] = Object.keys(rows[0]).map((key) => ({
            field: key,
            headerName: key,
            editable: key !== 'size', // Make size column non-editable
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

 

  const handleProcessRowUpdate = (newRow: DataRow) => {
    const updatedData = data.map((row) => {
      if (row.id === newRow.id) {
        const updatedRow = { ...row, ...newRow };
       


        console.log(storedata)
        // Calculate 'size' based on 'pcs' and 'crt'
        if (updatedRow.pcs !== undefined && updatedRow.crt !== undefined) {
          updatedRow.size = updatedRow.pcs === 0 ? 0 : updatedRow.crt / updatedRow.pcs;
        }
        if (updatedRow.crt !== undefined && carat !== undefined) {
          updatedRow.gd_percent = (updatedRow.crt / carat)*100;
        }

        return updatedRow;
      }
      return row;
    });

    setData(updatedData);
   
    return newRow;
  };

  const columnsWithActions: GridColDef[] = [
    ...columns,
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => (
        <strong>
          <button onClick={() => handleProcessRowUpdate(params.row)}>Save</button>
        </strong>
      ),
    },
  ];

  return (
    <div className="container">
      <h1 className="heading">Estimator Data Table</h1>
      <div>
        <h2>Extracted Data</h2>
        <pre>{JSON.stringify(storedata.map(({ pcs, carat, est, size }) => ({ pcs, carat, est, size })), null, 2)}</pre>
      </div>
      <div>
        <DataGrid
          rows={data}
          columns={columnsWithActions}
          processRowUpdate={handleProcessRowUpdate}
          onCellEditStop={(params: GridCellEditStopParams) => {
            // Trigger row update on cell edit stop
            handleProcessRowUpdate(params.row);
          }}
        />
      </div>
    </div>
  );
};

export default Trial;
