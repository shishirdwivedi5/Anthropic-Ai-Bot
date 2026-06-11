import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importing components
import Login from "../pages/Login";
import Register from "../pages/Register";
import Chat from "../pages/Chat";
import Profile from "../pages/Profile";
import CreateChat from "../pages/CreateChat";

const RoutesPage = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Chat />} />
       
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-chat" element={<CreateChat />} />
      </Routes>
    </>
  );
};

export default RoutesPage;
