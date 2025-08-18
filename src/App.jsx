import { useState } from "react";
import logo from "./assets/marketingkit_pro.jpg";

function App() {
  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
}

function Header() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (!searchTerm) return;
    console.log("Searching for:", searchTerm);
  };

  return (
    <header className="bg-black shadow px-4 py-2 flex items-center justify-between">
      {/* Logo + Title */}
      <div className="flex items-center space-x-4">
        <img src={logo} alt="Logo" className="w-12 h-12" />
        <div>
          <h3 className="text-white text-lg font-semibold">MarketingKit Pro</h3>
        </div>
      </div>

      <h1 className="text-white text-xl font-bold pl-15">Dashboard</h1>

      {/* Search bar + button */}
      <div className="flex items-center space-x-2 flex-1 max-w-md ml-8">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-3 py-1 w-full rounded text-white border-2 border-white bg-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
          />
        </div>
        <button 
          onClick={handleSearch} 
          className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Search
        </button>
      </div>

      {/* Profile */}
      <div className="text-gray-400 ml-4">Profile</div>
    </header>
  );
}

function Sidebar() {
  return (
    <aside className="w-64 p-4">
      <nav className="space-y-2">
        <a href="#" className="block px-2 py-1 rounded hover:bg-gray-200">Dashboard</a>
        <a href="#" className="block px-2 py-1 rounded hover:bg-gray-200">Content Calendar</a>
        <a href="#" className="block px-2 py-1 rounded hover:bg-gray-200">Poster & Graphic Generator</a>
        <a href="#" className="block px-2 py-1 rounded hover:bg-gray-200">Video Generator</a>
        <a href="#" className="block px-2 py-1 rounded hover:bg-gray-200">Brand Media</a>
      </nav>
    </aside>
  );
}

function MainContent() {
  return (
    <main className="flex-1 p-6">
      <h2 className="text-2xl font-semibold">Welcome to your Dashboard</h2>
      <p className="text-gray-600 mt-2">
        Select an option from the sidebar to get started. Select an option from the sidebar to get started. Select an option from the sidebar to get started. Select an option from the sidebar to get started. Select an option from the sidebar to get started.
      </p>
    </main>
  );
}

export default App;