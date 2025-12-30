// app/components/MarkdownImage.tsx
import Image from "next/image";

interface MarkdownImageProps {
  src?: string;
  alt?: string;
  title?: string;
  onImageClick?: (src: string) => void; // Added onImageClick prop
}

const MarkdownImage: React.FC<MarkdownImageProps> = ({
  src,
  alt,
  title,
  onImageClick,
}) => {
  // Determine if it's an external image that needs Next.js Image configuration
  // For simplicity, we'll assume all images are local or correctly configured in next.config.js
  // You might want to add more sophisticated logic here (e.g., check for absolute URLs)

  if (!src) return null;

  return (
    <Image
      src={src}
      alt={alt || ""}
      title={title}
      width={700} // Set a reasonable default width
      height={400} // Set a reasonable default height
      // layout="responsive" // In Next.js 13+, 'layout' is deprecated. Use fill, fixed, intrinsic, or responsive.
      // objectFit="contain" // Adjust as needed
      className="max-w-full h-auto cursor-pointer" // Added cursor-pointer
      priority // Consider loading important images earlier
      onClick={() => onImageClick && onImageClick(src)} // Attach onClick handler
    />
  );
};

export default MarkdownImage;
