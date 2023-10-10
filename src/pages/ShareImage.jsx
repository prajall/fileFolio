import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { uploadBytes, ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../config/config";
import Alert from "../components/Alert";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsPlusCircleDotted } from "react-icons/bs";
import { motion } from "framer-motion";

const ShareImage = ({ imageList, onUpload }) => {
  const [image, setImage] = useState(null);
  const params = useParams().id;
  const [alertStatus, setAlertStatus] = useState("hide");

  const submitHandler = async () => {
    event.preventDefault();
    if (!image) {
      alert("please upload image");
      return;
    }
    const allowedExtension = ["jpg", "jpeg", "png", "svg", "gif"];
    const imageParts = image.name.split(".");
    const imageExtension = imageParts[imageParts.length - 1];
    if (!allowedExtension.includes(imageExtension)) {
      console.log("Unsupported image type");
      return;
    }
    uploadImage();
  };

  const uploadImage = async () => {
    const imageRef = ref(storage, `${params}/images/${image.name}`);
    console.log(params);
    await uploadBytes(imageRef, image).then(() => {
      setAlertStatus("show");
      setTimeout(() => {
        setAlertStatus("hide");
      }, 3000);
    });
    setImage(null);
    onUpload();
  };

  return (
    <div>
      {alertStatus === "show" && <Alert message="Image uploaded" />}

      <motion.form
        initial={{ scale: 0.7 }}
        animate={{ scale: 1, transition: 0.3 }}
      >
        {!image && (
          <label
            htmlFor="imageUpload"
            className="flex items-center bg-secondary px-4 text-primary hover:scale-110 duration-300 active:scale-100 gap-2 mx-auto cursor-pointer py-2 my-7 rounded-3xl w-fit"
          >
            Upload
            <BsPlusCircleDotted size={"20px"} />
          </label>
        )}
        <input
          id="imageUpload"
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
          files={image}
          className="hidden"
        />
        {/* ================== SUBMIT BUTTON =================== */}
        {image && (
          <>
            <div className="flex items-center w-fit m-auto ">
              <div className="flex item-center justify-between border rounded-lg rounded-r-none px-2 py-1 ">
                <p className="mr-3 w-[180px] whitespace-nowrap overflow-hidden">
                  {image.name}
                </p>
                <button
                  onClick={() => {
                    setImage(null);
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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-6 gap-2">
        {imageList.map((image) => {
          return (
            <div key={image.url}>
              <a
                href={image.url}
                download={image.name}
                target="_blank"
                className="max-w-fit"
              >
                {" "}
                <img
                  src={image.url}
                  alt="image"
                  className="max-w-[330px] lg:max-w-[380px] mx-auto mb-2 rounded-xl"
                  key={image.url}
                />{" "}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShareImage;
