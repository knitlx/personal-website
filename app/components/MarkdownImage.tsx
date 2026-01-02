// app/components/MarkdownImage.tsx
import { ComponentProps } from "react";
import Image from "next/image"; // Add import for Next.js Image component

interface MarkdownImageProps extends ComponentProps<"img"> {
  src?: string | Blob;
  alt?: string;
  title?: string;
  width?: string | number;
  height?: string | number;
  onImageClick?: (src: string) => void;
  // Add blurDataURL and placeholder for Next.js Image component
  blurDataURL?: string;
  placeholder?: "blur" | "empty";
}

const MarkdownImage: React.FC<MarkdownImageProps> = ({
  src,
  alt,
  title,
  onImageClick,
  width,
  height,
  blurDataURL,
  placeholder,
  ...props
}) => {
  // Convert Blob to string if needed
  const imageSrc = src instanceof Blob ? URL.createObjectURL(src) : src;

  if (!imageSrc || typeof imageSrc !== "string") return null;

  const handleClick = () => {
    onImageClick?.(imageSrc);
  };

  // If there's an onClick handler, render a button for accessibility
  if (onImageClick) {
    return (
      <button
        onClick={handleClick}
        className="block p-0 border-none bg-transparent cursor-pointer" // Basic styling for button reset
        aria-label={alt ? `View image: ${alt}` : "View image"}
      >
        <Image // Use Next.js Image component for optimization
          src={imageSrc}
          alt={alt ?? ""}
          title={title}
          width={(width as number) || 0} // Next.js Image requires number for width/height
          height={(height as number) || 0}
          className="max-w-full h-auto"
          blurDataURL={blurDataURL}
          placeholder={placeholder}
          {...props}
        />
      </button>
    );
  }

  // If no onClick handler, render the Image directly
  return (
    <Image // Use Next.js Image component for optimization
      src={imageSrc}
      alt={alt ?? ""}
      title={title}
      width={(width as number) || 0}
      height={(height as number) || 0}
      className="max-w-full h-auto"
      blurDataURL={blurDataURL}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default MarkdownImage;
