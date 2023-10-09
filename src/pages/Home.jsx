import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Svg from "../components/Svg";
import Photos from "../components/Photos";

const Home = () => {
  const [randomId, setRandomId] = useState("");

  const getRandomId = () => {
    setRandomId("");
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let i;
    let id = "";
    for (i = 1; i <= 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters.charAt(randomIndex);
    }
    setRandomId(id);
  };

  useEffect(() => {
    getRandomId();
  }, []);

  return (
    <main className=" mt-5 h-[80vh] flex flex-col md:flex-row items-center w-10/12 mx-auto ">
      <div className="left w-1/2">
        <h3 className="lg:text-4xl font-bold ">
          CONVENIENTLY SHARE <br /> YOUR CODES AND FILES <br /> IN{" "}
          <span className="text-secondary">ONE PLACE</span> .
        </h3>
        <Link to={`/${randomId}`}>
          <button className="mt-10 bg-optional text-primary hover:opacity-90 duration-200 w-fit px-7 py-2 rounded-lg">
            Share now
          </button>
        </Link>
      </div>

      <div className="right hidden md:flex w-1/2">
        {/* <Svg /> */}
        <Photos />
      </div>
    </main>
  );
};

export default Home;
