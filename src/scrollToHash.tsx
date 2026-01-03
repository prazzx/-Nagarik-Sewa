import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToHash = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const timeout = setTimeout(() => {
      const element = document.querySelector(hash);
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 50);

    return () => clearTimeout(timeout);
  }, [hash, pathname]);

  return null;
};

export default ScrollToHash;
