import React, { useRef } from "react";
import { Message } from "@/types";
import MessageBubble from "./MessageBubble";

function formatDate(date: Date) {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return date.toLocaleDateString();
}

const DateSeparator: React.FC<{ date: string }> = ({ date }) => (
  <div className="flex justify-center my-2">
    <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
      {date}
    </span>
  </div>
);

function groupMessagesByDate(messages: Message[]) {
  const groups: { [date: string]: Message[] } = {};
  messages.forEach((msg) => {
    const date = new Date(msg.timestamp);
    const key = date.toDateString();
    if (!groups[key]) groups[key] = [];
    groups[key].push(msg);
  });
  return groups;
}

function useAutoScrollToBottom(dep: any) {
  const ref = useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dep]);
  return ref;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const scrollRef = useAutoScrollToBottom(messages);
  const grouped = groupMessagesByDate(messages);
  const dateKeys = Object.keys(grouped);
  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
      {dateKeys.map((dateKey) => (
        <React.Fragment key={dateKey}>
          <DateSeparator date={formatDate(new Date(dateKey))} />
          {(grouped[dateKey] ?? []).map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isOwnMessage={message.sender === "artist"}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default MessageList;
