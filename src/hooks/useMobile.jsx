import { useEffect, useState } from "react";

export const useMobile = () => {
  const isMobile = window.innerWidth <= 768;
  const [isMobileState, setIsMobileState] = useState(isMobile);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMobileState(window.innerWidth <= 768);
    });
    return window.removeEventListener("resize", () => {
      setIsMobileState(window.innerWidth <= 768);
    });
  }, []);
  return isMobileState;
};
