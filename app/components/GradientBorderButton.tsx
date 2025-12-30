// app/components/GradientBorderButton.tsx
"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  useGradientText?: boolean;
  variant?: "gradient" | "border";
  externalHoveredState?: boolean; // New prop for external hover control
  size?: "xsmall" | "small" | "default"; // New prop for button size
  onMouseEnter?: (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => void;
  onMouseLeave?: (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => void;
} & ({ href: string; onClick?: never } | { href?: never; onClick: () => void });

const GradientBorderButton = ({
  children,
  className = "",
  useGradientText = false,
  variant = "border",
  externalHoveredState,
  size = "default", // Default size is 'default'
  onMouseEnter,
  onMouseLeave,
  ...props
}: Props) => {
  const [internalHovered, setInternalHovered] = useState(false); // Internal hover state

  // Determine the effective hovered state
  // If externalHoveredState is explicitly true or false, use it. Otherwise, use internalHovered.
  const isHovered =
    typeof externalHoveredState === "boolean"
      ? externalHoveredState
      : internalHovered;

  // Common base classes for the wrapper
  const baseOuterClasses =
    "inline-block rounded-lg transition-all duration-300 ease-in-out no-underline shadow-button-cta cursor-pointer";
  const hoverEffectClasses = isHovered
    ? "-translate-y-0.5 shadow-[0_6px_15px_rgba(123,104,238,0.5)]"
    : "";

  // Classes for the 'border' variant (outer wrapper acts as border)
  const borderBgClasses =
    "bg-[linear-gradient(135deg,#AB5EED_50%,#7A68EE_80%)]"; // For the frame
  // Classes for the 'gradient' variant (solid gradient button) - now uses the predefined class
  const gradientBgClasses = "button-gradient"; // Using predefined class for better consistency and JIT handling

  // Conditional classes for size
  const sizeClasses =
    size === "xsmall"
      ? "py-1.5 px-3 text-xs font-semibold"
      : size === "small"
        ? "py-2 px-4 text-sm"
        : "py-3 px-[30px] font-medium";

  // Classes for the inner span
  const baseInnerSpanClasses = `block ${sizeClasses} rounded-lg transition-all duration-300 ease-in-out font-unbounded-fix`;

  let innerSpanBgAndTextColor = "";
  // The 'variant' prop should control the default look.
  // The 'isHovered' should control the hover effect *on top of that*.

  // If variant is 'gradient', it's always bg-transparent text-white
  if (variant === "gradient") {
    innerSpanBgAndTextColor = `bg-transparent text-white`;
  } else {
    // variant === 'border'
    // If the border button is hovered (internally or externally), it becomes 'gradient' like
    // So, if it's border, and it's hovered, it should look gradient-like (transparent bg, white text)
    if (isHovered) {
      innerSpanBgAndTextColor = `bg-transparent text-white`;
    } else {
      // Not hovered, so it's a standard border button
      innerSpanBgAndTextColor = `bg-white ${useGradientText ? "" : "text-[#1E1E1E]"}`;
    }
  }

  const finalInnerSpanClasses = `flex items-center justify-center ${baseInnerSpanClasses} ${innerSpanBgAndTextColor}`;

  // Determine final classes based on variant
  // Explicitly manage padding based on variant
  const outerPaddingClass = variant === "gradient" ? "p-0" : "p-[1px]";

  const outerWrapperClasses = `${baseOuterClasses} ${className} ${hoverEffectClasses} ${
    variant === "gradient" ? gradientBgClasses : borderBgClasses
  } ${outerPaddingClass}`; // Apply padding explicitly after variant classes

  // Handle gradient text separately
  const content =
    useGradientText && variant === "border" && !isHovered ? ( // Use isHovered here
      <span className="gradient-text-button">{children}</span>
    ) : (
      children
    );

  const buttonContent = (
    <span className={finalInnerSpanClasses}>{content}</span>
  );

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => {
    setInternalHovered(true);
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleMouseLeave = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => {
    setInternalHovered(false);
    if (onMouseLeave) onMouseLeave(e);
  };

  if ("onClick" in props) {
    return (
      <button
        onClick={props.onClick}
        className={outerWrapperClasses}
        onMouseEnter={handleMouseEnter} // Use internal handlers
        onMouseLeave={handleMouseLeave} // Use internal handlers
      >
        {buttonContent}
      </button>
    );
  }

  return (
    <Link
      href={props.href}
      className={outerWrapperClasses}
      onMouseEnter={handleMouseEnter} // Use internal handlers
      onMouseLeave={handleMouseLeave} // Use internal handlers
    >
      {buttonContent}
    </Link>
  );
};

export default GradientBorderButton;
