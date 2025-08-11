import React from "react";
import Picker from "@emoji-mart/react";

interface EmojiPickerProps {
  open: boolean;
  onSelect: (emoji: any) => void;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLButtonElement>;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({
  open,
  onSelect,
  onClose,
  anchorRef,
}) => {
  if (!open) return null;
  return (
    <div
      className="absolute bottom-full right-0 mb-2 z-50"
      style={{ minWidth: 300 }}>
      <div className="relative">
        <Picker onEmojiSelect={onSelect} theme="light" />
        <button
          className="absolute top-1 right-1 text-gray-400 hover:text-gray-600"
          onClick={onClose}
          aria-label="Close emoji picker"
          type="button">
          ×
        </button>
      </div>
    </div>
  );
};

export default EmojiPicker;
