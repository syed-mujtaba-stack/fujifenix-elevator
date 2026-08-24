"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

/* WeChat brand glyph — two chat bubbles */
export function WeChatIcon({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} aria-hidden="true">
      <path d="M8.691 2.188C3.941 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .32.26.58.58.58a.544.544 0 0 0 .326-.109l1.9-1.1a.882.882 0 0 1 .448-.118c.079 0 .157.009.232.025 1.02.279 2.107.417 3.226.417h.219c-.104-.475-.16-.967-.16-1.471 0-3.394 2.895-6.14 6.47-6.14.224 0 .445.011.664.033C16.123 4.851 12.791 2.188 8.691 2.188zm-2.6 4.408a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1zm5.086 0a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1zm3.773 5.284c-3.067 0-5.556 2.197-5.556 4.907 0 2.71 2.489 4.906 5.556 4.906.652 0 1.28-.096 1.867-.27a.72.72 0 0 1 .367-.095c.118 0 .227.032.325.094l1.516.877a.435.435 0 0 0 .26.087.462.462 0 0 0 .463-.463c0-.057-.023-.114-.038-.17l-.311-1.18a.587.587 0 0 1-.023-.17.47.47 0 0 1 .17-.364c1.092-.854 1.79-2.051 1.79-3.422 0-2.71-2.49-4.907-5.556-4.907zm-1.806 2.443a.845.845 0 1 1 0 1.69.845.845 0 0 1 0-1.69zm3.61 0a.845.845 0 1 1 0 1.69.845.845 0 0 1 0-1.69z" />
    </svg>
  );
}

const WECHAT_GREEN = "#07C160";

interface WeChatQRButtonProps {
  /** dark = for dark sections (CTA page), light = for white sections */
  variant?: "dark" | "light";
  label?: string;
  className?: string;
}

/**
 * "Chat on WeChat" trigger + QR modal.
 * QR source: /public/WeChat.svg (client-supplied WeChat QR code).
 */
export default function WeChatQRButton({
  variant = "light",
  label = "CHAT ON WECHAT",
  className = "",
}: WeChatQRButtonProps) {
  const [open, setOpen] = useState(false);

  /* Escape to close + body scroll lock while the modal is open */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const triggerStyles =
    variant === "dark"
      ? "group inline-flex items-center gap-2.5 border border-white/15 bg-white/[0.03] px-5 py-3 eyebrow text-white transition-all duration-200 hover:border-[#07C160] hover:bg-[#07C160]/10 hover:text-[#07C160]"
      : "group inline-flex items-center gap-2.5 border border-slate-200 bg-white px-5 py-3 eyebrow text-[#0f172a] transition-all duration-200 hover:border-[#07C160] hover:bg-[#07C160]/5 hover:text-[#0f172a]";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`${triggerStyles} ${className}`}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <WeChatIcon className="h-4 w-4 flex-shrink-0" style={{ color: WECHAT_GREEN }} />
        <span className="group-hover:text-inherit">{label}</span>
        <span
          className="transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden="true"
        >
          →
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-[#071324]/85 backdrop-blur-sm" />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Fuji Fenix WeChat QR code"
              className="relative w-full max-w-sm bg-white shadow-[0_24px_64px_rgba(7,19,36,0.45)]"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Green accent bar */}
              <div className="h-1 w-full" style={{ background: WECHAT_GREEN }} />

              <div className="p-7 md:p-8">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <WeChatIcon className="h-5 w-5" style={{ color: WECHAT_GREEN }} />
                    <span className="eyebrow text-[#0f172a]">WECHAT</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    className="flex h-9 w-9 items-center justify-center text-slate-400 transition-colors hover:bg-slate-100 hover:text-[#0f172a]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </button>
                </div>

                {/* QR */}
                <div className="mx-auto w-fit border border-slate-200 p-3">
                  <Image
                    src="/WeChat.svg"
                    alt="Fuji Fenix Elevator WeChat QR code"
                    width={248}
                    height={248}
                    unoptimized
                    className="h-[220px] w-[220px] md:h-[248px] md:w-[248px]"
                  />
                </div>

                {/* Caption */}
                <div className="mt-6 text-center">
                  <p className="subheading text-[#0f172a]" style={{ fontSize: "14px", letterSpacing: "0.04em" }}>
                    SCAN TO CHAT ON WECHAT
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Open WeChat on your phone and scan this code — our team responds during business hours (CST).
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
