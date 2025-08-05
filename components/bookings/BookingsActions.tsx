import React from "react";
import { Button } from "@/components/ui/buttonnew";

interface BookingsActionsProps {
  onAccept?: () => void;
  onCancel?: () => void;
  showAccept?: boolean;
  showCancel?: boolean;
}

const BookingsActions: React.FC<BookingsActionsProps> = ({
  onAccept,
  onCancel,
  showAccept = true,
  showCancel = true,
}) => {
  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      {showAccept && (
        <Button variant="primary" size="sm" onClick={onAccept}>
          Accept
        </Button>
      )}
      {showCancel && (
        <Button variant="ghost" size="sm" onClick={onCancel}>
          Cancel
        </Button>
      )}
    </div>
  );
};

export default BookingsActions;
