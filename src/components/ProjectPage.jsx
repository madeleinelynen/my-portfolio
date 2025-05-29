import CodeToggler from '../components/CodeToggler';
import 'typeface-montserrat';

function ProjectPage({ 
  title, 
  image, 
  description, 
  codeBlocks = [] }) {
  return (
    <div style={{
      margin: '0 auto',
      marginBottom: '1rem',
    }}>
      {image && (
        <img
          src={image}
          alt={title}
          style={{ width: '100%', 
            height: 'auto', 
            borderRadius: '8px', }}
        />
      )}

          <div style={{ maxWidth: '1000px', margin: '2rem auto 0 auto' }}>
        <h1 style={{ fontSize: '2rem', fontFamily: "'Montserrat', sans-serif" }}>{title}</h1>
        <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>{description}</p>
      </div>

      {codeBlocks.length > 0 && (
        <>
          {codeBlocks.map((code, i) => (
            <CodeToggler key={i} code={code} />
          ))}
        </>
      )}
    </div>
  );
}

export default ProjectPage;
