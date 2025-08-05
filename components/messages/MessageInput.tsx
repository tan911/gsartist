import React, { useRef, useState, useEffect } from "react";
import { Send, Smile, Paperclip, Image as ImageIcon, X } from "lucide-react";
import Picker from "@emoji-mart/react";
import { Message } from "@/types";

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (images?: File[], pdf?: File) => void;
  disabled?: boolean;
  droppedImages?: File[];
  droppedPdf?: File | null;
  clearDroppedFiles?: () => void;
}

const ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

const MessageInput: React.FC<MessageInputProps> = ({
  value,
  onChange,
  onSend,
  disabled,
  droppedImages,
  droppedPdf,
  clearDroppedFiles,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate previews and cleanup
  useEffect(() => {
    const urls = selectedImages.map((file) => URL.createObjectURL(file));
    setImagePreviews(urls);
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [selectedImages]);

  // Sync dropped files
  useEffect(() => {
    if (droppedImages && droppedImages.length > 0) {
      setSelectedImages((prev) => [...prev, ...droppedImages]);
      if (clearDroppedFiles) clearDroppedFiles();
    }
    // Only set PDF if not already selected
    if (droppedPdf && !selectedPdf) {
      setSelectedPdf(droppedPdf);
      if (clearDroppedFiles) clearDroppedFiles();
    }
    // eslint-disable-next-line
  }, [droppedImages, droppedPdf]);

  const handleEmojiSelect = (emoji: any) => {
    const input = inputRef.current;
    if (!input) return;
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const newValue = value.slice(0, start) + emoji.native + value.slice(end);
    onChange(newValue);
    setShowEmojiPicker(false);
    setTimeout(() => {
      input.focus();
      input.setSelectionRange(
        start + emoji.native.length,
        start + emoji.native.length
      );
    }, 0);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validImages = files.filter((file) =>
      ACCEPTED_IMAGE_TYPES.includes(file.type)
    );
    setSelectedImages((prev) => [...prev, ...validImages]);
    // Reset input so same file can be selected again
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const handleRemoveImage = (idx: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedPdf(file);
    }
    if (pdfInputRef.current) pdfInputRef.current.value = "";
  };

  const handleRemovePdf = () => setSelectedPdf(null);

  const handleSend = () => {
    if (selectedImages.length > 0 || selectedPdf) {
      onSend(
        selectedImages.length > 0 ? selectedImages : undefined,
        selectedPdf || undefined
      );
      setSelectedImages([]);
      setSelectedPdf(null);
    } else {
      onSend();
    }
  };

  // Drag-and-drop handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    const images = files.filter((file) =>
      ACCEPTED_IMAGE_TYPES.includes(file.type)
    );
    const pdf = files.find((file) => file.type === "application/pdf");
    if (images.length > 0) {
      setSelectedImages((prev) => [...prev, ...images]);
    }
    if (pdf) {
      setSelectedPdf(pdf);
    }
    if (files.length > 0 && images.length === 0 && !pdf) {
      setError("Only images (png, jpg, jpeg, webp) and PDFs are supported.");
    }
  };

  return (
    <div
      className={`flex items-center space-x-2 relative ${dragActive ? "ring-2 ring-purple-400" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      aria-label="Message input area">
      <button
        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
        type="button"
        onClick={() => pdfInputRef.current?.click()}
        aria-label="Attach PDF">
        <Paperclip className="h-5 w-5" />
      </button>
      {/* Image upload button */}
      <button
        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
        type="button"
        onClick={() => imageInputRef.current?.click()}
        aria-label="Add images">
        <ImageIcon className="h-5 w-5" />
      </button>
      <input
        ref={imageInputRef}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES.join(",")}
        multiple
        className="hidden"
        onChange={handleImageChange}
      />
      <input
        ref={pdfInputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handlePdfChange}
      />
      <div className="flex-1 relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type a message..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          disabled={disabled}
        />
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
          type="button"
          aria-label="Add emoji"
          onClick={() => setShowEmojiPicker((v) => !v)}>
          <Smile className="h-5 w-5" />
        </button>
        {showEmojiPicker && (
          <div className="absolute bottom-full right-0 mb-2 z-50">
            <Picker onEmojiSelect={handleEmojiSelect} theme="light" />
          </div>
        )}
      </div>
      <button
        onClick={handleSend}
        className="p-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 disabled:opacity-50"
        disabled={
          disabled ||
          (!value.trim() && selectedImages.length === 0 && !selectedPdf)
        }
        type="button">
        <Send className="h-5 w-5" />
      </button>
      {/* Image previews */}
      {selectedImages.length > 0 && (
        <div className="absolute left-0 bottom-full mb-2 flex space-x-2 bg-white p-2 rounded shadow z-40">
          {imagePreviews.map((url, idx) => (
            <div key={idx} className="relative w-12 h-12">
              <img
                src={url}
                alt={`preview-${idx}`}
                className="w-12 h-12 object-cover rounded"
              />
              <button
                className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow text-gray-500 hover:text-red-500"
                onClick={() => handleRemoveImage(idx)}
                aria-label="Remove image"
                type="button">
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
      {/* PDF preview */}
      {selectedPdf && (
        <div className="absolute left-0 bottom-full mb-2 flex items-center bg-white p-2 rounded shadow z-40">
          <span className="text-sm text-gray-700 mr-2">{selectedPdf.name}</span>
          <button
            className="text-gray-400 hover:text-red-500"
            onClick={handleRemovePdf}
            aria-label="Remove PDF"
            type="button">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      {error && (
        <div
          className="absolute left-0 bottom-full mb-2 text-xs text-red-500 bg-white p-2 rounded shadow z-40"
          aria-live="polite">
          {error}
        </div>
      )}
    </div>
  );
};

export default MessageInput;
