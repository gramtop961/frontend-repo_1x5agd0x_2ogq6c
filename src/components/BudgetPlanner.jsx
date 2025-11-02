import { useMemo, useState } from 'react';
import { DollarSign, Plus, Trash2, Users } from 'lucide-react';

export default function BudgetPlanner() {
  const [people, setPeople] = useState(2);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ label: '', cost: '' });

  const addItem = (e) => {
    e.preventDefault();
    if (!form.label || !form.cost) return;
    const cost = parseFloat(form.cost);
    if (Number.isNaN(cost)) return;
    setItems((prev) => [...prev, { id: crypto.randomUUID(), label: form.label, cost }]);
    setForm({ label: '', cost: '' });
  };

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const total = useMemo(() => items.reduce((s, i) => s + i.cost, 0), [items]);
  const perPerson = useMemo(() => (people > 0 ? total / people : total), [total, people]);

  return (
    <section className="rounded-2xl border border-gray-200/40 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Budget</h2>
      </div>

      <form onSubmit={addItem} className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <label className="col-span-2 flex items-center gap-2 rounded-lg border border-gray-200/60 px-3 py-2 dark:border-white/10">
          <input
            placeholder="Expense name"
            value={form.label}
            onChange={(e) => setForm({ ...form, label: e.target.value })}
            className="w-full bg-transparent outline-none"
          />
        </label>
        <label className="flex items-center gap-2 rounded-lg border border-gray-200/60 px-3 py-2 dark:border-white/10">
          <DollarSign className="h-4 w-4 text-gray-500 dark:text-white/70" />
          <input
            placeholder="0.00"
            inputMode="decimal"
            value={form.cost}
            onChange={(e) => setForm({ ...form, cost: e.target.value })}
            className="w-full bg-transparent outline-none"
          />
        </label>
        <label className="flex items-center gap-2 rounded-lg border border-gray-200/60 px-3 py-2 dark:border-white/10">
          <Users className="h-4 w-4 text-gray-500 dark:text-white/70" />
          <input
            type="number"
            min={1}
            value={people}
            onChange={(e) => setPeople(Math.max(1, parseInt(e.target.value || '1')))}
            className="w-full bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </label>
        <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-600/90">
          <Plus className="h-4 w-4" /> Add
        </button>
      </form>

      <div className="grid gap-4 lg:grid-cols-2">
        <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200/60 dark:divide-white/10 dark:border-white/10">
          {items.length === 0 && (
            <li className="p-4 text-sm text-gray-600 dark:text-white/60">No expenses yet. Add your first one above.</li>
          )}
          {items.map((i) => (
            <li key={i.id} className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <span className="font-medium">{i.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="tabular-nums">${i.cost.toFixed(2)}</span>
                <button
                  onClick={() => removeItem(i.id)}
                  className="rounded-md p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
                  aria-label="Remove"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="rounded-xl border border-gray-200/60 p-4 dark:border-white/10">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-white/60">Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between"><span>Total</span><span className="tabular-nums font-semibold">${total.toFixed(2)}</span></div>
            <div className="flex items-center justify-between"><span>Per person</span><span className="tabular-nums font-semibold">${perPerson.toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
