import { create } from "zustand";

const baseUrl = "http://192.168.215.43:5000/api";

const useCustomerStore = create((set) => ({
  customers: [],
  loading: false,
  error: null,

  fetchCustomers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${baseUrl}/user/getallusers`, {
        method: "GET",
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch customers");
      set({ customers: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useCustomerStore;
