import { useState } from "react";

function PosterAndGraphicGenerator() {
  const [brandLogo, setBrandLogo] = useState(null);
  const [brandColors, setBrandColors] = useState("#000000");
  const [brandFont, setBrandFont] = useState("Arial");
  const [editorContent, setEditorContent] = useState([]);
  const [downloadFormat, setDownloadFormat] = useState("Instagram");

  // Handle logo upload
  const handleLogoUpload = (e) => {
    setBrandLogo(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <main className="flex-1 p-6">
      {/* Branding */}
      <section className="mb-6">
        <h3 className="font-bold mb-2">Custom Branding</h3>
        <div className="flex gap-4 items-center">
          <label className="pr-20">
            Logo:
            <input className="pl-2 border rounded ml-2" type="file" accept="image/*" onChange={handleLogoUpload} />
          </label>
          <label>
            Brand Color:
            <input className="ml-2" type="color" value={brandColors} onChange={e => setBrandColors(e.target.value)} />
          </label>
          <label className="pl-20">
            Font:
            <select className="bg-black ml-2" value={brandFont} onChange={e => setBrandFont(e.target.value)}>
              <option value="Arial">Arial</option>
              <option value="Roboto">Roboto</option>
              <option value="Georgia">Georgia</option>
              <option value="Times New Roman">Times New Roman</option>
            </select>
          </label>
        </div>
      </section>

      {/* Drag-and-drop Editor (simplified) */}
      <section className="mb-6">
        <h3 className="font-bold mb-2">Editor</h3>
        <div className="border p-4 min-h-[200px]" style={{ background: brandColors, fontFamily: brandFont }}>
          {brandLogo && <img src={brandLogo} alt="Logo" className="h-12 mb-2" />}
          <input
            type="text"
            placeholder="Add text..."
            className="border mb-2 p-2 w-full"
            onBlur={e => setEditorContent([...editorContent, { type: "text", value: e.target.value }])}
          />
          {/* You can add more drag-and-drop features here */}
          {editorContent.map((item, idx) => (
            <div key={idx}>{item.value}</div>
          ))}
        </div>
      </section>

      {/* Download Options */}
      <section>
        <h3 className="font-bold mb-2">Download</h3>
        <select className="bg-black" value={downloadFormat} onChange={e => setDownloadFormat(e.target.value)}>
          <option value="Instagram">Instagram Post</option>
          <option value="Facebook">Facebook Post</option>
          <option value="Stories">Stories</option>
        </select>
        <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded">
          Download
        </button>
      </section>
    </main>
  );
}

export default PosterAndGraphicGenerator;