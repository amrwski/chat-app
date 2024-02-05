import { KeyboardEvent, SyntheticEvent, useState } from "react";
import "./InputBar.css";

export const InputBar = () => {
  const [message, setMessage] = useState("");

  const sendMessage = (e: SyntheticEvent) => {
    e.preventDefault();
    if (message) {
      console.log(message);
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
        />
        <button className="send-button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};
