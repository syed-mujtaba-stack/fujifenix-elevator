"use client";

import { useEffect, useState, useRef } from "react";

const GOOGLE_TRANSLATE_SCRIPT =
  "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "ar", name: "Arabic" },
  { code: "ur", name: "Urdu" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "zh-CN", name: "Chinese (Simplified)" },
  { code: "zh-TW", name: "Chinese (Traditional)" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
];

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop() ?? "";
    return cookieValue.split(";").shift() ?? null;
  }
  return null;
}

function setCookie(
  name: string,
  value: string,
  days: number = 365
): void {
  if (typeof document === "undefined") return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
}

export function GoogleTranslate({
  elementId = "google_translate_element",
  enabled = true,
}: { elementId?: string; enabled?: boolean } = {}) {
  const [initialized, setInitialized] = useState(false);
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const scriptRef = useRef<HTMLScriptElement>(null);

  useEffect(() => {
    if (initialized) return;
    if (!enabled) {
      setInitialized(true);
      return;
    }

    // 1. Hide default Google Translate elements (will run after script loads)
    const hideDefaultUI = () => {
      // Hide the top banner iframe
      const banner = document.querySelector(
        'iframe.goog-te-banner-frame, iframe[class*="goog-te-banner-frame"]'
      ) as HTMLElement | null;
      if (banner) {
        banner.style.display = "none";
        banner.style.visibility = "hidden";
        banner.style.height = "0";
      }

      // Hide the combo dropdown native element
      const combo = document.querySelector("goog-te-combo") as HTMLElement | null;
      if (combo) {
        combo.style.display = "none";
        combo.style.position = "absolute";
        combo.style.width = "0";
        combo.style.height = "0";
      }
    };

    // 2. Clean up any previous script
    if (scriptRef.current) {
      scriptRef.current.remove();
      scriptRef.current = null;
    }

    // 3. Load Google Translate script dynamically (only once)
    const script = document.createElement("script");
    script.src = GOOGLE_TRANSLATE_SCRIPT;
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    script.charset = "utf-8";

    const onScriptLoad = () => {
      // 4. Initialize the widget after script loads
      window.googleTranslateElementInit = () => {
        try {
          new window.google.translate.TranslateElement({
            pageLanguage: "en",
            includedLanguages:
              "en,ar,ur,es,fr,de,zh-CN,zh-TW,ja,ko,pt,ru",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          }, elementId);
          setWidgetLoaded(true);
        } catch (e) {
          console.error("Google Translate init error:", e);
        }
      };

      // 5. Force all language labels to English after init
      const forceEnglishLabels = () => {
        const checkAndForce = () => {
          const select = document.querySelector("goog-te-combo") as
            | HTMLSelectElement
            | null;
          if (select && select.options.length > 1) {
            Array.from(select.options).forEach((opt: HTMLElement) => {
              const code = opt.getAttribute("value");
              if (code) {
                const lang = LANGUAGES.find((l) => l.code === code);
                if (lang) {
                  (opt as HTMLOptionElement).text = lang.name;
                }
              }
            });
            // Dispatch event so Google Translate detects the change
            const changeEvent = new Event("change", { bubbles: true });
            select.dispatchEvent(changeEvent);
          } else {
            setTimeout(checkAndForce, 200);
          }
        };
        checkAndForce();

        // 6. Sync with googtrans cookie on language change
        const setupCookieSync = () => {
          const checkCookie = () => {
            const cookieValue = getCookie("googtrans");
            if (cookieValue) {
              // Parse: /en/ar or /en/ur etc.
              const match = cookieValue.match(/^\/\w{2}\/(\w{2,})$/);
              if (match) {
                const targetLang = match[1];
                const select = document.querySelector(
                  "goog-te-combo"
                ) as HTMLSelectElement | null;
                if (select) {
                  const option = Array.from(select.options).find(
                    (opt: HTMLOptionElement) => opt.value === targetLang
                  );
                  if (option) {
                    option.selected = true;
                    const changeEvent = new Event("change", {
                      bubbles: true,
                    });
                    option.dispatchEvent(changeEvent);
                  }
                }
              }
            }
            setTimeout(checkCookie, 500);
          };
          checkCookie();
        };

        setupCookieSync();

        setInitialized(true);
      };

      // Execute after a small delay to ensure DOM is ready
      setTimeout(() => {
        if (window.google && window.google.translate) {
          forceEnglishLabels();
        } else {
          setTimeout(forceEnglishLabels, 500);
        }
      }, 100);
    };

    const onScriptError = () => {
      console.error("Google Translate script failed to load");
      setInitialized(true);
    };

    script.onload = onScriptLoad;
    script.onerror = onScriptError;

    document.body.appendChild(script);
    scriptRef.current = script;

    // Cleanup on unmount
    return () => {
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
    };
  }, [initialized, enabled, elementId]);

  // Render custom toggle button that opens Google Translate dropdown
  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
      }}
    >
      {/* Custom English toggle button */}
      <button
        aria-label="Translate this page"
        onClick={() => {
          // Programmatically trigger Google Translate widget
          const select = document.querySelector(
            "goog-te-combo"
          ) as HTMLSelectElement | null;
          if (select) {
            select.selectedIndex = 0; // Select English (first option)
            const changeEvent = new Event("change", { bubbles: true });
            select.dispatchEvent(changeEvent);
          }
        }}
        className="flex items-center gap-1 px-2 py-1 rounded-md border border-slate-300 bg-white text-slate-600 text-sm hover:text-[#0047BB] focus:outline-none focus:ring-2 focus:ring-[#0047BB] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        type="button"
      >
        EN
        <svg
          className="h-3 w-3"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M2 4l4 4 4-4" />
        </svg>
      </button>

      {/* Google Translate widget container - hidden by default, appears when widget loads */}
      {widgetLoaded && (
        <div
          id={elementId}
          style={{
            position: "absolute",
            left: "-9999px",
            top: "-9999px",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}