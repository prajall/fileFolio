import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { uploadBytes, ref, deleteObject } from "firebase/storage";
import { storage } from "../config/config";
import Alert from "../components/Alert";
import { AiOutlineCloseCircle, AiFillDelete } from "react-icons/ai";
import { BsPlusCircleDotted } from "react-icons/bs";
import { motion } from "framer-motion";

const ShareImage = ({ imageList, onUpload }) => {
  const [image, setImage] = useState(null);
  const params = useParams().id;
  const [alertStatus, setAlertStatus] = useState("hide");
  const [alertMessage, setAlertMessage] = useState("");

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
  const deleteImage = async (name) => {
    const deleteRef = ref(storage, `${params}/images/${name}`);
    await deleteObject(deleteRef)
      .then(() => {
        setAlertMessage("Image Deleted");
        setAlertStatus("show");
        setTimeout(() => {
          setAlertStatus("hide");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
    onUpload();
  };
  const uploadImage = async () => {
    const imageRef = ref(storage, `${params}/images/${image.name}`);
    console.log(params);

    await uploadBytes(imageRef, image).then(() => {
      setAlertMessage("Image Uploaded");
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
      {alertStatus === "show" && <Alert message={alertMessage} />}

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
                className="text-primary bg-third text-sm active:bg-third hover:bg-optional border-2 rounded-lg rounded-l-none border-third m-1 ml-2 px-3 py-[5px]"
              >
                Submit
              </button>
            </div>
          </>
        )}
      </motion.form>

      {imageList.length === 0 && (
        <div>
          <p className="text-center opacity-75">Upload your images</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-6 gap-2">
        {imageList.map((image) => {
          return (
            <motion.div
              key={image.url}
              className="image-container h-fit flex flex-col w-fit mx-auto"
              initial={{ y: 40, opacity: "0.3" }}
              animate={{ y: 0, opacity: 1, transition: 0.7 }}
            >
              <a
                href={image.url}
                download={image.name}
                target="_blank"
                className="image-container"
              >
                {" "}
                <img
                  src={image.url}
                  alt="image"
                  className=" max-w-[330px] max-h-[800px] lg:max-w-[380px] -z-10 mx-auto rounded-xl "
                  key={image.url}
                />{" "}
              </a>
              <motion.button
                animate={{ y: -5 }}
                onClick={() => {
                  deleteImage(image.name);
                }}
                className=" delete-button lg:hidden bg-secondary hover:bg-primary hover:bg-opacity-75  bg-opacity-75 text-primary hover:text-third active:bg-popacity active:text-secondary w-14 mx-auto -mt-[35px] h-[35px] rounded-xl duration-300"
              >
                <AiFillDelete style={{ margin: "auto" }} size={"20px"} />
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ShareImage;
