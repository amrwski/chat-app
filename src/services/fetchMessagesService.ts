import { MessageType } from "../types";
import { token, url } from "./config";

export const fetchMessages = async (since?: string): Promise<MessageType[]> => {
  try {
    const params = new URLSearchParams({
      ...(since ? { since, limit: "10" } : {}),
    });
    const response = await fetch(`${url}?${params}`, {
      headers: {
        token,
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};
