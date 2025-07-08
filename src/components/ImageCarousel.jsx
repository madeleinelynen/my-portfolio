

import React, { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import "./ImageCarousel.css";

const TRANSITION = "transform 0.45s ease";

export default function ImageCarousel({ images = [], interval = 5000 }) {
  const hasLoop = images.length > 1;
  const slides = hasLoop ? [images.at(-1), ...images, images[0]] : images;

  const [index, setIndex] = useState(1); // echtes erstes Bild
  const trackRef = useRef(null);
  const timerRef = useRef(null);

  /* ---------- AutoPlay ---------- */
  useEffect(() => {
    if (!hasLoop) return;
    timerRef.current && clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
   if (lockRef.current) return;   // läuft gerade ‑> erst warten
   lock();
   setIndex((i) => i + 1);
 }, interval);
    
    return () => clearTimeout(timerRef.current);
  }, [index, interval, hasLoop]);

  /* ---------- Warp ohne Ruck ---------- */
  const warpTo = (newIndex) => {
    const track = trackRef.current;
    if (!track) return;

    track.style.transition = "none";
    flushSync(() => setIndex(newIndex));
    track.getBoundingClientRect();        // Reflow
    track.style.transition = TRANSITION;
    unlock(); 
  };

    const handleTransitionEnd = () => {
    const n = images.length;
    if (index === n + 1)      warpTo(1);
    else if (index === 0)     warpTo(n);
    else                      unlock();     // normaler Slide → freigeben
  };

  /* ---------- Buttons ---------- */
  const lockRef = useRef(false);  
const lock   = () => (lockRef.current = true);
const unlock = () => (lockRef.current = false);

const next = () => {
   if (lockRef.current) return;
   lock();
   setIndex((i) => i + 1);
 };

 const prev = () => {
   if (lockRef.current) return;
   lock();
   setIndex((i) => i - 1);
 };

  if (!images.length) return null;

  return (
    <div className="carousel-shell">
      <button className="carousel-arrow left"  onClick={prev}>‹</button>

      <div className="carousel-container">
        <div
          ref={trackRef}
          className="carousel-track"
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: TRANSITION,
          }}
        >
          {slides.map((src, i) => (
            <div key={i} className="carousel-slide" style={{ backgroundImage: `url(${src})` }} />
          ))}
        </div>
      </div>

      <button className="carousel-arrow right" onClick={next}>›</button>
    </div>
  );
}
