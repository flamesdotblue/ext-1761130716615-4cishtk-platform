import { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import Chat from './components/Chat';
import SettingsModal from './components/SettingsModal';

function App() {
  const [chats, setChats] = useState(() => [
    { id: 'c1', title: 'New chat', messages: [] }
  ]);
  const [currentChatId, setCurrentChatId] = useState('c1');
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    provider: 'ollama',
    baseUrl: 'http://localhost:11434',
    apiKey: '',
    model: 'llama3.1'
  });

  const currentChat = useMemo(
    () => chats.find(c => c.id === currentChatId) || chats[0],
    [chats, currentChatId]
  );

  const updateChat = (chatId, updater) => {
    setChats(prev => prev.map(c => (c.id === chatId ? updater(c) : c)));
  };

  const addUserMessage = (content) => {
    updateChat(currentChatId, (c) => ({
      ...c,
      messages: [...c.messages, { role: 'user', content }],
    }));
  };

  const addAssistantMessage = (content) => {
    updateChat(currentChatId, (c) => ({
      ...c,
      messages: [...c.messages, { role: 'assistant', content }],
    }));
  };

  const newChat = () => {
    const id = 'c' + Math.random().toString(36).slice(2, 9);
    const chat = { id, title: 'New chat', messages: [] };
    setChats(prev => [chat, ...prev]);
    setCurrentChatId(id);
  };

  const renameChatFromFirstUserMsg = (content) => {
    const title = content.length > 40 ? content.slice(0, 37) + '...' : content;
    updateChat(currentChatId, (c) => ({ ...c, title }));
  };

  const sendMessage = async (input) => {
    if (!input.trim()) return;
    addUserMessage(input);
    if (currentChat.messages.length === 0) renameChatFromFirstUserMsg(input);

    setLoading(true);
    try {
      const messagesForApi = [...currentChat.messages, { role: 'user', content: input }].map(m => ({ role: m.role, content: m.content }));

      if (settings.provider === 'ollama') {
        const resp = await fetch(`${settings.baseUrl.replace(/\/$/, '')}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ model: settings.model, messages: messagesForApi, stream: false })
        });
        if (!resp.ok) throw new Error(`Ollama error ${resp.status}`);
        const data = await resp.json();
        // Ollama returns {message: {role, content}, ...}
        const content = data?.message?.content || data?.content || '';
        addAssistantMessage(content || '');
      } else {
        const resp = await fetch(`${settings.baseUrl.replace(/\/$/, '')}/v1/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(settings.apiKey ? { 'Authorization': `Bearer ${settings.apiKey}` } : {})
          },
          body: JSON.stringify({ model: settings.model, messages: messagesForApi })
        });
        if (!resp.ok) throw new Error(`OpenAI-compatible error ${resp.status}`);
        const data = await resp.json();
        const content = data?.choices?.[0]?.message?.content || '';
        addAssistantMessage(content);
      }
    } catch (e) {
      addAssistantMessage(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-neutral-950 text-neutral-100 flex">
      <Sidebar
        chats={chats}
        currentChatId={currentChatId}
        onSelectChat={setCurrentChatId}
        onNewChat={newChat}
      />
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="relative h-[52vh] sm:h-[56vh] md:h-[60vh]">
          <Hero />
          <div className="absolute top-4 right-4 z-20">
            <SettingsModal
              current={settings}
              onSave={setSettings}
            />
          </div>
        </div>
        <div className="flex-1 min-h-0">
          <Chat
            messages={currentChat?.messages || []}
            onSend={sendMessage}
            loading={loading}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
