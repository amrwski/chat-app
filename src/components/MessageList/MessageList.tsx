import { useEffect, useRef } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useMessage } from "../../hooks";
import { MessageBubble } from "../MessageBubble";
import { USERNAME } from "../../services/config";
import "./MessageList.css";

export const MessageList = () => {
  const { messages, isLoadingInitial } = useMessage();
  const endOfListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (endOfListRef.current) {
      endOfListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isLoadingInitial) {
    return (
      <div className="spinner-container">
        <ClipLoader loading={isLoadingInitial} color="#3898d3" size={50} data-testid="loading-spinner" />
      </div>
    );
  }

  return (
    <div className="message-list-container">
      <div className="message-list">
        {messages.map(({ _id, author, message, timestamp }) => (
          <MessageBubble
            ref={endOfListRef}
            key={_id}
            author={author}
            content={message}
            timestamp={timestamp}
            isMine={author === USERNAME}
            aria-label="Message bubble"
            data-testid="message-bubble"
          />
        ))}
      </div>
    </div>
  );
};
