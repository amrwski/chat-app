import { MessageType } from "../types";
import { TOKEN, URL } from "./config";

export const fetchMessages = async (since?: string): Promise<MessageType[]> => {
  try {
    const params = new URLSearchParams({
      ...(since ? { since, limit: "10" } : {}),
    });
    const response = await fetch(`${URL}?${params}`, {
      headers: {
        token: TOKEN,
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
