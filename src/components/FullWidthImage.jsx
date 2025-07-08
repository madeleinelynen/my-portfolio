function FullWidthImage({ src, alt = '' }) {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: 'calc(100% - 10vw)', // 5vw links + 5vw rechts
        margin: '0 5vw',
        display: 'block',
        height: 'auto'
      }}
    />
  );
}


export default FullWidthImage;
