import { useState } from "react";

function BrandMedia() {
  const [brandLogo, setBrandLogo] = useState(null);
  const [brandColorPrimary, setBrandColorPrimary] = useState("#1d4ed8"); // default blue
  const [brandColorOnPrimary, setBrandColorOnPrimary] = useState("#ffffff"); // default white
  const [brandColorTertiary, setBrandColorTertiary] = useState("#9333ea"); // default purple
  const [brandFont, setBrandFont] = useState("Arial");

  const [uploadedImages, setUploadedImages] = useState([
    "https://via.placeholder.com/200",
    "https://via.placeholder.com/200/FF0000/FFFFFF",
    "https://via.placeholder.com/200/00FF00/000000",
    "https://via.placeholder.com/200/0000FF/FFFFFF",
  ]);

  // Handle logo upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBrandLogo(URL.createObjectURL(file));
    }
  };

  //Save brand media
  const handleSaveBrandMedia = async () => {
    // Implement save functionality here
    alert("Brand media saved (not really, this is a placeholder).");
  }

  const handleGetBrandMedia = async () => {
    try {
        const response = await fetch('http://localhost:7860/users/123/profile',
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );
        const data = await response.json();
        console.log(data);
        alert("Check console for response from backend");
    } catch (error) {
        console.error("Error calling backend route:", error);
        alert("Error calling backend route. Check console for details.");
    }
  };

  return (
    <main className="flex-1 p-6 w-full">
      {/* Page Intro */}
      <section>
        <h2 className="text-2xl font-semibold">Welcome to your Brand Media</h2>
        <p className="text-gray-600 mt-2">
          Manage your brand assets here: logo, colors, fonts, and uploaded
          media. This will help keep your brand consistent across posts.
        </p>
      </section>

      {/* Two-column layout */}
      <section className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column (spanning 2/3 width) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Brand Media Settings */}
          <div>
            <h3 className="text-xl font-bold mb-4">Your Colors & Logo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Logo Upload */}
              <div>
                <label className="block mb-2 font-medium">Brand Logo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="mb-4"
                />
                {brandLogo ? (
                  <img
                    src={brandLogo}
                    alt="Brand Logo"
                    className="h-40 w-40 object-contain border rounded"
                  />
                ) : (
                  <div className="h-40 w-40 flex items-center justify-center border rounded text-gray-400">
                    No logo uploaded
                  </div>
                )}
              </div>

              {/* Brand Colors */}
              <div>
                <label className="block mb-2 font-medium">Primary Color</label>
                <input
                  type="color"
                  value={brandColorPrimary}
                  onChange={(e) => setBrandColorPrimary(e.target.value)}
                  className="w-16 h-10 cursor-pointer"
                />

                <label className="block mt-4 mb-2 font-medium">
                  On Primary Color
                </label>
                <input
                  type="color"
                  value={brandColorOnPrimary}
                  onChange={(e) => setBrandColorOnPrimary(e.target.value)}
                  className="w-16 h-10 cursor-pointer"
                />

                <label className="block mt-4 mb-2 font-medium">
                  Tertiary Color
                </label>
                <input
                  type="color"
                  value={brandColorTertiary}
                  onChange={(e) => setBrandColorTertiary(e.target.value)}
                  className="w-16 h-10 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Font Selection */}
          <div className="mt-15">
            <h3 className="text-xl font-bold mb-4">Typography</h3>
            <label className="block mb-2 font-medium">Brand Font</label>
            <select
              value={brandFont}
              onChange={(e) => setBrandFont(e.target.value)}
              className="border rounded p-2 bg-black"
            >
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Georgia">Georgia</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
            </select>

            <div
              className="mt-4 p-4 rounded shadow"
              style={{
                backgroundColor: brandColorPrimary,
                color: brandColorOnPrimary,
                fontFamily: brandFont,
              }}
            >
              <p className="text-lg">Brand Preview Text</p>
            </div>
          </div>
        </div>

        {/* Right column (uploaded images) */}
        <div className="ml-40">
          <h3 className="text-xl font-bold mb-4">Your Uploaded Media</h3>
          {uploadedImages.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {uploadedImages.map((img, index) => (
                <div
                  key={index}
                  className="border rounded-lg overflow-hidden shadow-sm"
                >
                  <img
                    src={img}
                    alt={`Uploaded ${index + 1}`}
                    className="w-full h-32 object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No media uploaded yet.</p>
          )}

          <div className="mt-10">
            <h3 className="text-xl font-bold mb-4">Save Brand Media</h3>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-50" onClick={ handleSaveBrandMedia }>
              Save
            </button>
          </div>
        </div>

        
      </section>
    </main>
  );
}

export default BrandMedia;