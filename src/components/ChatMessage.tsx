import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import type { Message } from "../utils/ai";

interface ChatMessageProps {
  message: Message;
  isStreaming?: boolean;
}

export const ChatMessage = ({ message, isStreaming = false }: ChatMessageProps) => {
  const isAssistant = message.role === "assistant";

  return (
    <div
      className={[
        "w-full border-b border-gray-200/70",
        isAssistant ? "bg-gray-50" : "bg-white",
      ].join(" ")}
    >
      <div className="mx-auto flex w-full max-w-3xl gap-4 px-4 py-6">
        {/* Avatar */}
        <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-xs font-semibold text-gray-700">
          {isAssistant ? "AI" : "U"}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div
            className={[
              "text-[15px] leading-7 text-gray-900",
              isStreaming ? "streaming-cursor" : "",
            ].join(" ")}
          >
            <ReactMarkdown
              rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
              className={[
                "prose max-w-none",
                "prose-p:my-3 prose-li:my-1",
                "prose-headings:mt-5 prose-headings:mb-2",
                "prose-pre:my-3 prose-pre:rounded-xl prose-pre:border prose-pre:border-gray-200",
                "prose-pre:bg-gray-900 prose-pre:p-4 prose-pre:text-gray-100",
                "prose-code:rounded-md prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5",
                "prose-code:text-[0.9em] prose-code:text-gray-900",
                "prose-blockquote:border-l-4 prose-blockquote:border-gray-200 prose-blockquote:pl-4 prose-blockquote:text-gray-600",
              ].join(" ")}
              components={{
                // 코드블럭/인라인코드 분리해서 "진짜 ChatGPT 느낌"으로
                code({ inline, className, children, ...props }) {
                  if (inline) {
                    return (
                      <code
                        className="rounded-md bg-gray-100 px-1.5 py-0.5 text-[0.9em] text-gray-900"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }
                  return (
                    <pre className="overflow-x-auto rounded-xl border border-gray-200 bg-gray-900 p-4">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  );
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};
