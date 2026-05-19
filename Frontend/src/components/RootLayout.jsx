import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";
import { useEffect } from "react";
import { useAuth } from "../store/authStore";

function RootLayout() {
  
  const checkAuth = useAuth((state) => state.checkAuth);
  const loading = useAuth((state) => state.loading);
  useEffect(() => {
    checkAuth();
  }, []);

  // wait until auth check completes
  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#fff5f8]">
      <Header />
      <main className="flex-grow flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
