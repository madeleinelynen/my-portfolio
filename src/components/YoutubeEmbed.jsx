import "./YoutubeEmbed.css";

const YoutubeEmbed = ({ videoId }) => {
  if (!videoId) return null;

  return (
    <div className="youtube-wrapper">
      <div className="youtube-inner">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
};
export default YoutubeEmbed;
