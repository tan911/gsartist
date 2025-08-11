import React from "react";
import { Download, FileText } from "lucide-react";

interface MessageFileListProps {
  files: { name: string; url: string }[];
  onDownload: (url: string, idx: number, name?: string) => void;
}

const MessageFileList: React.FC<MessageFileListProps> = ({
  files,
  onDownload,
}) => (
  <div className="flex flex-col gap-2 mb-2">
    {files.map((file, idx) => (
      <div key={idx} className="flex items-center bg-gray-100 rounded p-2">
        <FileText className="h-5 w-5 text-gray-500 mr-2" />
        <span className="flex-1 truncate text-gray-800 mr-2">{file.name}</span>
        <button
          onClick={() => onDownload(file.url, idx, file.name)}
          className="bg-white/80 rounded-full p-1 shadow hover:bg-white"
          aria-label="Download file"
          type="button">
          <Download className="h-4 w-4 text-gray-600" />
        </button>
      </div>
    ))}
  </div>
);

export default MessageFileList;
