import React from "react";

const Logo = () => {
  return (
    <>
      {/* <div className="logo w-fit text-sm py-2 px-1 rounded-lg border-2 border-primary">
        <span className="mr-1 font-semibold ml-[1px] text-primary">File</span>
        <span className="bg-primary text-third rounded-md p-1 px-2 mr-[1px] font-bold">
          Folio
        </span>
      </div> */}
      <div className="logo w-fit text-sm py-2 px-1 rounded-lg border-2 border-third">
        <span className="mr-1 font-semibold ml-[1px] text-third">File</span>
        <span className="bg-third text-primary rounded-md p-1 px-2 mr-[1px] font-bold">
          Folio
        </span>
      </div>
    </>
  );
};

export default Logo;
