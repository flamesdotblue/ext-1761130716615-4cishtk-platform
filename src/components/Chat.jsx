import { useRef, useState } from 'react';
import { Send } from 'lucide-react';

function Chat({ messages, onSend, loading }) {
  const [input, setInput] = useState('');
  const formRef = useRef(null);
  const endRef = useRef(null);

  const submit = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput('');
    await onSend(text);
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-auto px-4 py-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-neutral-400 text-sm mt-6">Start a conversation below.</div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`rounded-lg p-3 md:p-4 text-sm whitespace-pre-wrap leading-relaxed ${m.role === 'user' ? 'bg-neutral-800/80' : 'bg-neutral-900 border border-neutral-800'}`}>
              <div className="text-xs mb-1 text-neutral-400">{m.role === 'user' ? 'You' : 'Assistant'}</div>
              <div>{m.content}</div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
      </div>

      <div className="border-t border-neutral-800 p-3 sm:p-4">
        <form ref={formRef} onSubmit={submit} className="max-w-3xl mx-auto flex gap-2">
          <input
            className="flex-1 rounded-md bg-neutral-900 border border-neutral-800 px-3 py-3 text-sm focus:outline-none focus:border-neutral-600"
            placeholder={loading ? 'Waiting for response…' : 'Message your model...'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-md bg-blue-600 hover:bg-blue-500 disabled:opacity-60 px-4"
            title="Send"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
