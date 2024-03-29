import React, { useEffect } from "react";
import Logo from "./Logo";
import { Link, useParams } from "react-router-dom";

const Navbar1 = () => {
  const params = useParams().id;
  useEffect(() => {
    console.log(params);
  }, [params]);
  return (
    <div className="bg- w-full flex items-center py-5">
      <div className="w-10/12 mx-auto flex justify-between">
        <div className="w-fit">
          <Link to="/">
            <Logo />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar1;
