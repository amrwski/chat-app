import { useEffect, useState, useRef, useCallback } from "react";
import { MessageBubble } from "../MessageBubble/MessageBubble";
import { fetchMessages } from "../../services/fetchMessagesService";
import { USERNAME, POLLING_FREQ } from "../../services/config";
import { Message } from "../../types";
import ClipLoader from "react-spinners/ClipLoader";
import "./MessageList.css";

export const MessageList = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const lastFetchedTime = useRef<string>();

  const fetchAndSetMessages = useCallback(async () => {
    try {
      const since = lastFetchedTime.current;
      const newMessages = await fetchMessages(since);

      if (newMessages.length) {
        lastFetchedTime.current = newMessages[newMessages.length - 1].timestamp;
        setMessages((prevMessages) => {
          const messageIds = new Set(prevMessages.map((msg) => msg._id)); // this is to prevent rendering duplicate msgs on initial load
          const uniqueNewMessages = newMessages.filter((msg) => !messageIds.has(msg._id));

          return [...prevMessages, ...uniqueNewMessages];
        });
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      if (isLoadingInitial) {
        setIsLoadingInitial(false);
      }
    }
  }, [isLoadingInitial]);

  useEffect(() => {
    fetchAndSetMessages();
  }, [fetchAndSetMessages]);

  useEffect(() => {
    const intervalId = setInterval(fetchAndSetMessages, POLLING_FREQ);

    return () => clearInterval(intervalId);
  }, [fetchAndSetMessages]);

  if (isLoadingInitial) {
    return (
      <div className="spinner-container">
        <ClipLoader loading={isLoadingInitial} size={50} />
      </div>
    );
  }

  return (
    <div className="message-list-container">
      <div className="message-list">
        {messages.map(({ _id, author, message, timestamp }) => (
          <MessageBubble
            key={_id}
            author={author}
            content={message}
            timestamp={timestamp}
            isMine={author === USERNAME}
          />
        ))}
      </div>
    </div>
  );
};
