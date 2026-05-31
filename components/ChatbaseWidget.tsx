"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Sparkles } from "lucide-react";

const CHATBASE_SCRIPT_ID = "gDrK6PxnBT42Ki6MCXPgL";
const CHATBASE_EMBED_SRC = "https://www.chatbase.co/embed.min.js";
const CHATBASE_DOMAIN = "www.chatbase.co";
const STYLE_TAG_ID = "hackpilot-chatbase-styles";

type ChatbaseQueue = unknown[][];
type ChatbaseHandler = (...args: unknown[]) => void;
type ChatbaseStub = ChatbaseHandler & { q?: ChatbaseQueue };

declare global {
  interface Window {
    chatbase?: ChatbaseStub;
  }
}

function getChatbaseState(): string | undefined {
  if (!window.chatbase) return undefined;

  try {
    const state = window.chatbase("getState");
    return typeof state === "string" ? state : undefined;
  } catch {
    return undefined;
  }
}

function initializeChatbaseStub(): void {
  if (typeof window === "undefined") return;
  if (getChatbaseState() === "initialized") return;

  const chatbaseFn: ChatbaseStub = (...args: unknown[]) => {
    if (!chatbaseFn.q) {
      chatbaseFn.q = [];
    }
    chatbaseFn.q.push(args);
  };

  window.chatbase = new Proxy(chatbaseFn, {
    get(target, prop) {
      if (prop === "q") {
        return target.q;
      }
      return (...args: unknown[]) => target(prop as string, ...args);
    },
  });
}

function appendChatbaseEmbedScript(): void {
  if (document.getElementById(CHATBASE_SCRIPT_ID)) return;

  const script = document.createElement("script");
  script.src = CHATBASE_EMBED_SRC;
  script.id = CHATBASE_SCRIPT_ID;
  script.setAttribute("domain", CHATBASE_DOMAIN);
  document.body.appendChild(script);
}

function injectChatbaseStyles(): void {
  if (document.getElementById(STYLE_TAG_ID)) return;

  const style = document.createElement("style");
  style.id = STYLE_TAG_ID;
  style.textContent = `
    #chatbase-bubble-button {
      display: none !important;
    }

    iframe[src*="chatbase"],
    [id*="chatbase"]:not(#${CHATBASE_SCRIPT_ID}):not(#${STYLE_TAG_ID}) {
      animation: hackpilot-chatbase-entrance 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }

    @keyframes hackpilot-chatbase-entrance {
      from {
        opacity: 0;
        transform: translateY(14px) scale(0.97);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @media (max-width: 640px) {
      iframe[src*="chatbase"] {
        max-width: calc(100vw - 1rem) !important;
        max-height: calc(100dvh - 5.5rem) !important;
      }
    }
  `;
  document.head.appendChild(style);
}

function removeChatbaseStyles(): void {
  document.getElementById(STYLE_TAG_ID)?.remove();
}

export function ChatbaseWidget() {
  const [isMounted, setIsMounted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const loadListenerRef = useRef<(() => void) | null>(null);
  const observerRef = useRef<MutationObserver | null>(null);
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const supportButtonId = useId();

  const openChat = useCallback(() => {
    window.chatbase?.("open");
  }, []);

  useEffect(() => {
    setIsMounted(true);
    initializeChatbaseStub();
    injectChatbaseStyles();

    const onLoad = () => {
      appendChatbaseEmbedScript();
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      loadListenerRef.current = onLoad;
      window.addEventListener("load", onLoad);
    }

    const markReady = () => {
      setIsReady(true);
    };

    observerRef.current = new MutationObserver(() => {
      const chatbaseNode = document.querySelector(
        'iframe[src*="chatbase"], #chatbase-bubble-button, [id*="chatbase-bubble"]'
      );

      if (chatbaseNode) {
        markReady();
        observerRef.current?.disconnect();
      }
    });

    observerRef.current.observe(document.body, {
      childList: true,
      subtree: true,
    });

    fallbackTimerRef.current = setTimeout(markReady, 2500);

    if (getChatbaseState() === "initialized") {
      markReady();
    }

    return () => {
      if (loadListenerRef.current) {
        window.removeEventListener("load", loadListenerRef.current);
        loadListenerRef.current = null;
      }

      observerRef.current?.disconnect();
      observerRef.current = null;

      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current);
        fallbackTimerRef.current = null;
      }

      removeChatbaseStyles();
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <AnimatePresence>
      {isReady && (
        <motion.button
          id={supportButtonId}
          type="button"
          aria-label="Open AI Support chat"
          onClick={openChat}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.95 }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{
            scale: 1.04,
            boxShadow:
              "0 0 28px rgba(168, 85, 247, 0.35), 0 0 48px rgba(6, 182, 212, 0.2)",
          }}
          whileTap={{ scale: 0.97 }}
          className="fixed z-[9998] flex items-center gap-2.5 rounded-full border border-indigo-500/25 bg-[rgba(11,17,32,0.82)] px-4 py-3 text-sm font-medium text-slate-100 shadow-[0_8px_32px_rgba(0,0,0,0.55),0_0_24px_rgba(99,102,241,0.12)] backdrop-blur-xl transition-colors hover:border-cyan-400/40 hover:text-white sm:px-5 sm:py-3.5 sm:text-[0.9375rem]"
          style={{
            bottom: "max(1.25rem, env(safe-area-inset-bottom))",
            right: "max(1.25rem, env(safe-area-inset-right))",
          }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10"
          />
          <span
            aria-hidden
            className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/30 via-purple-500/25 to-cyan-500/30 ring-1 ring-white/10"
          >
            <MessageCircle className="h-4 w-4 text-cyan-300" strokeWidth={2} />
          </span>
          <span className="relative hidden sm:inline">AI Support</span>
          <Sparkles
            className="relative h-4 w-4 text-purple-400/90 sm:hidden"
            strokeWidth={2}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
