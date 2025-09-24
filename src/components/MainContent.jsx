import PosterAndGraphicGenerator from "./PosterAndGraphicGenerator";
import BrandMedia from "./BrandMedia";

function MainContent({ sidebarOption }) {
  return (
    <div className="flex-1 p-6">
      {sidebarOption === 'Poster & Graphic Generator' && <PosterAndGraphicGenerator />}
      {sidebarOption === 'Brand Media' && <BrandMedia />}
    </div>
  );
}

export default MainContent;