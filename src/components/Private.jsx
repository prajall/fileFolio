import React, { useEffect, useState } from "react";
import { BiSolidLockAlt } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";
import { HiShare } from "react-icons/hi";
import { motion } from "framer-motion";
import { db } from "../config/config";
import { getDocs, collection, doc, setDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import Alert from "./Alert";

const Private = () => {
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [alertStatus, setAlertStatus] = useState("hide");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  // const [alert, setAlert] = useState({ status: "hide", message: "", type: "" });

  const params = useParams().id;
  const docRef = doc(db, "password", params);
  const collectionRef = collection(db, "password");

  const getPrivate = async () => {
    const data = await getDocs(collectionRef);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    filteredData.forEach((data) => {
      if (data.id === params) {
        setPassword(data.password);
        setIsPrivate(data.private);
      }
    });
  };

  const handleSave = () => {
    setDoc(docRef, { private: isPrivate, password: password });
    setDropdown(false);
    setAlertMessage("Saved");
    setAlertType("success");
    setAlertStatus("show");
    setTimeout(() => {
      setAlertStatus("hide");
    }, 3000);
  };
  const handleCheckbox = (e) => {
    setIsPrivate(e.target.checked);
  };
  const handleDropdown = () => {
    if (dropdown) {
      setDropdown(false);
    } else setDropdown(true);
  };

  const shareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setAlertMessage("Copied to clipboard");
    setAlertType("success");
    setAlertStatus("show");
    setTimeout(() => {
      setAlertStatus("hide");
    }, 3000);
  };

  useEffect(() => {
    getPrivate();
  }, []);

  return (
    <>
      {alertStatus === "show" && (
        <Alert message={alertMessage} type={alertType} />
      )}
      <div className="flex gap-2">
        <div className="private-folio border-2 lg:border-none rounded-xl">
          <button
            onClick={handleDropdown}
            className="flex p-1 rounded-lg items-center"
          >
            <div className="hidden lg:flex">Private Folio</div>
            <div className="flex lg:hidden">
              <BiSolidLockAlt />
            </div>
            <IoMdArrowDropdown size={"20px"} />
          </button>

          {dropdown && (
            <motion.div
              initial={{ y: -30 }}
              animate={{ y: 0 }}
              className="config absolute w-40 md:w-48 lg:w-52 py-3 px-2 mt-3 -ml-16 md:-ml-24 lg:-ml- text-sm bg-slate-50 border-2 rounded-lg z-10"
            >
              <div className="flex items-center justify-between">
                Lock
                <label className="toggle-container">
                  <input
                    type="checkbox"
                    className="toggle-input"
                    checked={isPrivate}
                    onChange={(e) => {
                      handleCheckbox(e);
                    }}
                  />
                  <div className="toggle-button">
                    <div className="toggle-switch"></div>
                  </div>
                </label>
              </div>
              <div className="password mt-2">
                <input
                  type="text"
                  placeholder="password"
                  className="w-full focus:outline-none border-2 rounded-lg text-sm p-1 px-2"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                />
                <button
                  onClick={handleSave}
                  className="bg-slate-800 text-slate-50 py-1 w-full mt-2 rounded-lg"
                >
                  Save
                </button>
              </div>
            </motion.div>
          )}
        </div>
        <button
          onClick={shareLink}
          className="copy-link flex items-center bg-slate-800 hover:bg-opacity-90 duration-300 px-4 rounded-xl text-slate-50"
        >
          <HiShare />
          <p className="ml-1 hidden lg:flex ">Copy Link</p>
        </button>
      </div>
    </>
  );
};

export default Private;
