import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { InputBar } from "../components";
import { postMessage } from "../services";
import { USERNAME } from "../services/config";

vi.mock("../services", () => ({
  postMessage: vi.fn(),
  USERNAME: "testUser",
}));

describe("InputBar Component", () => {
  let inputElement: HTMLInputElement;
  let sendButton: HTMLElement;

  beforeEach(() => {
    render(<InputBar />);
    inputElement = screen.getByLabelText(/input message/i);
    sendButton = screen.getByLabelText(/send message/i);
  });

  it("renders correctly and focuses on the input field", () => {
    expect(inputElement).toBeInTheDocument();
    expect(document.activeElement).toBe(inputElement);
  });

  it("updates state on input change", () => {
    fireEvent.change(inputElement, { target: { value: "Hello!" } });
    expect(inputElement.value).toBe("Hello!");
  });

  it("calls postMessage and clears input on send button click", () => {
    const message = "Hello!";
    fireEvent.change(inputElement, { target: { value: message } });
    fireEvent.click(sendButton);

    expect(postMessage).toHaveBeenCalledWith(message, USERNAME);
    expect(inputElement.value).toBe("");
  });

  it("calls postMessage and clears input on Enter key press", () => {
    const message = "Hello!";
    fireEvent.change(inputElement, { target: { value: message } });
    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

    expect(postMessage).toHaveBeenCalledWith(message, USERNAME);
    expect(inputElement.value).toBe("");
  });
});
