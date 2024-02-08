import { useState, useEffect, useCallback, useRef } from "react";
import { fetchMessages } from "../services";
import { MessageType } from "../types";
import { POLLING_FREQ } from "../services/config";

export const useMessage = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const lastFetchedTime = useRef("");

  const fetchAndSetMessages = useCallback(async () => {
    try {
      const since = lastFetchedTime.current;
      const newMessages = await fetchMessages(since);

      if (newMessages.length) {
        lastFetchedTime.current = newMessages[newMessages.length - 1].timestamp;
        setMessages((prevMessages) => {
          const messageIds = new Set(prevMessages.map((msg) => msg._id)); // this is to prevent rendering duplicate msgs once polling starts after the inital fetch
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
    const intervalId = setInterval(fetchAndSetMessages, POLLING_FREQ);

    return () => clearInterval(intervalId);
  }, [fetchAndSetMessages]);

  return { messages, isLoadingInitial };
};
