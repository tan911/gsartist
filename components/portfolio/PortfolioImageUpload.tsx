import React, { useRef, useState } from "react";
import type { PortfolioImageUploadProps, ImageJson } from "@/types";

const MAX_DIMENSION = 800;
const WEBP_QUALITY = 0.7;

export const PortfolioImageUpload: React.FC<PortfolioImageUploadProps> = ({
  artistId,
  onUpload,
  artistName = "artist",
  service = "service",
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [jsonArray, setJsonArray] = useState<ImageJson[]>([]);
  const [jsonOutput, setJsonOutput] = useState<ImageJson | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setJsonOutput(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate extension
    const validExtensions = ["jpg", "jpeg", "png"];
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!ext || !validExtensions.includes(ext)) {
      setError("Only .jpg, .jpeg, or .png files are allowed.");
      return;
    }

    setLoading(true);
    try {
      // Read file as image
      const img = new window.Image();
      const reader = new FileReader();
      reader.onload = async (event) => {
        if (!event.target?.result) {
          setError("Failed to read file.");
          setLoading(false);
          return;
        }
        img.onload = async () => {
          // Resize
          const [newWidth, newHeight] = getResizedDimensions(
            img.width,
            img.height,
            MAX_DIMENSION
          );
          const canvas = document.createElement("canvas");
          canvas.width = newWidth;
          canvas.height = newHeight;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            setError("Canvas not supported.");
            setLoading(false);
            return;
          }
          ctx.drawImage(img, 0, 0, newWidth, newHeight);
          // Convert to WebP
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                setError("WebP conversion failed.");
                setLoading(false);
                return;
              }
              const url = URL.createObjectURL(blob);
              const now = new Date();
              const timestamp = now.toISOString().replace(/[-:.TZ]/g, "");
              const safeArtist = (artistName || "artist")
                .replace(/\s+/g, "_")
                .toLowerCase();
              const safeService = (service || "service")
                .replace(/\s+/g, "_")
                .toLowerCase();
              const imageName = `${safeArtist}_${safeService}_${timestamp}.webp`;
              const json: ImageJson = {
                image_name: imageName,
                image_type: "image/webp",
                image_size: blob.size,
                image_url: url,
                uploaded_at: new Date().toISOString(),
                artist_id: artistId,
              };
              setJsonOutput(json);
              setJsonArray((prev) => [...prev, json]);
              onUpload(json);
              console.log(json);
              setLoading(false);
            },
            "image/webp",
            WEBP_QUALITY
          );
        };
        img.onerror = () => {
          setError(
            "Failed to load image. The file may be corrupted or unsupported."
          );
          setLoading(false);
        };
        img.src = event.target.result as string;
      };
      reader.onerror = () => {
        setError("Failed to read file.");
        setLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError("Unexpected error during upload or conversion.");
      setLoading(false);
    }
  };

  function getResizedDimensions(
    width: number,
    height: number,
    maxDim: number
  ): [number, number] {
    if (width <= maxDim && height <= maxDim) return [width, height];
    const aspect = width / height;
    if (aspect > 1) {
      // width is greater
      return [maxDim, Math.round(maxDim / aspect)];
    } else {
      // height is greater
      return [Math.round(maxDim * aspect), maxDim];
    }
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Upload Image
      </label>
      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png"
        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
        onChange={handleFileChange}
        disabled={loading}
      />
      {loading && (
        <div className="flex items-center space-x-2 text-purple-700">
          <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
          <span>Processing...</span>
        </div>
      )}
      {error && <div className="text-red-600 text-sm font-medium">{error}</div>}
    </div>
  );
};

export default PortfolioImageUpload;
