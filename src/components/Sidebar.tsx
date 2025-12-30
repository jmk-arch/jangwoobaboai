import { Plus, MessageSquare, Trash2, Pencil } from "lucide-react";

interface SidebarProps {
  conversations: Array<{ id: string; title: string }>;
  currentConversationId: string | null;
  handleNewChat: () => void;
  setCurrentConversationId: (id: string) => void;
  handleDeleteChat: (id: string) => void;
  editingChatId: string | null;
  setEditingChatId: (id: string | null) => void;
  editingTitle: string;
  setEditingTitle: (title: string) => void;
  handleUpdateChatTitle: (id: string, title: string) => void;
}

export const Sidebar = ({
  conversations,
  currentConversationId,
  handleNewChat,
  setCurrentConversationId,
  handleDeleteChat,
  editingChatId,
  setEditingChatId,
  editingTitle,
  setEditingTitle,
  handleUpdateChatTitle,
}: SidebarProps) => {
  const commitEdit = (id: string) => {
    const next = editingTitle.trim();
    if (next) handleUpdateChatTitle(id, next);
    setEditingChatId(null);
    setEditingTitle("");
  };

  const cancelEdit = () => {
    setEditingChatId(null);
    setEditingTitle("");
  };

  return (
    <aside className="flex h-full w-64 flex-col border-r border-gray-200 bg-gray-50">
      {/* Top */}
      <div className="p-3">
        <button
          onClick={handleNewChat}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-100 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          <Plus className="h-4 w-4" />
          New chat
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-2 pb-3">
        <div className="space-y-1">
          {conversations.map((chat) => {
            const active = chat.id === currentConversationId;
            const editing = editingChatId === chat.id;

            return (
              <div
                key={chat.id}
                role="button"
                tabIndex={0}
                onClick={() => setCurrentConversationId(chat.id)}
                className={[
                  "group flex items-center gap-2 rounded-lg px-2 py-2",
                  "cursor-pointer select-none",
                  active ? "bg-gray-200/70" : "hover:bg-gray-200/50",
                ].join(" ")}
              >
                <MessageSquare className="h-4 w-4 text-gray-500" />

                {editing ? (
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    onFocus={(e) => e.target.select()}
                    onBlur={() => commitEdit(chat.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") commitEdit(chat.id);
                      if (e.key === "Escape") cancelEdit();
                    }}
                    className="min-w-0 flex-1 rounded-md bg-white/70 px-2 py-1 text-sm text-gray-900 outline-none ring-1 ring-gray-200 focus:ring-2 focus:ring-gray-300"
                    autoFocus
                  />
                ) : (
                  <span className="min-w-0 flex-1 truncate text-sm text-gray-800">
                    {chat.title || "New chat"}
                  </span>
                )}

                {/* Actions (hover only) */}
                <div className="ml-auto hidden items-center gap-1 group-hover:flex">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingChatId(chat.id);
                      setEditingTitle(chat.title);
                    }}
                    className="rounded-md p-1 text-gray-500 hover:bg-white hover:text-gray-900"
                    aria-label="Rename"
                    title="Rename"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteChat(chat.id);
                    }}
                    className="rounded-md p-1 text-gray-500 hover:bg-white hover:text-red-600"
                    aria-label="Delete"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom subtle footer (optional) */}
      <div className="border-t border-gray-200 p-3 text-xs text-gray-500">
        {conversations.length} chats
      </div>
    </aside>
  );
};
