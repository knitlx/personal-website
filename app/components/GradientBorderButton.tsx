import Link from 'next/link';
import type { ReactNode } from 'react';

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  useGradientText?: boolean;
};

const GradientBorderButton = ({ href, children, className = '', useGradientText = false }: Props) => {
  return (
    <Link
      href={href}
      className={`inline-block rounded-lg p-[1px] button-gradient shadow-button-cta transition-all duration-300 ease-in-out hover:-translate-y-0.5 no-underline hover-shadow-button-strong ${className}`}
    >
      <span className={`block bg-white text-center py-3 px-[30px] rounded-lg transition-all duration-300 ease-in-out hover:bg-transparent hover:text-white ${useGradientText ? 'font-bold' : 'font-semibold text-[#1E1E1E]'}`}>
        {useGradientText ? (
          <span className="gradient-text-button">{children}</span>
        ) : (
          children
        )}
      </span>
    </Link>
  );
};

export default GradientBorderButton;
