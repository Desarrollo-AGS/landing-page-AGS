"use client";

import { useState, type ReactNode } from "react";

export interface AccordionItem {
  id: string;
  trigger: ReactNode;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
}

function ChevronDownIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-5 w-5 shrink-0 transition-transform duration-200 ${className}`}
      aria-hidden="true"
    >
      <path d="M5 7.5 10 12.5 15 7.5" />
    </svg>
  );
}

/** Acordeón de expansión única: abrir un item cierra cualquier otro abierto. */
export function Accordion({ items, defaultOpenId }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  return (
    <div className="divide-y divide-neutral-200 border-y border-neutral-200">
      {items.map((item) => {
        const isOpen = item.id === openId;
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                aria-expanded={isOpen}
                aria-controls={`accordion-panel-${item.id}`}
                id={`accordion-trigger-${item.id}`}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-medium text-brand-navy">{item.trigger}</span>
                <ChevronDownIcon className={isOpen ? "rotate-180" : ""} />
              </button>
            </h3>
            <div
              id={`accordion-panel-${item.id}`}
              role="region"
              aria-labelledby={`accordion-trigger-${item.id}`}
              hidden={!isOpen}
              className="pb-5 text-sm leading-relaxed text-brand-stone-900/70"
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
