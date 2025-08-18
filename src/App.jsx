import logo from "./assets/marketingkit_pro.jpg"

function App() {

  return (
    <>
      <div className="w-full h-screen flex flex-col">
        {/*Navbar*/}
        <header className="bg-black shadow p-2 flex items-center justify-between">
          {/*Logo + Title*/}
          <div className="flex items-center">
            <div className="flex space-x-2 items-center">
              <img src={logo} alt="Logo" className="w-16" />
              <h3>MarketingKit Pro</h3>
            </div>
            <h1 className="font-bold text-white pl-20">AI Marketing Tool</h1>
          </div>

          {/* Profile on the right */}
          <div className="text-gray-400">Profile</div>
        </header>

        <div className="flex flex-1">
          {/* Sidebar */}
          <aside className="w-64 p-4">
            <nav className="space-y-2">
              <a href="#" className="block px-2 py-1 rounded hover:bg-gray-200">Dashboard</a>
              <a href="#" className="block px-2 py-1 rounded hover:bg-gray-200">Content Calendar</a>
              <a href="#" className="block px-2 py-1 rounded hover:bg-gray-200">Poster & Graphic Generator</a>
              <a href="#" className="block px-2 py-1 rounded hover:bg-gray-200">Video Generator</a>
              <a href="#" className="block px-2 py-1 rounded hover:bg-gray-200">Brand Media</a>
            </nav>
          </aside>

          {/*Main Content*/}
          <main className="flex-1 p-6">
            <h2 className="text-2xl font-semibold">Welcome to your Dashboard</h2>
            <p className="text-gray-600 mt-2">Select an option from the sidebar to get started. Select an option from the sidebar to get started. Select an option from the sidebar to get started. Select an option from the sidebar to get started. Select an option from the sidebar to get started.</p>
          </main>
        </div>
      </div>
    </>
  )
}

export default App
