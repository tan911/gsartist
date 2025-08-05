import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Conversation } from "@/types";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";

interface ChatAreaProps {
  selectedConversation: Conversation | null;
  onSendMessage: (
    conversationId: number,
    text: string,
    images?: File[],
    pdfFile?: File
  ) => void;
}

const ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

const ChatArea: React.FC<ChatAreaProps> = ({
  selectedConversation,
  onSendMessage,
}) => {
  const [messageText, setMessageText] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [droppedImages, setDroppedImages] = useState<File[]>([]);
  const [droppedPdf, setDroppedPdf] = useState<File | null>(null);

  // Accept images and pdf file as optional arguments
  const handleSendMessage = (images?: File[], pdfFile?: File) => {
    if (selectedConversation) {
      onSendMessage(
        selectedConversation.id,
        messageText.trim(),
        images,
        pdfFile
      );
      setMessageText("");
      setDroppedImages([]);
      setDroppedPdf(null);
    }
  };

  // Drag-and-drop handlers for the whole chat area
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
      setDroppedImages((prev) => [...prev, ...images]);
    }
    if (pdf) {
      setDroppedPdf(pdf);
    }
  };

  if (!selectedConversation) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center px-2">
          <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Select a conversation
          </h3>
          <p className="text-gray-500">
            Choose a conversation from the list to start messaging
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex-1 flex flex-col rounded-tr-lg rounded-br-lg relative ${dragActive ? "ring-2 ring-purple-400" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      aria-label="Chat area">
      {/* Drag overlay */}
      {dragActive && (
        <div className="absolute inset-0 bg-purple-200/30 z-50 pointer-events-none flex items-center justify-center">
          <span className="text-lg text-purple-700 font-semibold">
            Drop files to upload
          </span>
        </div>
      )}
      {/* Chat Header */}
      <ChatHeader
        client={selectedConversation.client}
        online={selectedConversation.online}
      />
      {/* Messages */}
      <MessageList messages={selectedConversation.messages} />
      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 bg-white rounded-br-lg">
        <MessageInput
          value={messageText}
          onChange={setMessageText}
          onSend={handleSendMessage}
          disabled={!selectedConversation}
          droppedImages={droppedImages}
          droppedPdf={droppedPdf}
          clearDroppedFiles={() => {
            setDroppedImages([]);
            setDroppedPdf(null);
          }}
        />
      </div>
    </div>
  );
};

export default ChatArea;
