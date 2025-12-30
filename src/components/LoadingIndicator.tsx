export const LoadingIndicator = () => (
  <div className="w-full border-b border-gray-200/70 bg-gray-50">
    <div className="mx-auto flex w-full max-w-3xl gap-4 px-4 py-6">
      {/* Avatar */}
      <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-xs font-semibold text-gray-700">
        AI
      </div>

      {/* Thinking */}
      <div className="flex min-w-0 flex-1 items-center gap-2 text-[15px] text-gray-700">
        <span className="font-medium">Thinking</span>
        <span className="inline-flex items-center gap-1">
          <span className="dot" />
          <span className="dot dot2" />
          <span className="dot dot3" />
        </span>
      </div>
    </div>
  </div>
);
