import React, { useRef } from "react";
import { Image as ImageIcon } from "lucide-react";

interface ImagePickerProps {
  onImagesSelected: (files: File[]) => void;
}

const ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

const ImagePicker: React.FC<ImagePickerProps> = ({ onImagesSelected }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validImages = files.filter((file) =>
      ACCEPTED_IMAGE_TYPES.includes(file.type)
    );
    if (validImages.length > 0) onImagesSelected(validImages);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <>
      <button
        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
        type="button"
        onClick={() => inputRef.current?.click()}
        aria-label="Add images">
        <ImageIcon className="h-5 w-5" />
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES.join(",")}
        multiple
        className="hidden"
        onChange={handleChange}
      />
    </>
  );
};

export default ImagePicker;
