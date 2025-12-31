// app/components/MarkdownImage.tsx
import { ComponentProps } from "react";

interface MarkdownImageProps extends ComponentProps<"img"> {
  src?: string | Blob;
  alt?: string;
  title?: string;
  width?: string | number;
  height?: string | number;
  onImageClick?: (src: string) => void;
}

const MarkdownImage: React.FC<MarkdownImageProps> = ({
  src,
  alt,
  title,
  onImageClick,
  width,
  height,
  ...props
}) => {
  // Convert Blob to string if needed
  const imageSrc = src instanceof Blob ? URL.createObjectURL(src) : src;

  if (!imageSrc || typeof imageSrc !== "string") return null;

  return (
    <img
      src={imageSrc}
      alt={alt || ""}
      title={title}
      width={width}
      height={height}
      className="max-w-full h-auto cursor-pointer"
      onClick={() => onImageClick?.(imageSrc)}
      {...props}
    />
  );
};

export default MarkdownImage;
