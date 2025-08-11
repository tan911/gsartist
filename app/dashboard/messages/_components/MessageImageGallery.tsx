import React from "react";
import { Download } from "lucide-react";

interface MessageImageGalleryProps {
  images: string[];
  onDownload: (url: string, idx: number) => void;
}

const MessageImageGallery: React.FC<MessageImageGalleryProps> = ({
  images,
  onDownload,
}) => (
  <div className="flex flex-col gap-2 mb-2">
    {images.map((img, idx) => (
      <div key={idx} className="relative group">
        <img
          src={img}
          alt={`attachment-${idx}`}
          className="rounded max-w-[180px] max-h-[180px] object-cover border border-gray-200"
        />
        <button
          onClick={() => onDownload(img, idx)}
          className="absolute top-1 right-1 bg-white/80 rounded-full p-1 shadow hover:bg-white z-10 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Download image"
          type="button">
          <Download className="h-4 w-4 text-gray-600" />
        </button>
      </div>
    ))}
  </div>
);

export default MessageImageGallery;
