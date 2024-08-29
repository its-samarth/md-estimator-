import create from 'zustand';
import axios from 'axios';

interface FetchStoreState {
  lotNumbers: string[];
  data: any[];
  fetchLotNumbers: () => void;
  fetchData: (lotNo: string) => Promise<any[]>; // Ensure it returns a Promise
}

const useFetchStore = create<FetchStoreState>(set => ({
  lotNumbers: [],
  data: [],
  fetchLotNumbers: async () => {
    try {
      const response = await axios.get<string[]>('http://localhost:5000/api/data/lot-numbers');
      set({ lotNumbers: response.data });
    } catch (error) {
      console.error('Error fetching lot numbers:', error);
    }
  },
  fetchData: async (lotNo: string) => {
    try {
      // Use the provided lotNo parameter
      const response = await axios.get<any[]>(`http://localhost:5000/api/data/rough-table-singledata?lotNo=${lotNo}`);
      console.log(response.data); // Log the response data for debugging
      return response.data; // Ensure this returns the data
    } catch (error) {
      console.error('Error fetching data:', error);
      return []; // Return an empty array on error
    }
  },
}));

export default useFetchStore;
