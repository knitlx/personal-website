import { ReactNode, memo, KeyboardEvent } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "blog";
  onClick?: () => void;
}

function Card({ children, className = "", variant = "default", onClick }: CardProps) {
  const baseStyles =
    "bg-white border border-black/5 rounded-xl p-6 text-left shadow-card hover:shadow-card-hover transition-card duration-300 relative overflow-hidden h-full";

  const variantStyles =
    variant === "blog"
      ? "hover:-translate-y-1" // blog использует меньший translateY
      : "hover:-translate-y-[5px]";

  const combinedClassName = `${baseStyles} ${variantStyles} ${className} ${onClick ? "cursor-pointer" : ""} gradient-border-card-hover`;

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
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}

export default memo(Card);
