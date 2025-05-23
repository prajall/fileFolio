import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, ImageIcon, File, Code, Lock, FormInput } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar1 from "../Navbar1";
import photo1 from "../../Images/image1.jpg";
import photo2 from "../../Images/image3.jpg";
import { useMobile } from "../../hooks/useMobile";
import { cn } from "../../utils";

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [iconAnimations, setIconAnimations] = useState([]);
  const [phoneAnimations, setPhoneAnimations] = useState([]);
  const [randomId, setRandomId] = useState("");
  const [customPath, setCustomPath] = useState("");

  const isMobile = useMobile();

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
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    // Generate random animations for icons
    const iconAnims = floatingIcons.map(() => ({
      y: [0, -(Math.random() * 15 + 5), 0], // Random vertical movement between -5 and -20
      x: [0, Math.random() * 10 - 5, 0], // Random horizontal movement between -5 and 5
      rotate: Math.random() > 0.5 ? [0, 5, 0] : [0, -5, 0], // Random rotation direction
      durationY: 3 + Math.random() * 3, // Random duration between 3 and 6 seconds
      durationX: 4 + Math.random() * 4, // Random duration between 4 and 8 seconds
      durationRotate: 5 + Math.random() * 3, // Random duration between 5 and 8 seconds
    }));

    setIconAnimations(iconAnims);

    // Generate random animations for phones
    setPhoneAnimations([
      {
        y: [0, -12, 0],
        x: [0, 7, 0],
        rotate: [0, 3, 0],
        durationY: 6.5,
        durationX: 8.2,
        durationRotate: 7.8,
      },
      {
        y: [0, -15, 0],
        x: [0, -5, 0],
        rotate: [0, -2, 0],
        durationY: 7.2,
        durationX: 5.8,
        durationRotate: 6.4,
      },
    ]);
  }, []);

  // Floating icons with their positions and colors
  const floatingIcons = [
    {
      icon: <FileText size={24} />,
      position: { top: "25%", left: "15%" },
      mobilePosition: { top: "20%", left: "10%" },
      color: "text-red-500",
      delay: 0,
    },
    {
      icon: <Lock size={24} />,
      position: { top: "20%", left: "45%" },
      mobilePosition: { top: "10%", left: "45%" },
      color: "text-yellow-500",
      delay: 1.2,
    },
    {
      icon: <File size={24} />,
      position: { top: "25%", right: "15%" },
      mobilePosition: { top: "20%", right: "10%" },
      color: "text-purple-400",
      delay: 0.5,
    },
    {
      icon: <Code size={24} />,
      position: { top: "45%", left: "10%" },
      mobilePosition: { top: "80%", left: "10%" },
      color: "text-blue-500",
      delay: 0.8,
    },
    {
      icon: <ImageIcon size={24} />,
      position: { bottom: "30%", right: "10%" },
      mobilePosition: { bottom: "15%", right: "10%" },
      color: "text-blue-600",
      delay: 1.5,
    },
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Moving gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-blue-50"
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${
            mousePosition.y * 100
          }%, rgba(219, 234, 254, 0.8), rgba(233, 213, 255, 0.8), rgba(219, 234, 254, 0.8))`,
        }}
        transition={{ duration: 2 }}
      >
        <Navbar1 />
      </motion.div>

      {/* Logo */}

      {/* Floating icons */}
      {floatingIcons.map(
        (item, index) =>
          iconAnimations.length > 0 && (
            <motion.div
              key={index}
              className={`absolute ${item.color} bg-white p-2 rounded-lg shadow-md`}
              style={isMobile ? item.mobilePosition : item.position}
              animate={{
                y: iconAnimations[index].y,
                x: iconAnimations[index].x,
                rotate: iconAnimations[index].rotate,
              }}
              transition={{
                y: {
                  duration: iconAnimations[index].durationY,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
                x: {
                  duration: iconAnimations[index].durationX,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
                rotate: {
                  duration: iconAnimations[index].durationRotate,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
              }}
            >
              {item.icon}
            </motion.div>
          )
      )}

      {/* Phone mockups */}
      {phoneAnimations.length > 0 && (
        <>
          <motion.div
            className={cn(
              "absolute  w-16 h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl shadow-lg overflow-hidden"
            )}
            style={
              isMobile
                ? { bottom: "15%", left: "30%" }
                : { bottom: "25%", left: "20%" }
            }
            animate={{
              y: phoneAnimations[0].y,
              x: phoneAnimations[0].x,
              rotate: phoneAnimations[0].rotate,
            }}
            transition={{
              y: {
                duration: phoneAnimations[0].durationY,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              },
              x: {
                duration: phoneAnimations[0].durationX,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              },
              rotate: {
                duration: phoneAnimations[0].durationRotate,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
          >
            <div className="w-full h-full bg-black/10"></div>
            {/* <img src={photo1} alt="phone" className="w-full h-full" /> */}
          </motion.div>

          <motion.div
            className="absolute  w-16 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl shadow-lg overflow-hidden"
            animate={{
              y: phoneAnimations[1].y,
              x: phoneAnimations[1].x,
              rotate: phoneAnimations[1].rotate,
            }}
            style={
              isMobile
                ? { bottom: "8%", right: "25%" }
                : { bottom: "25%", right: "20%" }
            }
            transition={{
              y: {
                duration: phoneAnimations[1].durationY,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              },
              x: {
                duration: phoneAnimations[1].durationX,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              },
              rotate: {
                duration: phoneAnimations[1].durationRotate,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
          >
            {/* <div className="w-full h-full bg-black/10"></div> */}
            {/* <img src={photo2} alt="phone" className="w-full h-full" /> */}
          </motion.div>
        </>
      )}

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Instantly share your files and codes in{" "}
          <span className="text-blue-600">ONE PLACE</span>
        </motion.h1>

        <motion.p
          className="text-gray-500 text-lg md:text-xl max-w-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Filefolio is the simplest way to share files online. Drop your
          content, grab a link, and share it instantly.
        </motion.p>

        <motion.div
          className="flex gap-2 md:gap-4 w-fit mx-auto justify-center px-4 "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <input
            placeholder="Custom Path ?"
            className="px-6 w-1/2 py-3 rounded-full bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors shadow-sm"
            onChange={(e) => {
              setCustomPath(e.target.value);
            }}
          />

          <Link
            to={`/${customPath ? customPath : randomId}`}
            className="px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
          >
            Share Now
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
