import { Send } from "lucide-react";
import type React from "react";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
}

export const ChatInput = ({
  input,
  setInput,
  handleSubmit,
  isLoading,
}: ChatInputProps) => (
  <div className="fixed bottom-0 left-64 right-0 z-20">
    {/* bottom fade like ChatGPT */}
    <div className="pointer-events-none absolute inset-x-0 -top-16 h-16 bg-gradient-to-t from-white to-transparent" />

    <div className="border-t border-gray-200 bg-white/80 backdrop-blur">
      <div className="mx-auto w-full max-w-3xl px-4 py-3">
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative flex items-end rounded-2xl border border-gray-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-gray-300">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e as unknown as React.FormEvent);
                }
              }}
              placeholder="Message ChatGPT…"
              className="w-full resize-none bg-transparent px-4 py-3 pr-12 text-[15px] leading-6 text-gray-900 placeholder:text-gray-400 focus:outline-none"
              rows={1}
              style={{ minHeight: "48px", maxHeight: "200px" }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = Math.min(target.scrollHeight, 200) + "px";
              }}
            />

            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={[
                "absolute bottom-2 right-2 inline-flex h-9 w-9 items-center justify-center rounded-full",
                "transition",
                !input.trim() || isLoading
                  ? "cursor-not-allowed bg-gray-100 text-gray-400"
                  : "bg-gray-900 text-white hover:bg-gray-800 active:scale-[0.98]",
                "focus:outline-none focus:ring-2 focus:ring-gray-300",
              ].join(" ")}
              aria-label="Send"
              title="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>

          {/* helper row (optional, ChatGPT vibe) */}
          <div className="mt-2 text-center text-xs text-gray-500">
            Enter to send • Shift+Enter for new line
          </div>
        </form>
      </div>
    </div>
  </div>
);
