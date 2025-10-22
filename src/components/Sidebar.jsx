import { Plus, Settings } from 'lucide-react';

function Sidebar({ chats, currentChatId, onSelectChat, onNewChat }) {
  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-neutral-800 bg-neutral-950/80 backdrop-blur-sm">
      <div className="p-3 border-b border-neutral-800">
        <button
          onClick={onNewChat}
          className="w-full inline-flex items-center gap-2 rounded-md bg-neutral-800 hover:bg-neutral-700 transition px-3 py-2 text-sm"
        >
          <Plus className="w-4 h-4" /> New chat
        </button>
      </div>
      <div className="flex-1 overflow-auto">
        <ul className="p-2 space-y-1">
          {chats.map(c => (
            <li key={c.id}>
              <button
                onClick={() => onSelectChat(c.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${
                  c.id === currentChatId ? 'bg-neutral-800' : 'hover:bg-neutral-900'
                }`}
              >
                {c.title || 'Chat'}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-3 border-t border-neutral-800 text-xs text-neutral-500 flex items-center gap-2">
        <Settings className="w-4 h-4" /> Configure in top-right
      </div>
    </aside>
  );
}

export default Sidebar;
