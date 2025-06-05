import { useEffect, useRef, useState } from "react";
import "./AnimatedCircle.css"; // ← Pfad ggf. anpassen

function AnimatedCircle({ max = 30, label = "" }) {
  const [progress, setProgress] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const circleRef = useRef();
  const observerRef = useRef();

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          startAnimation();
          setHasAnimated(true);
        }
      },
      { threshold: 0.6 }
    );

    if (circleRef.current) {
      observerRef.current.observe(circleRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [hasAnimated]);

  const startAnimation = () => {
    let start = null;
    const duration = 2000;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progressTime = timestamp - start;
      const percent = Math.min(progressTime / duration, 1);
      const currentValue = Math.floor(percent * max);
      setProgress(currentValue);

      const radius = 50;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - percent * circumference;
      if (circleRef.current) {
        circleRef.current.style.strokeDashoffset = offset;
      }

      if (percent < 1) {
        requestAnimationFrame(animate);
      } else {
        setProgress(max);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className="animated-circle-container">
      <svg className="animated-circle-svg">
        <circle
          cx="60"
          cy="60"
          r="50"
          stroke="#ddd"
          strokeWidth="8"
          fill="none"
        />
        <circle
          ref={circleRef}
          cx="60"
          cy="60"
          r="50"
          stroke="#1a1a1a"
          strokeWidth="8"
          fill="none"
          strokeDasharray={2 * Math.PI * 50}
          strokeDashoffset={2 * Math.PI * 50}
          style={{
            transition: "stroke-dashoffset 0.3s linear",
            transform: "rotate(-90deg)",
            transformOrigin: "center",
          }}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="20"
          fill="#1a1a1a"
        >
          {progress}+
        </text>
      </svg>
      <div className="animated-circle-label">{label}</div>
    </div>
  );
}

export default AnimatedCircle;
