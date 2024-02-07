import { useEffect, useRef, useState, KeyboardEvent, SyntheticEvent } from "react";
import { postMessage } from "../../services";
import { USERNAME } from "../../services/config";
import "./InputBar.css";

export const InputBar = () => {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const sendMessage = (e: SyntheticEvent) => {
    e.preventDefault();
    if (message) {
      postMessage(message, USERNAME);
    }
    setMessage("");
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage(e);
    }
  };

  return (
    <div className="message-input-container">
      <div className="input-btn-wrapper">
        <input
          type="text"
          placeholder="Message"
          className="message-input-field"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          ref={inputRef}
          aria-label="Input message"
        />
        <button className="send-button" onClick={sendMessage} aria-label="Send message">
          Send
        </button>
      </div>
    </div>
  );
};
