import { ReactNode } from "react";
import Link from "next/link";

interface GradientLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  showArrow?: boolean;
}

export default function GradientLink({
  href,
  children,
  className = "",
  showArrow = true,
}: GradientLinkProps) {
  return (
    <Link
      href={href}
      className={`relative inline-block font-medium bg-gradient-primary text-transparent bg-clip-text group ${className}`}
    >
      {children}
      {/* Подчёркивание */}
      <span className="absolute bottom-[-5px] left-0 w-full h-[2px] bg-gradient-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out" />

      {/* Стрелка */}
      {showArrow && (
        <span className="inline-block ml-1 group-hover:ml-1.5 group-hover:text-accent transition-all duration-300">
          →
        </span>
      )}
    </Link>
  );
}

// Для использования внутри карточек (без Link компонента)
export function GradientLinkText({
  children,
  className = "",
  showArrow = true,
}: {
  children: ReactNode;
  className?: string;
  showArrow?: boolean;
}) {
  return (
    <span
      className={`relative inline-block font-medium bg-gradient-primary text-transparent bg-clip-text group ${className}`}
    >
      {children}
      {/* Подчёркивание */}
      <span className="absolute bottom-[-5px] left-0 w-full h-[2px] bg-gradient-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out" />

      {/* Стрелка */}
      {showArrow && (
        <span className="inline-block ml-1 group-hover:ml-1.5 group-hover:text-accent transition-all duration-300">
          →
        </span>
      )}
    </span>
  );
}
