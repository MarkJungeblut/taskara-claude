export function GhostWidgetIllustration() {
  return (
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
  );
}
