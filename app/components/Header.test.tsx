import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";

// Mock the ContactModal to isolate the Header component's functionality
jest.mock("./ContactModal", () => {
  // A simple mock that renders based on the isOpen prop
  return function MockContactModal({
    isOpen,
    onClose,
  }: {
    isOpen: boolean;
    onClose: () => void;
  }) {
    if (!isOpen) return null;
    return (
      <div role="dialog" aria-modal="true">
        <span>Mock Contact Modal</span>
        <button onClick={onClose}>Close</button>
      </div>
    );
  };
});

describe("Header", () => {
  it("should open and close the contact modal when the button is clicked", () => {
    render(<Header />);

    // 1. Initially, the modal should not be in the document
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    // 2. Find the button and click it to open the modal
    const openModalButton = screen.getByRole("button", {
      name: "Обсудить проект",
    });
    fireEvent.click(openModalButton);

    // 3. After clicking, the modal (or our mock of it) should be in the document
    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();
    expect(screen.getByText("Mock Contact Modal")).toBeInTheDocument();

    // 4. Find the close button inside our mock modal and click it
    const closeModalButton = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeModalButton);

    // 5. After clicking close, the modal should be removed from the document
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
