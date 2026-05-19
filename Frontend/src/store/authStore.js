import { create } from "zustand";
import axios from "axios";

export const useAuth = create((set) => ({
  currentUser: null,
  loading: false,
  isAuthenticated: false,
  error: null,

  login: async (userCredWithRole) => {
    const { role, ...userCredObj } = userCredWithRole;

    try {
      // set loading true
      set({ loading: true, error: null });

      // make api call
      let res = await axios.post(
        `${import.meta.env.VITE_API_URL}/common-api/login`,
        userCredObj,
        { withCredentials: true }
      );

      // update state
      set({
        loading: false,
        isAuthenticated: true,
        currentUser: res.data.payload,
      });

    } catch (err) {
      console.log("err is ", err);

      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: err.response?.data?.error || "Login failed",
      });
    }
  },

  logout: async () => {
    try {
      // set loading state
      set({ loading: true, error: null });

      // make logout api req
      await axios.get(
        `${import.meta.env.VITE_API_URL}/common-api/logout`,
        { withCredentials: true }
      );

      // update state
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
      });

    } catch (err) {
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: err.response?.data?.error || "Logout failed",
      });
    }
  },

  // restore login
  checkAuth: async (silent = false) => {
    try {
      if (!silent) set({ loading: true });

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/common-api/check-auth`,
        { withCredentials: true }
      );

      set((state) => ({
        currentUser: res.data.payload,
        isAuthenticated: true,
        loading: silent ? state.loading : false,
      }));

    } catch (err) {
      // If user is not logged in
      if (err.response?.status === 401) {
        set((state) => ({
          currentUser: null,
          isAuthenticated: false,
          loading: silent ? state.loading : false,
        }));
        return;
      }

      // other errors
      console.error("Auth check failed:", err);

      set((state) => ({
        loading: silent ? state.loading : false,
        currentUser: null,
        isAuthenticated: false,
      }));
    }
  },
}));