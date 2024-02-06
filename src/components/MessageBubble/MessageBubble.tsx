import { FC } from "react";
import { dateFormatter } from "../../utils/dateFormatter";
import "./MessageBubble.css";

interface IMessageBubble {
  author: string;
  content: string;
  timestamp: string;
  isMine: boolean;
}

export const MessageBubble: FC<IMessageBubble> = ({ author, content, timestamp, isMine }) => (
  <div className={`message ${isMine ? "mine" : ""}`}>
    <div className="message-author">{author}</div>
    <div className="message-content">{content}</div>
    <div className="message-timestamp">{dateFormatter(timestamp)}</div>
  </div>
);
