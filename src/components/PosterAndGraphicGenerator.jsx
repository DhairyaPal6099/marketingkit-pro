import { useState } from "react";

// Utility: Convert file to base64
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

function PosterAndGraphicGenerator() {
  const [photo, setPhoto] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [aiEditedPhoto, setAiEditedPhoto] = useState(null);
  const [editorContent, setEditorContent] = useState([]);
  const [downloadFormat, setDownloadFormat] = useState("Instagram");
  const [isEditing, setIsEditing] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => setUploadedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleStartAiEdit = async () => {
    if (!photo) return;
    setIsEditing(true);
    try {
      const base64String = await toBase64(photo);
      const response = await fetch(
        "https://dhairyapal6099-marketingkit-pro-backend.hf.space/api/inference",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64String }),
        }
      );

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();
      const imgSrc = `data:image/png;base64,${data.result}`;
      setAiEditedPhoto(imgSrc);
    } catch (error) {
      console.error("Error communicating with backend:", error);
    } finally {
      setIsEditing(false);
    }
  };

  const handleDownload = () => {
    if (!uploadedImage) return;
    const link = document.createElement("a");
    link.href = uploadedImage;
    link.download = "brand-media-image.png";
    link.click();
  };

  return (
    <main className="flex flex-col lg:flex-row p-6 gap-6">
      <div className="flex-1 space-y-6">
        <AIEditingSection
          photo={photo}
          isEditing={isEditing}
          aiEditedPhoto={aiEditedPhoto}
          handleFileUpload={handleFileUpload}
          handleStartAiEdit={handleStartAiEdit}
        />
        <UploadPreviewSection
          uploadedImage={uploadedImage}
          handleFileUpload={handleFileUpload}
        />
        <ExportSection
          uploadedImage={uploadedImage}
          downloadFormat={downloadFormat}
          setDownloadFormat={setDownloadFormat}
          handleDownload={handleDownload}
        />
      </div>
    </main>
  );

}

// Subcomponents

function AIEditingSection({
  photo,
  isEditing,
  aiEditedPhoto,
  handleFileUpload,
  handleStartAiEdit,
}) {
  return (
    <section className="mb-6">
      <h3 className="font-bold mb-2">AI Photo Editing</h3>
      <div className="flex gap-4 items-center">
        <label>
          <span>Upload Photo:</span>
          <input
            className="ml-2 object-contain max-h-full max-w-full"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
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
          <img
            src={URL.createObjectURL(photo)}
            alt="Uploaded"
            className="border rounded-lg w-[300px] h-[300px] flex items-center justify-center bg-gray-100"
          />
        </div>
      )}
      {aiEditedPhoto && (
        <div className="mt-4">
          <h4 className="font-bold mb-2">AI Edited Photo:</h4>
          <img
            src={aiEditedPhoto}
            alt="AI Edited"
            className="h-32 rounded shadow"
          />
        </div>
      )}
    </section>
  );
}

function UploadPreviewSection({ uploadedImage}) {
  return (
    <section className="flex-1 p-6">
      <h3 className="font-bold mb-2">Edited photo</h3>
      <div className="flex gap-4 items-start">
        <div className="border rounded-lg w-[300px] h-[300px] flex items-center justify-center bg-gray-100">
          {uploadedImage ? (
            <img
              src={uploadedImage}
              alt="Uploaded Preview"
              className="object-contain max-h-full max-w-full"
            />
          ) : (
            <p className="text-gray-400">Upload an image to preview</p>
          )}
        </div>
      </div>
    </section>
  );
}

function ExportSection({
  uploadedImage,
  downloadFormat,
  setDownloadFormat,
  handleDownload,
}) {
  return (
    <section>
      <h3 className="text-xl font-bold mb-2">Export Options</h3>
      <div className="flex items-center gap-4">
        <select
          className="border rounded p-2 bg-black"
          value={downloadFormat}
          onChange={(e) => setDownloadFormat(e.target.value)}
        >
          <option value="Instagram">Instagram Post</option>
          <option value="Facebook">Facebook Post</option>
          <option value="Stories">Stories</option>
          <option value="Poster">Poster (A4)</option>
          <option value="Flyer">Flyer</option>
        </select>
        <button
          onClick={handleDownload}
          disabled={!uploadedImage}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:bg-gray-400"
        >
          Download Image
        </button>
        <button className="px-4 py-2 bg-purple-500 text-white rounded">
          Share to Instagram
        </button>
        <button className="px-4 py-2 bg-indigo-500 text-white rounded">
          Share to Facebook
        </button>
      </div>
    </section>
  );
}

export default PosterAndGraphicGenerator;
