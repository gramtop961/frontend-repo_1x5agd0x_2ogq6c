import { useState } from 'react';
import { CheckCircle2, Plus, Trash2 } from 'lucide-react';

export default function PackingList() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');

  const add = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setItems((prev) => [...prev, { id: crypto.randomUUID(), text: text.trim(), packed: false }]);
    setText('');
  };

  const toggle = (id) => setItems((prev) => prev.map((i) => (i.id === id ? { ...i, packed: !i.packed } : i)));
  const remove = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const packedCount = items.filter((i) => i.packed).length;

  return (
    <section className="rounded-2xl border border-gray-200/40 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Packing list</h2>
        <div className="text-sm text-gray-600 dark:text-white/60">
          {packedCount}/{items.length} packed
        </div>
      </div>

      <form onSubmit={add} className="mb-4 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add an item (e.g., Passport)"
          className="flex-1 rounded-lg border border-gray-200/60 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-transparent"
        />
        <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-2 font-medium text-white hover:bg-violet-600/90">
          <Plus className="h-4 w-4" /> Add
        </button>
      </form>

      <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200/60 dark:divide-white/10 dark:border-white/10">
        {items.length === 0 && (
          <li className="p-4 text-sm text-gray-600 dark:text-white/60">No items yet. Add what you need to bring.</li>
        )}
        {items.map((i) => (
          <li key={i.id} className="flex items-center justify-between p-3">
            <button
              onClick={() => toggle(i.id)}
              className={`group inline-flex items-center gap-3 ${i.packed ? 'text-gray-500 line-through opacity-70' : ''}`}
            >
              <CheckCircle2 className={`h-5 w-5 ${i.packed ? 'text-emerald-500' : 'text-gray-400 group-hover:text-emerald-500'}`} />
              <span className="font-medium">{i.text}</span>
            </button>
            <button
              onClick={() => remove(i.id)}
              className="rounded-md p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
              aria-label="Remove"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
