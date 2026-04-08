import { MOCK_DASHBOARDS } from '../mockData';
import { DashboardCard } from '../components/DashboardCard';
import { NewDashboardCard } from '../components/NewDashboardCard';

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
          <NewDashboardCard />
        </div>
      </div>
    </div>
  );
}
