import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar1";
import Home from "./Home";
import SharePage from "./SharePage";

const Pages = () => {
  return (
    <div>
      <div className="container px-4 lg:px-10 mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<SharePage />} />
        </Routes>
      </div>
    </div>
  );
};

export default Pages;
