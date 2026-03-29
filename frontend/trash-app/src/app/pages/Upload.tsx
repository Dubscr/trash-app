import { startTransition, useState } from "react";
import { Upload as UploadIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { useCurrentUser } from "../context/CurrentUserContext";
import { createReport } from "../lib/api";

export function Upload() {
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [wasteType, setWasteType] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const wasteTypes = ["Plastic", "Paper", "Glass", "Metal", "Organic", "Regular"];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedFile || !wasteType) {
      setErrorMessage("Choose an image and waste type before submitting.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const position = await getCurrentPosition();

      await createReport({
        image: selectedFile,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        trashType: wasteType,
        username: currentUser.username,
      });

      setSelectedFile(null);
      setWasteType("");
      setSuccessMessage("Report submitted successfully.");

      startTransition(() => {
        navigate("/user");
      });
    } catch (submitError) {
      setErrorMessage(
        submitError instanceof Error ? submitError.message : "Unable to submit report.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex-1 py-12 px-8" style={{ backgroundColor: 'var(--ivory)' }}>
      <div className="max-w-2xl mx-auto">
        <h1 style={{ color: 'var(--fern)' }} className="mb-8 text-center">
          Upload Trash Report
        </h1>
        <p className="mb-6 text-center" style={{ color: "var(--charcoal-brown)" }}>
          Submitting as {currentUser.label}. Location will be pulled from your browser when you
          submit.
        </p>

        {errorMessage ? (
          <div
            className="mb-6 rounded p-3 text-sm"
            style={{ backgroundColor: "rgba(192, 133, 82, 0.12)", color: "var(--charcoal-brown)" }}
          >
            {errorMessage}
          </div>
        ) : null}

        {successMessage ? (
          <div
            className="mb-6 rounded p-3 text-sm"
            style={{ backgroundColor: "rgba(97, 139, 74, 0.12)", color: "var(--charcoal-brown)" }}
          >
            {successMessage}
          </div>
        ) : null}

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
              disabled={!selectedFile || !wasteType || isSubmitting}
              className="px-12 py-3 rounded transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: 'var(--golden-chestnut)',
                color: 'var(--ivory)',
              }}
            >
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function getCurrentPosition() {
  if (!navigator.geolocation) {
    throw new Error("Geolocation is not supported in this browser.");
  }

  return new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      resolve,
      () => reject(new Error("Location access is required to submit a report.")),
      {
        enableHighAccuracy: true,
        timeout: 15000,
      },
    );
  });
}
