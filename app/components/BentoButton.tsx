"use client";

import React from "react";
import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  size?: "default" | "small";
  onClick?: () => void;
  href?: string;
  className?: string;
};

export default function BentoButton({
  children,
  variant = "primary",
  size = "default",
  onClick,
  href,
  className: extraClassName,
}: ButtonProps) {
  // Общие базовые стили
  const baseClass =
    "inline-flex items-center justify-center rounded-lg font-unbounded-fix font-medium transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer";

  // Стили для размеров
  const sizes = {
    default: "px-6 py-3 text-xs md:text-sm",
    small: "px-[15px] py-[8px] text-[13px]", // Уменьшение отступа на 1px со всех четырех сторон
  };

  // Стили для вариантов
  const variants = {
    primary:
      "bg-gradient-to-r from-[#AB5EED] to-[#7A68EE] text-white",
    outline: "bg-white border border-gray-200 text-[#1a1a1a] hover:bg-gray-50",
  };

  const className = `${baseClass} ${sizes[size]} ${variants[variant]} ${extraClassName || ""}`;

  if (onClick) {
    return (
      <button onClick={onClick} className={className}>
        {children}
      </button>
    );
  }

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return <button className={className}>{children}</button>;
}
