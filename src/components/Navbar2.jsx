import React, { useEffect } from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import Private from "./Private";
import Container from "./Container";

const Navbar2 = () => {
  return (
    <div className="bg- w-full flex items-center py-5 z-20">
      <div className="w-10/12 mx-auto flex justify-between">
        <Container>
          <Link to="/">
            <Logo />
          </Link>
        </Container>
        <div>
          <Private />
        </div>
      </div>
    </div>
  );
};

export default Navbar2;
