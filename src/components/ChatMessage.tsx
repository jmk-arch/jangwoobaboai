import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import rehypeHighlight from 'rehype-highlight'
import type { Message } from '../utils/ai'

interface ChatMessageProps {
  message: Message
  isStreaming?: boolean
}

export const ChatMessage = ({ message, isStreaming = false }: ChatMessageProps) => {
  const isAssistant = message.role === 'assistant'

  return (
    <div className="w-full py-4 px-4"> {/* 메시지 간격 */}
      <div className="flex w-full max-w-4xl mx-auto gap-4">
        {/* 아바타 */}
        {isAssistant ? (
          <div className="flex-shrink-0 w-8 h-8 rounded-md bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-semibold text-sm">
            AI
          </div>
        ) : (
          <div className="flex-shrink-0 w-8 h-8 rounded-md bg-gray-600 flex items-center justify-center text-white font-semibold text-sm">
            U
          </div>
        )}

        {/* 메시지 버블 */}
        <div
          className={`flex-1 min-w-0 max-w-full ${
            isAssistant ? 'pr-24' : 'pl-24 flex justify-end'
          }`}
        >
          <div
            className={`inline-block px-5 py-4 rounded-3xl text-base leading-relaxed ${
              isAssistant
                ? 'bg-[#444654] text-white rounded-tl-none'
                : 'bg-[#10a37f] text-white rounded-tr-none'
            } ${isStreaming ? 'streaming-cursor' : ''}`}
          >
            <ReactMarkdown
              className="prose dark:prose-invert max-w-none prose-pre:bg-transparent prose-pre:p-0"
              rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* 빈 공간 (반대쪽 아바타 자리) */}
        {!isAssistant && <div className="w-8 flex-shrink-0" />}
      </div>
    </div>
  )
}
