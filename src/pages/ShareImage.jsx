import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { uploadBytes, ref, deleteObject } from "firebase/storage";
import { storage } from "../config/config";
import Alert from "../components/Alert";
import { AiOutlineCloseCircle, AiFillDelete } from "react-icons/ai";
import { BsPlusCircleDotted } from "react-icons/bs";
import { motion } from "framer-motion";

const ShareImage = ({ imageList, onUpload }) => {
  const [images, setImages] = useState(null);
  const params = useParams().id;
  const [alertStatus, setAlertStatus] = useState("hide");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingImagesNames, setUploadingImagesNames] = useState("");

  const submitHandler = async () => {
    event.preventDefault();
    for (let i = 0; i < images.length; i++) {
      const allowedExtension = ["jpg", "jpeg", "png", "svg", "gif"];
      const imageParts = images[i].name.split(".");
      const imageExtension = imageParts[imageParts.length - 1];
      if (!allowedExtension.includes(imageExtension)) {
        setAlertType("fail");
        setAlertMessage("Unsupported image type");
        setAlertStatus("show");
        setTimeout(() => {
          setAlertStatus("hide");
        }, 3000);
        setImage(null);
        return;
      }
      setIsUploading(true);

      uploadImage(images[i]);
    }
  };
  const deleteImage = async (name) => {
    const deleteRef = ref(storage, `${params}/images/${name}`);
    await deleteObject(deleteRef)
      .then(() => {
        setAlertType("success");
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
  const uploadImage = async (i) => {
    const imageRef = ref(storage, `${params}/images/${i.name}`);

    await uploadBytes(imageRef, i).then(() => {
      setAlertType("success");
      setAlertMessage("Image Uploaded");
      setAlertStatus("show");
      setTimeout(() => {
        setAlertStatus("hide");
      }, 3000);
    });
    setImages(null);
    onUpload();
    setIsUploading(false);
  };
  const joinImageList = (List) => {
    console.log(List);
    let list = List[0].name;
    for (let i = 1; i < List.length; i++) {
      list = list + ", " + List[i].name;
    }
    console.log(list);
    setUploadingImagesNames(list);
  };
  return (
    <div>
      {alertStatus === "show" && (
        <Alert message={alertMessage} type={alertType} />
      )}

      <motion.form
        initial={{ scale: 0.7 }}
        animate={{ scale: 1, transition: 0.3 }}
      >
        {!images && (
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
            // setImage(e.target.files[0]);
            setImages(e.target.files);
            joinImageList(e.target.files);
          }}
          files={images}
          className="hidden"
          multiple
        />
        {/* ================== SUBMIT BUTTON =================== */}
        {images && !isUploading && (
          <>
            <div className="flex items-center w-fit m-auto ">
              <div className="flex item-center justify-between border rounded-lg rounded-r-none px-2 py-1 ">
                <p className="mr-3 w-[180px] whitespace-nowrap overflow-hidden">
                  {uploadingImagesNames}
                </p>
                <button
                  onClick={() => {
                    setImages(null);
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
        {/* ================= UPLOADING BUTTON ====================== */}

        {isUploading && (
          <div className="flex items-center bg-secondary px-4 text-primary duration-300 active:scale-100 gap-2 mx-auto cursor-pointer py-2 my-7 rounded-3xl w-fit">
            Uploading...
            {/* <BsPlusCircleDotted size={"20px"} /> */}
          </div>
        )}
      </motion.form>

      {imageList.length === 0 && (
        <div>
          <p className="text-center opacity-75">Upload your images</p>
        </div>
      )}

      <div className="masonry mt-6 ">
        {imageList.map((image) => {
          return (
            <motion.div
              key={image.url}
              className="mb-5 image-container h-fit flex flex-col w-fit mx-auto "
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
                  className=" mx-auto rounded-xl "
                  key={image.url}
                />{" "}
              </a>
              <motion.button
                animate={{ y: -5 }}
                onClick={() => {
                  deleteImage(image.name);
                }}
                className=" delete-button z-10 lg:hidden bg-secondary hover:bg-primary hover:bg-opacity-75  bg-opacity-75 text-primary hover:text-third active:bg-popacity active:text-secondary w-14 mx-auto -mt-[35px] h-[35px] rounded-xl duration-300"
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
