import "./Banner.css";
import ScrollToTopArrow from "./components/ScrollToTopArrow";

function Banner() {
  return (
<div className="left-banner">
  <div className="banner-background" />
  <div className="banner-top">
    <ScrollToTopArrow />
  </div>
  <div className="banner-bottom">
    <div className="banner-copyright">Portfolio©/2025</div>
  </div>
</div>
  );
}

export default Banner;
