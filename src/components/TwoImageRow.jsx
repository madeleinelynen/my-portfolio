function TwoImageRow({ leftImage, rightImage, altLeft = '', altRight = '', gap = '1rem' }) {
  return (
    <div
      style={{
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        width: '100vw',
        overflow: 'hidden',
        display: 'flex',
        gap: gap,
        justifyContent: 'center',
        alignItems: 'stretch'
      }}
    >
      <img
        src={leftImage}
        alt={altLeft}
        style={{
          width: `calc(50% - ${gap} / 2)`,
          height: 'auto',
          objectFit: 'cover',
          display: 'block'
        }}
      />
      <img
        src={rightImage}
        alt={altRight}
        style={{
          width: `calc(50% - ${gap} / 2)`,
          height: 'auto',
          objectFit: 'cover',
          display: 'block'
        }}
      />
    </div>
  );
}


export default TwoImageRow;

