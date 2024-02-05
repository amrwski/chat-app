import { Message } from "../types";
import { url, token } from "./config";

export const postMessage = async (message: string, author: string): Promise<Message> => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({ message, author }),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
