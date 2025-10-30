import React from "react";
import SideBar from "./components/SideBar";
import { Route, Routes, useLocation } from "react-router-dom";
import Chatbox from "./components/Chatbox";
import Credits from "./pages/Credits";
import Community from "./pages/Community";
import { useState } from "react";
import { assets } from "./assets/assets";
import "./assets/prism.css";
import Loading from "./pages/Loading";
import { useAppContext } from "./context/AppContext";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loadingUser } = useAppContext();
  console.log(user);

  const { pathname } = useLocation();
  if (pathname === "/loading" || loadingUser) return <Loading />;
  return (
    <>
      <Toaster />
      {!isMenuOpen && (
        <img
          onClick={() => setIsMenuOpen(true)}
          src={assets.menu_icon}
          className="absolute left-3 top-3 w-8 h-8 cursor-pointer md:hidden not-dark:invert"
        />
      )}
      {user ? (
        <div className="dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white w-full h-[100lvh] overflow-hidden">
          <div className="flex w-full h-full">
            <SideBar setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
            <Routes>
              <Route path="/" element={<Chatbox />} />
              <Route path="/credits" element={<Credits />} />
              <Route path="/community" element={<Community />} />
            </Routes>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-b from-[#242124] to=[#000000] flex items-center justify-center h-screen w-screen">
          <Login />
        </div>
      )}
    </>
  );
}
