import { MessageType } from "../types";
import { URL, TOKEN } from "./config";

export const postMessage = async (message: string, author: string): Promise<MessageType> => {
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: TOKEN,
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
