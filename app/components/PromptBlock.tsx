"use client";

import { useState } from "react";
import CheckIcon from "./icons/CheckIcon";
import CopyIcon from "./icons/CopyIcon";

interface PromptBlockProps {
  children: React.ReactNode;
}

export default function PromptBlock({ children }: PromptBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = typeof children === "string" ? children : "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="relative my-6">
      <div className="absolute -top-3 left-4 bg-purple-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm z-10">
        Prompt
      </div>
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-5 shadow-md pt-8">
        <div className="flex justify-end mb-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 text-sm text-purple-700 hover:text-purple-900 transition-colors px-2 py-1 rounded hover:bg-purple-100"
            aria-label={copied ? "Скопировано!" : "Копировать промт"}
          >
            {copied ? (
              <>
                <CheckIcon />
                <span>Скопировано!</span>
              </>
            ) : (
              <>
                <CopyIcon />
                <span>Копировать</span>
              </>
            )}
          </button>
        </div>
        <div className="text-sm text-gray-800 whitespace-pre-wrap break-words font-mono leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
