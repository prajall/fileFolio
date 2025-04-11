import React from "react";
import image3 from "../Images/image3.jpg";
import image1 from "../Images/image1.jpg";
import codess from "../Images/codess3.png";

const Photos = () => {
  return (
    <>
      <div className="relative w-full ml-10">
        <img
          src={codess}
          className="w-60 rounded-md shadow-slate-600 shadow-xl absolute top-9 left-[13rem]"
        />
        <img
          src={image3}
          className="w-44 rounded-md shadow-slate-600 shadow-lg absolute  left-0"
        />
        <img
          src={image1}
          className="w-48 rounded-md  shadow-slate-600 shadow-xl absolute top-36 left-[9rem]"
        />
      </div>
    </>
  );
};

export default Photos;
