import { describe, it, vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MessageList } from "../components";
import * as useMessageModule from "../hooks";
import { MessageType } from "../types";

interface IMockDataType {
  messages: MessageType[];
  isLoadingInitial: boolean;
}

vi.mock("../hooks", () => ({
  useMessage: vi.fn(),
}));

const mockMessages = [
  { _id: "1", author: "Lorem", message: "Hi", timestamp: "1707248491721", token: "dummyToken" },
  { _id: "2", author: "Ipsum", message: "Hello", timestamp: "1707248491723", token: "dummyToken" },
];

const setup = (mockData: IMockDataType) => {
  (useMessageModule.useMessage as jest.Mock).mockImplementation(() => mockData);
  return render(<MessageList />);
};

describe("MessageList", () => {
  window.HTMLElement.prototype.scrollIntoView = function () {};
  it("renders a loading spinner while data is loading", () => {
    setup({ messages: [], isLoadingInitial: true });

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("displays message bubbles when data has been fetched", () => {
    const { container } = setup({ messages: mockMessages, isLoadingInitial: false });

    const messageContents = container.querySelectorAll(".message-content");

    expect(screen.getByText("Hi")).toBeInTheDocument();
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(messageContents.length).toBe(mockMessages.length);
  });
});
