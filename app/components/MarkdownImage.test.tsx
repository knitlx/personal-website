import React from "react";
import { render, screen } from "@testing-library/react";
import MarkdownImage from "./MarkdownImage";

describe("MarkdownImage", () => {
  it("uses a sane default max width to avoid giant images in article body", () => {
    render(<MarkdownImage src="/uploads/test.webp" alt="Test image" />);

    const image = screen.getByAltText("Test image");
    expect(image).toHaveClass("w-full");
    expect(image).toHaveClass("max-w-[min(100%,760px)]");
  });

  it("supports markdown title size hints", () => {
    render(<MarkdownImage src="/uploads/test.webp" alt="Sized image" title="w=420 h=240" />);

    const image = screen.getByAltText("Sized image");
    expect(image).toHaveStyle({ width: "420px", height: "240px" });
  });
});
