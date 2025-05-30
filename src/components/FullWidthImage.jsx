function FullWidthImage({ src, alt = '' }) {
  return (
    <div style={{
      position: 'relative',
      left: '50%',
      right: '50%',
      marginLeft: '-50vw',
      marginRight: '-50vw',
      width: '100vw',
      overflow: 'hidden'
    }}>
      <img
        src={src}
        alt={alt}
        style={{
          display: 'block',
          width: '100%',
          height: 'auto'
        }}
      />
    </div>
  );
}

export default FullWidthImage;
