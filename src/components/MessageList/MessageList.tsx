import { useEffect, useState } from "react";
import { fetchMessages } from "../../services/fetchMessagesService";
import { Message } from "../../types";

export const MessageList = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchAndSetMessages = async () => {
      try {
        const since =
          messages && messages.length > 0 ? messages[messages.length - 1].timestamp : undefined;
        const newMessages = await fetchMessages(since);

        setMessages((prevMessages) => [...prevMessages, ...newMessages]);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    const intervalId = setInterval(fetchAndSetMessages, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [messages]);

  return (
    <div className="message-list">
      {messages?.map((message) => (
        <div key={message._id} className="message">
          <div className="message-author">{message.author}</div>
          <div className="message-content">{message.message}</div>
          <div className="message-timestamp">{new Date(message.timestamp).toLocaleTimeString()}</div>
        </div>
      ))}
    </div>
  );
};
