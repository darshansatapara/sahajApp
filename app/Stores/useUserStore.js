import { create } from "zustand";

const useUserStore = create((set) => ({
  users: [],
  user: null,
  admin: null,
  token: null,
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const token = await AsyncStorage.getItem("admin_token");
      const response = await fetch(
        "http://192.168.215.17:5000/api/admin/users",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch users");
      set({ users: data.users, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  loginUser: async (userData) => {
    console.log(userData);
    set({ loading: true, error: null });
    try {
      const response = await fetch("http://192.168.215.17:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) throw new Error(data.message || "Login failed");
      set({ user: data.user, token: data.token, loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  logoutUser: async () => {
    try {
      set({ user: null, token: null });
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  },

  checkAuth: async () => {
    set({ loading: true });
    try {
      const token = await AsyncStorage.getItem("admin_token");
      const userData = await AsyncStorage.getItem("admin_user");
      if (token && userData) {
        set({ user: JSON.parse(userData), token, loading: false });
        return true;
      }
      set({ user: null, token: null, loading: false });
      return false;
    } catch (error) {
      set({ error: error.message, loading: false });
      return false;
    }
  },
}));

export default useUserStore;
