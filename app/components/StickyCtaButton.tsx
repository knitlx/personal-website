"use client";

import BentoButton from "./BentoButton";

interface StickyCtaButtonProps {
  href?: string;
  onClick?: () => void;
  text: string;
}

const StickyCtaButton: React.FC<StickyCtaButtonProps> = ({
  href,
  onClick,
  text,
}) => {
  return (
    <div className="">
      <BentoButton
        variant="primary"
        size="default"
        onClick={onClick}
        href={href}
      >
        {text}
      </BentoButton>
    </div>
  );
};

export default StickyCtaButton;
