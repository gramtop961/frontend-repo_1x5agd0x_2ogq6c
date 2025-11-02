import TripPlannerHero from './components/TripPlannerHero.jsx';
import ItineraryBuilder from './components/ItineraryBuilder.jsx';
import BudgetPlanner from './components/BudgetPlanner.jsx';
import PackingList from './components/PackingList.jsx';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 text-slate-900 dark:from-zinc-950 dark:via-zinc-950 dark:to-slate-950 dark:text-white">
      <header className="sticky top-0 z-10 border-b border-black/5 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-zinc-950/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow">
              ✈️
            </span>
            <span className="text-lg font-semibold">WanderPlan</span>
          </div>
          <nav className="hidden gap-6 text-sm sm:flex">
            <a href="#itinerary" className="text-slate-600 hover:text-slate-900 dark:text-white/70 dark:hover:text-white">Itinerary</a>
            <a href="#budget" className="text-slate-600 hover:text-slate-900 dark:text-white/70 dark:hover:text-white">Budget</a>
            <a href="#packing" className="text-slate-600 hover:text-slate-900 dark:text-white/70 dark:hover:text-white">Packing</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:space-y-10 sm:py-12">
        <TripPlannerHero />

        <section id="itinerary" className="grid gap-6 lg:grid-cols-2">
          <ItineraryBuilder />
          <BudgetPlanner />
        </section>

        <section id="packing">
          <PackingList />
        </section>
      </main>

      <footer className="border-t border-black/5 py-8 text-center text-sm text-slate-500 dark:border-white/10 dark:text-white/50">
        Built with ❤️ for travelers. Plan smart, wander far.
      </footer>
    </div>
  );
}

export default App;
