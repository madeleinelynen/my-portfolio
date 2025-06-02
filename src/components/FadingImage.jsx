import React from "react";

const FadingImage = ({
  src,
  alt = "",
  style = {},
  imageStyle = {},
  fadeStart = "90%", // Stelle, ab der der Fade beginnt
}) => {
  return (
    <div style={{ width: "100%", ...style }}>
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          WebkitMaskImage: `linear-gradient(to bottom, black ${fadeStart}, transparent 100%)`,
          maskImage: `linear-gradient(to bottom, black ${fadeStart}, transparent 100%)`,
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          ...imageStyle,
        }}
      />
    </div>
  );
};

export default FadingImage;
