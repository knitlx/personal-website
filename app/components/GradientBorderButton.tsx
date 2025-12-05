import Link from 'next/link';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  useGradientText?: boolean;
} & ({ href: string; onClick?: never; } | { href?: never; onClick: () => void; });

const GradientBorderButton = ({ children, className = '', useGradientText = false, ...props }: Props) => {
  const commonClassName = `inline-block rounded-lg p-[1px] bg-[linear-gradient(135deg,#AB5EED_50%,#7A68EE_80%)] hover:bg-[linear-gradient(to_right,#619BEC,#89B7F6)] shadow-button-cta transition-all duration-300 ease-in-out hover:-translate-y-0.5 no-underline hover-shadow-button-strong ${className}`;

  const innerSpan = (
    <span className={`block bg-white text-center py-3 px-[30px] rounded-lg transition-all duration-300 ease-in-out hover:bg-transparent hover:text-white ${useGradientText ? 'font-bold' : 'font-semibold text-[#1E1E1E]'}`}>
      {useGradientText ? (
        <span className="gradient-text-button">{children}</span>
      ) : (
        children
      )}
    </span>
  );

  if ('onClick' in props) {
    return (
      <button onClick={props.onClick} className={commonClassName}>
        {innerSpan}
      </button>
    );
  }

  return (
    <Link href={props.href} className={commonClassName}>
      {innerSpan}
    </Link>
  );
};

export default GradientBorderButton;
