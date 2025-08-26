import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

function App() {
  const [sidebarOption, setSidebarOption] = useState('Dashboard');

  return (
    <div className="w-full h-screen flex flex-col">
      <Header sidebarOption={sidebarOption}/>
      <div className="flex flex-1">
        <Sidebar setSidebarOption={setSidebarOption} />
        <MainContent sidebarOption={sidebarOption} />
      </div>
    </div>
  );
}

export default App;