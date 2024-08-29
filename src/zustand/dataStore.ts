import create from 'zustand';

interface DataStoreState {
  data: any[];
  columns: any[];
  selectedLot: string;
  setSelectedLot: (lotNo: string) => void;
  setData: (data: any[]) => void;
  setColumns: (columns: any[]) => void;
}

const useDataStore = create<DataStoreState>(set => ({
  data: [],
  columns: [],
  selectedLot: '',
  setSelectedLot: (lotNo) => set({ selectedLot: lotNo }),
  setData: (data) => set({ data }),
  setColumns: (columns) => set({ columns }),
}));

export default useDataStore;
