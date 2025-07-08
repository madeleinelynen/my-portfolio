import { useState, useEffect } from "react";
import "./ScrollToTopButton.css";

function ScrollToTopButton({ scrollTriggerFactor = 1.8 }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolledPx = window.scrollY;
      const viewportHeight = window.innerHeight;
      const triggerPx = viewportHeight * scrollTriggerFactor;

      setIsVisible(scrolledPx >= triggerPx);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollTriggerFactor]);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      className={`scroll-to-top-button ${isVisible ? "visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Nach oben scrollen"
    >
      <span className="scroll-line" />
      <span className="scroll-arrow">↑</span>
    </button>
  );
}

export default ScrollToTopButton;
