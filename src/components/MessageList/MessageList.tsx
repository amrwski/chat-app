import { useEffect, useState, useRef } from "react";
import { MessageBubble } from "../MessageBubble/MessageBubble";
import { fetchMessages } from "../../services/fetchMessagesService";
import { username } from "../../services/config";
import { Message } from "../../types";
import "./MessageList.css";

export const MessageList = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const lastFetchedTime = useRef<string>();

  useEffect(() => {
    const fetchAndSetMessages = async () => {
      try {
        const since = lastFetchedTime.current?.toString();
        const newMessages = await fetchMessages(since);
        if (newMessages.length) {
          lastFetchedTime.current = newMessages[newMessages.length - 1].timestamp;

          setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };
    fetchAndSetMessages();
    const intervalId = setInterval(fetchAndSetMessages, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="message-list-container">
      <div className="message-list">
        {messages.map(({ _id, author, message, timestamp }) => (
          <MessageBubble
            key={_id}
            author={author}
            content={message}
            timestamp={timestamp}
            isMine={author === username}
          />
        ))}
      </div>
    </div>
  );
};
