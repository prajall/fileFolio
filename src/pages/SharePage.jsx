import React, { useEffect, useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { db } from "../config/config";
import { getDocs, collection, doc, onSnapshot } from "firebase/firestore";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../config/config";
import { motion } from "framer-motion";
import ShareCode from "./ShareCode";
import ShareFile from "./ShareFile";
import ShareImage from "./ShareImage";

const SharePage = () => {
  const [code, setCode] = useState({});
  const [imageList, setImageList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [activeTab, setActiveTab] = useState("code");
  const params = useParams().id;
  const collectionRef = collection(db, "folio");
  const docRef = doc(db, "folio", params);

  const getFolio = async () => {
    const data = await getDocs(collectionRef);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    filteredData.forEach((data) => {
      if (data.id === params) {
        setCode(data);
      }
    });
  };

  const getImages = async () => {
    const folderRef = ref(storage, `${params}/images`);

    try {
      const response = await listAll(folderRef);
      const imagePromises = response.items.map(async (item) => {
        const url = await getDownloadURL(item);
        return { url: url, name: item.name };
      });
      const images = await Promise.all(imagePromises);
      console.log(images);
      setImageList(images);
      console.log("getImages called");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getFiles = async () => {
    const folderRef = ref(storage, `${params}/files`);

    try {
      const response = await listAll(folderRef);
      const filePromises = response.items.map(async (item) => {
        const url = await getDownloadURL(item);
        return { url, name: item.name };
      });
      const files = await Promise.all(filePromises);
      setFileList(files);
      console.log("getFiles called");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getFolio();
    getImages();
    getFiles();
  }, [params]);

  useEffect(() => {
    const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setCode(docSnapshot.data());
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1, transition: 0.7 }}
      className="w-10/12 mx-auto mb-3"
    >
      <div className="w-fit mx-auto flex gap-2 md:gap-7 lg:gap-10 mb-1 text-xl font-semibold">
        <button
          onClick={() => {
            setActiveTab("code");
          }}
          className={
            activeTab === "code"
              ? "mx-1 p-2 font-bold underline underline-offset-8 duration-300"
              : "mx-1 p-2 duration-300 "
          }
        >
          Code
        </button>
        <motion.button
          onClick={() => {
            setActiveTab("image");
          }}
          className={
            activeTab === "image"
              ? "mx-1 p-2 font-bold underline underline-offset-8 duration-300"
              : "mx-1 p-2 duration-300"
          }
        >
          Images
        </motion.button>
        <button
          onClick={() => {
            setActiveTab("file");
          }}
          className={
            activeTab === "file"
              ? "mx-1 p-2 font-bold underline underline-offset-8 duration-300"
              : "mx-1 p-2 duration-300"
          }
        >
          Files
        </button>
      </div>
      {activeTab === "code" && <ShareCode data={code} docRef={docRef} />}
      {activeTab === "image" && (
        <ShareImage imageList={imageList} onUpload={getImages} />
      )}
      {activeTab === "file" && (
        <ShareFile fileList={fileList} onUpload={getFiles} />
      )}
    </motion.div>
  );
};

export default SharePage;
