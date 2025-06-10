import { useEffect, useRef, useState } from "react";
import "./AnimatedNumberBlock.css";

function AnimatedNumberBlock({ max = 100, suffix = "", text = "" }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const blockRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          animateCount();
          setHasAnimated(true);
        }
      },
      { threshold: 0.6 }
    );

    if (blockRef.current) observer.observe(blockRef.current);

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCount = () => {
    let start = null;
    const duration = 2000;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * max));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(max);
      }
    };

    requestAnimationFrame(step);
  };

  return (
    <div className="number-block" ref={blockRef}>
      <div className="number-count">{count}{suffix}</div>
      <div className="number-text">{text}</div>
    </div>
  );
}

export default AnimatedNumberBlock;
