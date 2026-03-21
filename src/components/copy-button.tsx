"use client";

import { useState } from "react";

interface CopyButtonProps {
  text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select text in the adjacent code block
      const codeEl = document.querySelector("[data-copy-target]");
      if (codeEl) {
        const range = document.createRange();
        range.selectNodeContents(codeEl);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="rounded-lg bg-white px-6 py-3 font-semibold text-black transition-all hover:opacity-90 active:scale-95"
    >
      {copied ? "Copié !" : "Copier la commande"}
    </button>
  );
}
