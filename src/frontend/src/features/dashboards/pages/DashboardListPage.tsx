import { MOCK_DASHBOARDS } from '../mockData';
import { DashboardCard } from '../components/DashboardCard';

function NewTemplateCard() {
  return (
    <div className="group border-2 border-dashed border-outline-variant/30 rounded-xl p-6 flex flex-col items-center justify-center min-h-[320px] hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
      <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <span className="material-symbols-outlined text-primary text-3xl">add_chart</span>
      </div>
      <h3 className="font-headline text-lg font-bold text-on-surface-variant">New Template</h3>
      <p className="text-sm text-on-surface-variant/60 text-center px-8 mt-2">
        Start with a pre-configured analytical layout
      </p>
    </div>
  );
}

export default function DashboardListPage() {
  return (
    <div className="flex-1 overflow-y-auto p-10 bg-surface-container-low relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#9eaec7 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.1,
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight">
            Your Dashboards
          </h2>
          <button className="px-6 py-3 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-xl font-label text-sm font-semibold shadow-lg shadow-primary/20 flex items-center gap-2 hover:-translate-y-0.5 transition-all active:scale-95">
            <span className="material-symbols-outlined text-lg">add</span>
            Create New Dashboard
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {MOCK_DASHBOARDS.map((dashboard) => (
            <DashboardCard key={dashboard.id} {...dashboard} />
          ))}
          <NewTemplateCard />
        </div>
      </div>
    </div>
  );
}
