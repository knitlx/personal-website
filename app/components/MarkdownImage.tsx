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
  ...props
}) => {
  const imageSrc = typeof src === "string" ? src : undefined;

  if (!imageSrc || typeof imageSrc !== "string") return null;

  const handleClick = () => {
    onImageClick?.(imageSrc);
  };

  const image = (
    <img
      src={imageSrc}
      alt={alt ?? ""}
      title={title}
      loading="lazy"
      decoding="async"
      className="max-w-full h-auto"
      {...props}
    />
  );

  if (!onImageClick) return image;

  return (
    <button
      type="button"
      onClick={handleClick}
      className="block p-0 border-none bg-transparent cursor-pointer"
      aria-label={alt ? `Открыть изображение: ${alt}` : "Открыть изображение"}
    >
      {image}
    </button>
  );
};

export default MarkdownImage;
