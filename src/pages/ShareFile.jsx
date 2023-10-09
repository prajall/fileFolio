import React, { useEffect, useState } from "react";
import { uploadBytes, ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../config/config";
import { useParams } from "react-router-dom";
import { AiFillFile, AiOutlineCloseCircle } from "react-icons/ai";
import { BsPlusCircleDotted } from "react-icons/bs";
import Alert from "../components/Alert";
import { motion } from "framer-motion";

const ShareFile = ({ fileList, onUpload }) => {
  const [file, setFile] = useState(null);
  const params = useParams().id;
  const [alertStatus, setAlertStatus] = useState("hide");

  const submitHandler = async () => {
    event.preventDefault();
    if (!file) {
      alert("please upload file");
      return;
    }
    if (file.size > 52428800 * 2) {
      alert("cannot upload file size more than 100mb");
      return;
    }
    uploadFile();
  };

  const uploadFile = async () => {
    const fileRef = ref(storage, `${params}/files/${file.name}`);
    console.log(params);
    await uploadBytes(fileRef, file).then(() => {
      setAlertStatus("show");
      setTimeout(() => {
        setAlertStatus("hide");
      }, 3000);
    });
    setFile(null);
    onUpload();
  };

  return (
    <div>
      {/* =========== UPLOAD BUTTON ============== */}
      {alertStatus === "show" && <Alert message="File Uploaded" />}
      <motion.form
        initial={{ scale: 0.7 }}
        animate={{ scale: 1, transition: 0.3 }}
      >
        {!file && (
          <label
            htmlFor="fileUpload"
            className="flex items-center bg-secondary px-4 text-primary hover:scale-110 duration-300 active:scale-100 gap-2 mx-auto cursor-pointer py-2 my-7 rounded-3xl w-fit"
          >
            Upload
            <BsPlusCircleDotted size={"20px"} />
          </label>
        )}
        <input
          id="fileUpload"
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          files={file}
          className="hidden"
        />
        {/* ================== SUBMIT BUTTON =================== */}
        {file && (
          <>
            <div className="flex items-center w-fit m-auto ">
              <div className="flex item-center lg:w-80 justify-between border  px-2 py-1 mr-2 ">
                <p className="mr-3">{file.name}</p>
                <button
                  onClick={() => {
                    setFile(null);
                  }}
                >
                  <AiOutlineCloseCircle size={"20px"} />
                </button>
              </div>
              <button
                onClick={submitHandler}
                className="text-primary bg-secondary text-sm active:bg-third border-2 border-secondary m-1 py-1 px-3 ml-3"
              >
                Submit
              </button>
            </div>
          </>
        )}
      </motion.form>
      {/* ============= FILE PREVIEWS =============== */}
      <div className="md:w-1/2 mx-auto">
        {fileList.map((file) => {
          return (
            <div
              key={file.url}
              className="flex items-center lg:w-96 my-2 cursor-pointer hover:bg-secondary hover:text-primary rounded-xl p-2 ml-5 duration-300"
            >
              <div className=" mr-1">
                <AiFillFile />
              </div>
              <a href={file.url} target="_blank">
                {file.name}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShareFile;
