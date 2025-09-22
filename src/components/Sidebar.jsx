function Sidebar({ setSidebarOption }) {
  return (
    <aside className="w-64 p-4">
      <nav className="space-y-2">
        <button 
          onClick={() => setSidebarOption('Poster & Graphic Generator')} 
          className="block w-full text-left px-2 py-1 rounded hover:bg-gray-200"
        >
          Poster & Graphic Generator
        </button>
        <button 
          onClick={() => setSidebarOption('Brand Media')} 
          className="block w-full text-left px-2 py-1 rounded hover:bg-gray-200"
        >
          Brand Media
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;