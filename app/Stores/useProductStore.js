import { create } from "zustand";

const baseUrl = "http://192.168.215.43:5000/api";
const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${baseUrl}/product/getallproducts`, {
        method: "GET",
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch products");
      set({ products: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useProductStore;
