import { useState } from "react";
import { Upload as UploadIcon } from "lucide-react";

export function Upload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [wasteType, setWasteType] = useState<string>("");

  const wasteTypes = ["Plastic", "Paper", "Glass", "Metal", "Organic", "Regular"];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission - in reality this would send to backend
    alert(`Submitted: ${selectedFile?.name} as ${wasteType}`);
  };

  return (
    <div className="flex-1 py-12 px-8" style={{ backgroundColor: 'var(--ivory)' }}>
      <div className="max-w-2xl mx-auto">
        <h1 style={{ color: 'var(--fern)' }} className="mb-8 text-center">
          Upload Trash Report
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Upload */}
          <div className="flex flex-col items-center gap-4">
            <label
              htmlFor="image-upload"
              className="w-full max-w-md h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors hover:bg-opacity-50"
              style={{
                borderColor: 'var(--lavender-grey)',
                backgroundColor: selectedFile ? 'rgba(134, 147, 171, 0.1)' : 'transparent',
              }}
            >
              <UploadIcon size={48} style={{ color: 'var(--fern)' }} />
              <span style={{ color: 'var(--fern)' }} className="mt-4">
                {selectedFile ? selectedFile.name : "Click to upload image"}
              </span>
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Waste Type Selector */}
          <div className="flex flex-col gap-3">
            <label style={{ color: 'var(--fern)' }}>
              Select Waste Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              {wasteTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setWasteType(type)}
                  className="py-3 px-4 rounded transition-colors"
                  style={{
                    backgroundColor: wasteType === type ? 'var(--fern)' : 'var(--lavender-grey)',
                    color: wasteType === type ? 'var(--ivory)' : 'var(--ivory)',
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={!selectedFile || !wasteType}
              className="px-12 py-3 rounded transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: 'var(--golden-chestnut)',
                color: 'var(--ivory)',
              }}
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
