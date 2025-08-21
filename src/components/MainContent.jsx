import Dashboard from "./Dashboard";
import ContentCalendar from "./ContentCalendar";
import PosterAndGraphicGenerator from "./PosterAndGraphicGenerator";
import VideoGenerator from "./VideoGenerator";
import BrandMedia from "./BrandMedia";

function MainContent({ sidebarOption }) {
  if (sidebarOption === 'Dashboard') return <Dashboard />;
  if (sidebarOption === 'Content Calendar') return <ContentCalendar />;
  if (sidebarOption === 'Poster & Graphic Generator') return <PosterAndGraphicGenerator />;
  if (sidebarOption === 'Video Generator') return <VideoGenerator />;
  if (sidebarOption === 'Brand Media') return <BrandMedia />;
  return null;
}

export default MainContent;