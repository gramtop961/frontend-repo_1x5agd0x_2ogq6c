import { useState } from 'react';
import { Plane, Calendar, Users, MapPin, Search } from 'lucide-react';

export default function TripPlannerHero() {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [travelers, setTravelers] = useState(2);

  const popular = ['Tokyo, Japan', 'Paris, France', 'New York, USA', 'Bali, Indonesia', 'Reykjavík, Iceland'];

  const handleQuickFill = (place) => setDestination(place);

  const handlePlan = (e) => {
    e.preventDefault();
    const summary = `Planning: ${destination || 'Somewhere amazing'} from ${startDate || '—'} to ${endDate || '—'} for ${travelers} traveler(s).`;
    alert(summary);
  };

  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-600 text-white shadow-xl">
      <div className="absolute inset-0 opacity-20" aria-hidden>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.25),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.2),transparent_40%),radial-gradient(circle_at_60%_80%,rgba(255,255,255,0.2),transparent_40%)]" />
      </div>

      <div className="relative p-8 sm:p-10 lg:p-12">
        <div className="flex items-start gap-3">
          <Plane className="h-8 w-8 flex-none" />
          <div>
            <h1 className="text-3xl font-semibold sm:text-4xl">Plan your next adventure</h1>
            <p className="mt-2 max-w-2xl text-white/80">Craft a day-by-day itinerary, track your budget, and build a packing list — all in one place.</p>
          </div>
        </div>

        <form onSubmit={handlePlan} className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="group flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/20 backdrop-blur">
            <MapPin className="h-5 w-5 text-white/80" />
            <input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Where to?"
              className="w-full bg-transparent text-white placeholder-white/70 outline-none"
            />
          </label>
          <label className="group flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/20 backdrop-blur">
            <Calendar className="h-5 w-5 text-white/80" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-transparent text-white placeholder-white/70 outline-none [color-scheme:dark]"
            />
          </label>
          <label className="group flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/20 backdrop-blur">
            <Calendar className="h-5 w-5 text-white/80" />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-transparent text-white placeholder-white/70 outline-none [color-scheme:dark]"
            />
          </label>
          <label className="group flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/20 backdrop-blur">
            <Users className="h-5 w-5 text-white/80" />
            <input
              type="number"
              min={1}
              value={travelers}
              onChange={(e) => setTravelers(parseInt(e.target.value || '1'))}
              className="w-full bg-transparent text-white placeholder-white/70 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </label>
          <button type="submit" className="col-span-full inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-blue-700 transition hover:bg-white/90">
            <Search className="h-5 w-5" /> Start planning
          </button>
        </form>

        <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-white/90">
          <span className="mr-1 opacity-80">Popular:</span>
          {popular.map((p) => (
            <button
              key={p}
              onClick={() => handleQuickFill(p)}
              className="rounded-full bg-white/10 px-3 py-1 transition hover:bg-white/20"
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
