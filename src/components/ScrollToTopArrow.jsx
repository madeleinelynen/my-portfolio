import { useEffect, useState } from "react";
import "./ScrollToTopArrow.css";

const ScrollToTopArrow = () => {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowArrow(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

   if(!showArrow) 
    return null;

  return (
<div className="scroll-to-top-inside-banner" onClick={scrollToTop}>
    <span className="arrow">↑</span>
</div>


  );
};

export default ScrollToTopArrow;
