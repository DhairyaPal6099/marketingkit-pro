import { useState } from "react";
import logo from "../assets/marketingkit_pro.jpg";

function Header({ sidebarOption }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (!searchTerm) return;
    console.log("Searching for:", searchTerm);
  };

  return (
    <header className="bg-black shadow px-4 py-2 flex items-center justify-between w-full">
        {/* Logo + Title */}
        <div className="flex items-center space-x-4">
        <img src={logo} alt="Logo" className="w-12 h-12" />
        <div>
            <h3 className="text-white text-lg font-semibold">MarketingKit Pro</h3>
        </div>
        </div>

        <h1 className="text-white text-xl font-bold pl-15">{sidebarOption}</h1>

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

export default Header;