import { useState } from 'react';
import { Map, Clock, Plus, Trash2 } from 'lucide-react';

export default function ItineraryBuilder() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ day: 1, time: '', title: '', location: '' });

  const addItem = (e) => {
    e.preventDefault();
    if (!form.title) return;
    setItems((prev) => [...prev, { id: crypto.randomUUID(), ...form }]);
    setForm({ day: form.day, time: '', title: '', location: '' });
  };

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const grouped = items.reduce((acc, cur) => {
    acc[cur.day] = acc[cur.day] ? [...acc[cur.day], cur] : [cur];
    return acc;
  }, {});

  return (
    <section className="rounded-2xl border border-gray-200/40 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Itinerary</h2>
      </div>

      <form onSubmit={addItem} className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <label className="flex items-center gap-2 rounded-lg border border-gray-200/60 px-3 py-2 dark:border-white/10">
          <span className="text-sm text-gray-500 dark:text-white/70">Day</span>
          <input
            type="number"
            min={1}
            value={form.day}
            onChange={(e) => setForm({ ...form, day: Math.max(1, parseInt(e.target.value || '1')) })}
            className="ml-auto w-16 bg-transparent text-right outline-none"
          />
        </label>
        <label className="flex items-center gap-2 rounded-lg border border-gray-200/60 px-3 py-2 dark:border-white/10">
          <Clock className="h-4 w-4 text-gray-500 dark:text-white/70" />
          <input
            placeholder="09:00"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            className="w-full bg-transparent outline-none"
          />
        </label>
        <label className="col-span-2 flex items-center gap-2 rounded-lg border border-gray-200/60 px-3 py-2 dark:border-white/10">
          <input
            placeholder="Activity title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full bg-transparent outline-none"
          />
        </label>
        <label className="flex items-center gap-2 rounded-lg border border-gray-200/60 px-3 py-2 dark:border-white/10">
          <Map className="h-4 w-4 text-gray-500 dark:text-white/70" />
          <input
            placeholder="Location (optional)"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="w-full bg-transparent outline-none"
          />
        </label>
        <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-600/90">
          <Plus className="h-4 w-4" /> Add
        </button>
      </form>

      {Object.keys(grouped).length === 0 ? (
        <p className="text-sm text-gray-600 dark:text-white/60">No activities yet. Add your first plan above.</p>
      ) : (
        <div className="space-y-6">
          {Object.keys(grouped)
            .sort((a, b) => Number(a) - Number(b))
            .map((day) => (
              <div key={day}>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-white/60">Day {day}</h3>
                <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200/60 dark:divide-white/10 dark:border-white/10">
                  {grouped[day].map((i) => (
                    <li key={i.id} className="flex items-center gap-4 p-3">
                      <div className="w-20 text-sm text-gray-500 dark:text-white/60">{i.time || '—'}</div>
                      <div className="flex-1">
                        <div className="font-medium">{i.title}</div>
                        {i.location && (
                          <div className="text-sm text-gray-500 dark:text-white/60">{i.location}</div>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(i.id)}
                        className="rounded-md p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
                        aria-label="Remove"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      )}
    </section>
  );
}
