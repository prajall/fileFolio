import React, { useEffect, useState } from "react";
import { setDoc } from "firebase/firestore";
import Alert from "../components/Alert";
import { BiCopy } from "react-icons/bi";
import { motion } from "framer-motion";

const ShareCode = ({ data, docRef }) => {
  const [message, setMessage] = useState("");
  const [alertStatus, setAlertStatus] = useState("hide");

  const handleSubmit = async () => {
    event.preventDefault();
    setDoc(docRef, { message: message });
    setAlertStatus("show");
    setTimeout(() => {
      setAlertStatus("hide");
    }, 3000);
  };

  useEffect(() => {
    setMessage(data.message);
  }, [data]);

  useEffect(() => {
    setMessage(data.message);
  }, []);

  return (
    <div>
      {alertStatus === "show" && <Alert message="Code Updated" />}
      <form>
        <div className="relative">
          <textarea
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
            className="border-2 rounded w-full h-[75vh] bg-popacity p-3 font-semibold text-third resize-none font text-sm "
            spellCheck="false"
            placeholder="Share your code..."
          />
          <button
            onClick={() => {
              event.preventDefault();
              navigator.clipboard.writeText(message);
            }}
            title="Copy to clipboard"
            className="absolute top-3 right-3 bg-primary hover:bg-secondary hover:text-primary active:bg-third duration-200 rounded p-1"
          >
            <BiCopy size={"20px"} />
          </button>
        </div>

        <button
          onClick={handleSubmit}
          className="border px-2 py-1 mb-4 rounded bg-third text-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ShareCode;
