"use client";
import { Conversation } from "@/types";
import MessagesTab from "@/app/dashboard/messages/_components/MessagesTab";

interface MessagesPageProps {
  conversations: Conversation[];
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
}

export const MessagesPage = ({
  conversations,
  setConversations,
}: MessagesPageProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <MessagesTab
          conversations={conversations}
          setConversations={setConversations}
        />
      </div>
    </div>
  );
};

export default MessagesPage;
