import PosterAndGraphicGenerator from "./PosterAndGraphicGenerator";
import BrandMedia from "./BrandMedia";

function MainContent({ sidebarOption }) {
  if (sidebarOption === 'Poster & Graphic Generator') return <PosterAndGraphicGenerator />;
  if (sidebarOption === 'Brand Media') return <BrandMedia />;
  return null;
}

export default MainContent;