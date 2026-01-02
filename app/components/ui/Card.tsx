import { ReactNode, memo, KeyboardEvent } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "blog";
  onClick?: () => void;
}

function Card({
  children,
  className = "",
  variant = "default",
  onClick,
}: CardProps) {
  const baseStyles =
    "bg-white border border-black/5 rounded-xl p-6 text-left shadow-card hover:shadow-card-hover transition-card duration-300 relative overflow-hidden h-full";

  const variantStyles =
    variant === "blog"
      ? "hover:-translate-y-1" // blog использует меньший translateY
      : "hover:-translate-y-[5px]";

  const combinedClassName = `${baseStyles} ${variantStyles} ${className} ${onClick ? "cursor-pointer" : ""}`;

  // Градиентная рамка при наведении (псевдо-элемент)
  const style = {
    "--gradient-border": "linear-gradient(45deg, #9137DF, #7B68EE)",
  } as React.CSSProperties;

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault(); // Prevent default scroll for Spacebar
      onClick();
    }
  };

  return (
    <div
      className={combinedClassName}
      style={style}
      onClick={onClick}
      onKeyDown={handleKeyDown} // Add keyboard handler
      role={onClick ? "button" : undefined} // Add role="button" if clickable
      tabIndex={onClick ? 0 : undefined} // Add tabIndex="0" if clickable
    >
      {/* Градиентная рамка через ::after псевдо-элемент */}
      <style jsx>{`
        div::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 12px;
          border: 1px solid transparent;
          transition: opacity 0.3s ease;
          border-image: var(--gradient-border);
          border-image-slice: 1;
          opacity: 0;
          pointer-events: none;
        }
        div:hover::after {
          opacity: 1;
        }
      `}</style>
      {children}
    </div>
  );
}

export default memo(Card);
