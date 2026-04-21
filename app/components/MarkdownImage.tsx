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

  const parseSizeHint = (
    value: string | undefined
  ): { width?: string; height?: string; eager?: boolean } => {
    if (!value) return {};

    const widthMatch = value.match(/(?:^|\s)(?:w|width)\s*=\s*([0-9]+(?:%)?)(?=\s|$)/i);
    const heightMatch = value.match(/(?:^|\s)(?:h|height)\s*=\s*([0-9]+(?:%)?)(?=\s|$)/i);
    const eagerMatch = /(?:^|\s)(?:eager|priority)\s*=\s*1(?=\s|$)/i.test(value ?? "");

    const toCssSize = (raw: string | undefined): string | undefined => {
      if (!raw) return undefined;
      return raw.endsWith("%") ? raw : `${raw}px`;
    };

    return {
      width: toCssSize(widthMatch?.[1]),
      height: toCssSize(heightMatch?.[1]),
      eager: eagerMatch,
    };
  };

  const sizeFromTitle = parseSizeHint(title);
  const loadingValue: "lazy" | "eager" = sizeFromTitle.eager ? "eager" : "lazy";
  const widthFromProp =
    typeof props.width === "number"
      ? `${props.width}px`
      : typeof props.width === "string"
        ? props.width
        : undefined;
  const heightFromProp =
    typeof props.height === "number"
      ? `${props.height}px`
      : typeof props.height === "string"
        ? props.height
        : undefined;

  const hasExplicitWidth = Boolean(sizeFromTitle.width ?? widthFromProp);
  const finalStyle = {
    width: sizeFromTitle.width ?? widthFromProp,
    height: sizeFromTitle.height ?? heightFromProp,
  };
  const imageClassName = hasExplicitWidth
    ? "h-auto max-w-full"
    : "h-auto w-full max-w-[min(100%,760px)]";

  const handleClick = () => {
    onImageClick?.(imageSrc);
  };

  const image = (
    <img
      src={imageSrc}
      alt={alt ?? ""}
      title={title}
      loading={loadingValue}
      decoding="async"
      className={imageClassName}
      style={finalStyle}
      {...props}
    />
  );

  if (!onImageClick) return image;

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-block p-0 border-none bg-transparent cursor-pointer align-top"
      aria-label={alt ? `Открыть изображение: ${alt}` : "Открыть изображение"}
    >
      {image}
    </button>
  );
};

export default MarkdownImage;
