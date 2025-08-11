import React from "react";
import { Message } from "@/types";
import { saveAs } from "file-saver";
import MessageImageGallery from "./MessageImageGallery";
import MessageFileList from "./MessageFileList";

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
  uploadProgress?: number;
  error?: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isOwnMessage,
  uploadProgress,
  error,
}) => {
  const handleDownload = async (url: string, idx: number, name?: string) => {
    try {
      const response = await fetch(url, { mode: "cors" });
      const blob = await response.blob();
      const ext = blob.type.split("/")[1] || "pdf";
      saveAs(blob, name || `file-${idx}.${ext}`);
    } catch (e) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg shadow text-sm whitespace-pre-line ${
          isOwnMessage
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-200 text-gray-900 rounded-bl-none"
        }`}>
        {uploadProgress !== undefined && (
          <div
            className="w-full bg-gray-300 rounded h-1 mb-2"
            aria-label="Upload progress">
            <div
              className="bg-blue-400 h-1 rounded"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}
        {error && (
          <div className="text-xs text-red-500 mb-2" aria-label="Upload error">
            {error}
          </div>
        )}
        {message.images && message.images.length > 0 && (
          <MessageImageGallery
            images={message.images}
            onDownload={handleDownload}
          />
        )}
        {message.files && message.files.length > 0 && (
          <MessageFileList files={message.files} onDownload={handleDownload} />
        )}
        <div>{message.text}</div>
        <div className="flex items-center justify-between mt-1">
          <span
            className={`text-xs text-right ${
              isOwnMessage ? "text-white/70" : "text-gray-400"
            }`}>
            {message.timestamp}
          </span>
          {isOwnMessage && message.status && (
            <span
              className="ml-2 text-xs"
              aria-label={`Message status: ${message.status}`}>
              {message.status}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
