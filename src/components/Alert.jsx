import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
import { motion } from "framer-motion";

const Alert = ({ message, type }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex bg-optional font-semibold text-primary items-center gap-3 justify-center rounded-lg text-center fixed top-3 left-1/2 -ml-36 w-72 h-10 px-3 py-2"
      >
        <div className="text-primary">
          {type === "success" && <BsCheckCircleFill size={"20px"} />}
          {type === "fail" && <IoIosCloseCircle size={"20px"} />}
        </div>
        {message}
      </motion.div>
    </>
  );
};

export default Alert;
