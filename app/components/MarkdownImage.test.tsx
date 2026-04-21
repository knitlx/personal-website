import React from "react";
import { render, screen } from "@testing-library/react";
import MarkdownImage from "./MarkdownImage";

describe("MarkdownImage", () => {
  it("uses a sane default max width to avoid giant images in article body", () => {
    render(<MarkdownImage src="/uploads/test.webp" alt="Test image" />);

    const image = screen.getByAltText("Test image");
    expect(image).toHaveClass("w-full");
    expect(image).toHaveClass("max-w-full");
  });

  it("supports markdown title size hints", () => {
    render(<MarkdownImage src="/uploads/test.webp" alt="Sized image" title="w=420 h=240" />);

    const image = screen.getByAltText("Sized image");
    expect(image).toHaveStyle({ maxWidth: "420px", width: "100%" });
  });

  it("keeps percent-based width as percent", () => {
    render(<MarkdownImage src="/uploads/test.webp" alt="Percent image" title="w=60%" />);

    const image = screen.getByAltText("Percent image");
    expect(image).toHaveStyle({ maxWidth: "60%", width: "100%" });
  });

  it("uses inline wrapper when image is clickable", () => {
    render(
      <MarkdownImage src="/uploads/test.webp" alt="Clickable image" onImageClick={jest.fn()} />
    );

    const button = screen.getByRole("button", { name: "Открыть изображение: Clickable image" });
    expect(button).toHaveClass("inline-block");
  });
});
