// src/pages/ImportExport.tsx
import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import * as XLSX from "xlsx";
import Table from "../components/Table";
import ConnectionTester from "../components/ConnectionTester";
import DataTable from "../components/RoughData";
import HeaderTable from "../Estimator components/HeaderTable";
import MainTable from "../Estimator components/MainTable";
import CalculationTable from "../Estimator components/CalculationTable";
import AverageTable from "../Estimator components/AverageTable";

interface DataRow {
  [key: string]: any;
}

const ImportExport: React.FC = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const [columns, setColumns] = useState<ColumnDef<DataRow, any>[]>([]);

  // Handle Excel file import
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const binaryStr = e.target?.result as string;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData: unknown[][] = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      });

      const headers: ColumnDef<DataRow, any>[] = (jsonData[0] as string[]).map(
        (header, index) => ({
          accessorKey: `col${index}`,
          header: header.toString(),
        })
      );

      const rows: DataRow[] = jsonData.slice(1).map((row) => {
        const rowData: DataRow = {};
        (row as any[]).forEach((cell, index) => {
          rowData[`col${index}`] = cell;
        });
        return rowData;
      });

      setColumns(headers);
      setData(rows);
    };

    reader.readAsBinaryString(file);
  };

  // Handle Excel export
  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "ExportedData.xlsx");
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

 // Container style to display tables side-by-side
const containerStyle: React.CSSProperties = {
  display: 'flex',
  gap: '10px', // Space between tables
  
  justifyContent: 'space-between', // Aligns tables with space between them
};

// Table style to ensure tables fit within the container
const tableStyle: React.CSSProperties = {
  flex: '1 1 0', // Allows tables to grow and shrink as needed
  
};

  return (
    <div>
      <ConnectionTester />
      <HeaderTable />
      <div style={containerStyle}>
        <div style={tableStyle}>
          <MainTable />
        </div>
        <div style={tableStyle}>
          <CalculationTable />
        </div>
        <div style={tableStyle}>
          <CalculationTable />
        </div>
        <div style={tableStyle}>
          <AverageTable />
        </div>
      </div>
    
      {/*
        <DataTable/>
        <Table table={table} />
         Add other routes as needed */}
      <h1>Excel Importer and Exporter</h1>

      <input type="file" onChange={handleFileUpload} accept=".xlsx, .xls" />
      <button onClick={handleExport}>Export as Excel from file</button>
    </div>
  );
};

export default ImportExport;
