import React, { useEffect, useState } from "react";
import {
  uploadBytes,
  ref,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
import { storage } from "../config/config";
import { useParams } from "react-router-dom";
import { AiFillFile, AiOutlineCloseCircle, AiFillDelete } from "react-icons/ai";
import { BsPlusCircleDotted } from "react-icons/bs";
import Alert from "../components/Alert";
import { motion } from "framer-motion";

const ShareFile = ({ fileList, onUpload }) => {
  const [file, setFile] = useState(null);
  const params = useParams().id;
  const [alertStatus, setAlertStatus] = useState("hide");
  const [alertMessage, setAlertMessage] = useState("");

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
      setAlertMessage("File Uploaded");
      setAlertStatus("show");
      setTimeout(() => {
        setAlertStatus("hide");
      }, 3000);
    });
    setFile(null);
    onUpload();
  };

  const deleteFile = async (name) => {
    const deleteRef = ref(storage, `${params}/files/${name}`);
    // const deleteRef = ref(storage, `prajal/files/${name}`);
    console.log(name);
    await deleteObject(deleteRef)
      .then(() => {
        setAlertMessage("File Deleted");
        setAlertStatus("show");
        setTimeout(() => {
          setAlertStatus("hide");
        }, 3000);
      })
      .catch((err) => {
        setAlertMessage(err);
        setAlertStatus("show");
        setTimeout(() => {
          setAlertStatus("hide");
        }, 3000);
      });
    onUpload();
  };

  return (
    <div>
      {/* =========== UPLOAD BUTTON ============== */}
      {alertStatus === "show" && <Alert message={alertMessage} />}
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
              <div className="flex item-center justify-between border rounded-lg rounded-r-none px-2 py-1 ">
                <p className="mr-3 w-[180px] whitespace-nowrap overflow-hidden">
                  {file.name}
                </p>
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
                className="text-primary bg-third text-sm active:bg-third border-2 rounded-lg rounded-l-none border-third m-1 ml-2 px-3 py-[5px]"
              >
                Submit
              </button>
            </div>
          </>
        )}
      </motion.form>
      {fileList.length === 0 && (
        <div>
          <p className="text-center opacity-75">Upload your files</p>
        </div>
      )}
      {/* ============= FILE PREVIEWS =============== */}
      <div className="md:w-1/2 mx-auto">
        {fileList.map((file) => {
          return (
            <motion.div
              key={file.url}
              initial={{ y: 40, opacity: "0.3" }}
              animate={{ y: 0, opacity: 1, transition: 0.6 }}
              className="flex items-center my-2 cursor-pointer hover:bg-secondary hover:bg-opacity-25 rounded-xl p-2 "
            >
              <a
                href={file.url}
                target="_blank"
                className="flex w-full items-center overflow-x-hidden whitespace-nowrap"
              >
                <AiFillFile />
                <p className="ml-1 w-[90%] overflow-x-hidden whitespace-nowrap">
                  {file.name}
                </p>
              </a>
              <button
                onClick={() => deleteFile(file.name)}
                className=" p-1 hover:bg-primary rounded-md hover:bg-opacity-50"
              >
                <AiFillDelete size={"20px"} />
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ShareFile;
