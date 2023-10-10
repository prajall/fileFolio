import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg- w-full flex items-center py-5">
      {/* <div className="svg"></div> */}
      <div className="w-10/12 mx-auto">
        <div className="w-fit">
          <Link to="/">
            <Logo />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
