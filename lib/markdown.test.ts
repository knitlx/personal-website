import { appendMarkdownImage, buildMarkdownImage } from "./markdown";

describe("markdown helpers", () => {
  it("builds markdown image syntax", () => {
    expect(buildMarkdownImage("/uploads/pic.webp")).toBe("![image](/uploads/pic.webp)");
  });

  it("appends image markdown to empty content", () => {
    expect(appendMarkdownImage("", "/uploads/pic.webp")).toBe("![image](/uploads/pic.webp)\n");
  });

  it("appends image markdown to existing content with a newline", () => {
    expect(appendMarkdownImage("Hello", "/uploads/pic.webp")).toBe(
      "Hello\n![image](/uploads/pic.webp)\n"
    );
  });
});
