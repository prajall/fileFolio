import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Photos from "../components/Photos";
import Navbar1 from "../components/Navbar1";

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
    <>
      <Navbar1 />
      <main className=" mt-20 flex mx-auto ">
        <div className="left md:w-1/2">
          <h1 className="text-4xl xl:text-5xl mt-8 mb-2 md:mt-14 font-bold ">
            Instantly share your files and codes in{" "}
            <span className="text-secondary">ONE PLACE</span> .
          </h1>
          <p className="text-secondary ">
            Filefolio is the simplest way to <strong>share files online</strong>
            . Drop your content, grab a link, and share it instantly.
          </p>

          {/* <p>Use custom path for easier sharing ;{")"}</p> */}

          <Link to={`/${randomId}`}>
            <button className=" mt-14 bg-optional text-primary hover:opacity-90 duration-200 w-fit px-7 py-2 rounded-lg">
              Share now
            </button>
          </Link>
        </div>

        <div className="right hidden md:flex w-1/2">
          {/* <Svg /> */}
          <Photos />
        </div>
      </main>
    </>
  );
};

export default Home;
