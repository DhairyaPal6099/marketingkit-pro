import { useState } from "react";

function PosterAndGraphicGenerator() {
  const [brandLogo, setBrandLogo] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [brandColors, setBrandColors] = useState("#000000");
  const [brandFont, setBrandFont] = useState("Arial");
  const [editorContent, setEditorContent] = useState([]);
  const [downloadFormat, setDownloadFormat] = useState("Instagram");
  const [isEditing, setIsEditing] = useState(false);
  const [aiEditedPhoto, setAiEditedPhoto] = useState(null);

  // Handle logo upload
  const handleLogoUpload = (e) => {
    setBrandLogo(URL.createObjectURL(e.target.files[0]));
  };

  // Handle photo upload
  const handlePhotoUpload = (e) => {
    setPhoto(e.target.files[0]);
  };

  // Use backend server for AI editing
  const handleStartAiEdit = async () => {
    try {
      if (!photo) return;
      setIsEditing(true);

      const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const base64String = await toBase64(photo);

      const response = await fetch('https://dhairyapal6099-marketingkit-pro-backend.hf.space/api/inference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64String }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      const imgSrc = `data:image/png;base64,${data.result}`;
      setAiEditedPhoto(imgSrc);
    } catch (error) {
      console.error("Error communicating with backend:", error);
    } finally {
      setIsEditing(false);
    }
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

      {/* AI Editing Section */}
      <section className="mb-6">
        <h3 className="font-bold mb-2">AI Photo Editing</h3>
        <div className="flex gap-4 items-center">
          <label>
            <span>Upload Photo:</span>
            <input
              className="ml-2"
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
            />
          </label>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded ml-4"
            onClick={handleStartAiEdit}
            disabled={!photo || isEditing}
          >
            {isEditing ? "Editing..." : "Start AI Editing"}
          </button>
        </div>
        {photo && (
          <div className="mt-4">
            <img src={URL.createObjectURL(photo)} alt="Uploaded" className="h-32 rounded shadow" />
          </div>
        )}
        {aiEditedPhoto && (
          <div className="mt-4">
            <h4 className="font-bold mb-2">AI Edited Photo:</h4>
            <img src={aiEditedPhoto} alt="AI Edited" className="h-32 rounded shadow" />
          </div>
        )}
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