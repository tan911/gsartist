import React, { useRef } from "react";
import { Paperclip } from "lucide-react";

interface PdfPickerProps {
  onPdfSelected: (file: File) => void;
}

const PdfPicker: React.FC<PdfPickerProps> = ({ onPdfSelected }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      onPdfSelected(file);
    }
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <>
      <button
        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
        type="button"
        onClick={() => inputRef.current?.click()}
        aria-label="Attach PDF">
        <Paperclip className="h-5 w-5" />
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleChange}
      />
    </>
  );
};

export default PdfPicker;
