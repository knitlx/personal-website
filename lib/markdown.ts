export function buildMarkdownImage(url: string, alt = "image"): string {
  return `![${alt}](${url})`;
}

export function appendMarkdownImage(content: string, url: string, alt = "image"): string {
  const imageMarkdown = buildMarkdownImage(url, alt);

  if (!content.trim()) {
    return `${imageMarkdown}\n`;
  }

  const hasTrailingNewline = content.endsWith("\n");
  const separator = hasTrailingNewline ? "" : "\n";

  return `${content}${separator}${imageMarkdown}\n`;
}
