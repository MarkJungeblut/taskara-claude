import { NavLink } from 'react-router-dom';

interface NavItem {
  to: string;
  icon: string;
  label: string;
  end?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { to: '/', icon: 'dashboard', label: 'Overview', end: true },
  { to: '/data-sources', icon: 'database', label: 'Data Sources' },
  { to: '/archive', icon: 'archive', label: 'Archive' },
];

const BOTTOM_ITEMS: NavItem[] = [
  { to: '/settings', icon: 'settings', label: 'Settings' },
  { to: '/info', icon: 'info', label: 'Info' },
];

function SidebarLink({ to, icon, label, end }: NavItem) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        [
          'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
          isActive
            ? 'bg-white shadow-sm text-primary'
            : 'text-slate-500 hover:bg-slate-200 hover:translate-x-1',
        ].join(' ')
      }
    >
      <span className="material-symbols-outlined">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-slate-100 p-4 gap-2 border-r border-slate-200">
      <div className="mb-8 px-2">
        <h1 className="text-xl font-bold text-slate-900">Taskara</h1>
        <p className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">
          Dashboard Builder
        </p>
      </div>
      <nav className="flex flex-col gap-1 flex-1">
        {NAV_ITEMS.map((item) => (
          <SidebarLink key={item.to} {...item} />
        ))}
      </nav>
      <div className="mt-auto flex flex-col gap-1 pt-4 border-t border-slate-200">
        {BOTTOM_ITEMS.map((item) => (
          <SidebarLink key={item.to} {...item} />
        ))}
      </div>
    </aside>
  );
}
