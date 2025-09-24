import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

function App() {
  const [sidebarOption, setSidebarOption] = useState('Poster & Graphic Generator');

  return (
    <div className="w-full h-screen flex flex-col">
      <Header sidebarOption={sidebarOption}/>
      <div className="flex flex-1 w-full">
        <Sidebar setSidebarOption={setSidebarOption} />
        <div className="flex-1 w-full">
          <MainContent sidebarOption={sidebarOption} />
        </div>
      </div>
    </div>
  );
}

export default App;