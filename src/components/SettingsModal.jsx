import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { Settings, X } from 'lucide-react';

function SettingsModal({ current, onSave }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(current);

  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const save = () => {
    onSave(form);
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="inline-flex items-center gap-2 rounded-md bg-neutral-800 hover:bg-neutral-700 transition px-3 py-2 text-sm">
          <Settings className="w-4 h-4" /> Settings
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-lg rounded-lg border border-neutral-800 bg-neutral-900 p-4 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <Dialog.Title className="text-base font-medium">Connection Settings</Dialog.Title>
            <Dialog.Close asChild>
              <button className="p-1 rounded hover:bg-neutral-800"><X className="w-4 h-4" /></button>
            </Dialog.Close>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs mb-1 text-neutral-400">Provider</label>
              <select
                className="w-full rounded-md bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm"
                value={form.provider}
                onChange={e => update('provider', e.target.value)}
              >
                <option value="ollama">Ollama (local)</option>
                <option value="openai">OpenAI-compatible</option>
              </select>
            </div>

            <div>
              <label className="block text-xs mb-1 text-neutral-400">Base URL</label>
              <input
                className="w-full rounded-md bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm"
                value={form.baseUrl}
                onChange={e => update('baseUrl', e.target.value)}
                placeholder={form.provider === 'ollama' ? 'http://localhost:11434' : 'http://localhost:1234'}
              />
            </div>

            <div>
              <label className="block text-xs mb-1 text-neutral-400">Model</label>
              <input
                className="w-full rounded-md bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm"
                value={form.model}
                onChange={e => update('model', e.target.value)}
                placeholder={form.provider === 'ollama' ? 'llama3.1' : 'gpt-4o-mini'}
              />
            </div>

            <div>
              <label className="block text-xs mb-1 text-neutral-400">API Key (if required)</label>
              <input
                className="w-full rounded-md bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm"
                value={form.apiKey}
                onChange={e => update('apiKey', e.target.value)}
                placeholder="sk-... or leave blank for local"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <Dialog.Close asChild>
              <button className="px-3 py-2 text-sm rounded-md border border-neutral-700 hover:bg-neutral-800">Cancel</button>
            </Dialog.Close>
            <button onClick={save} className="px-3 py-2 text-sm rounded-md bg-blue-600 hover:bg-blue-500">Save</button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default SettingsModal;
