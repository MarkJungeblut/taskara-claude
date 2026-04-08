export default function DashboardViewerPage() {
  return (
    <div
      className="flex-1 flex items-center justify-center bg-surface min-h-0"
      style={{
        backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <div className="flex flex-col items-center gap-6 max-w-lg px-8 text-center">
        {/* Ghost widget illustration */}
        <div className="relative w-64 h-48 mb-2">
          <div className="absolute inset-0 rotate-3">
            <div className="grid grid-cols-2 gap-3 h-full">
              <div className="rounded-xl border border-slate-200 bg-white opacity-60" />
              <div className="rounded-xl border border-slate-200 bg-white opacity-40" />
              <div className="col-span-2 rounded-xl border border-slate-200 bg-white opacity-50" />
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[40px]">
                dashboard_customize
              </span>
            </div>
          </div>
        </div>

        {/* Text content */}
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Your canvas is ready
        </p>
        <h1 className="font-headline text-4xl font-extrabold text-slate-900 leading-tight">
          Start building your data masterpiece.
        </h1>
        <p className="text-sm text-slate-500">
          Combine metrics, charts, and visualizations to create a dashboard that tells your unique story.
        </p>

        {/* Primary action button */}
        <button className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold uppercase tracking-wider text-sm px-8 py-3 rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add your first widget
        </button>
      </div>
    </div>
  );
}
