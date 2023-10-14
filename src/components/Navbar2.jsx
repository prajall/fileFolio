import React, { useEffect } from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import Private from "./Private";

const Navbar2 = () => {
  return (
    <div className="bg- w-full flex items-center py-5">
      <div className="w-10/12 mx-auto flex justify-between">
        <div className="w-fit">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div>
          <Private />
        </div>
      </div>
    </div>
  );
};

export default Navbar2;
