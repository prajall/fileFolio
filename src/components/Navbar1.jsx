import React, { useEffect } from "react";
import Logo from "./Logo";
import { Link, useParams } from "react-router-dom";
import Container from "./Container";

const Navbar1 = () => {
  const params = useParams().id;
  useEffect(() => {
    console.log(params);
  }, [params]);
  return (
    <div className="bg- w-full flex items-center py-5">
      <div className="w-full flex justify-between">
        <Container>
          <Link to="/">
            <Logo />
          </Link>
        </Container>
      </div>
    </div>
  );
};

export default Navbar1;
