export function NewDashboardCard() {
  return (
    <div className="group border-2 border-dashed border-outline-variant/30 rounded-xl p-6 flex flex-col items-center justify-center min-h-[320px] hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
      <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <span className="material-symbols-outlined text-primary text-3xl">add_chart</span>
      </div>
      <h3 className="font-headline text-lg font-bold text-on-surface-variant">New Dashboard</h3>
      <p className="text-sm text-on-surface-variant/60 text-center px-8 mt-2">
        Create a dashboard tailored to your workflow
      </p>
    </div>
  );
}
