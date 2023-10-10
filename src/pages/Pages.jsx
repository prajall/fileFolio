import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "./Home";
import SharePage from "./SharePage";

const Pages = () => {
  return (
    <div>

      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<SharePage />} />
        </Routes>
      </div>
    </div>
  );
};

export default Pages;
