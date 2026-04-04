import { useLocation, Link } from "react-router-dom";

type NavItem = {
  label: string;
  icon: string;
  href: string;
  matchPrefix: string;
};

const primaryNav: NavItem[] = [
  { label: "Dashboards", icon: "dashboard", href: "/", matchPrefix: "/" },
  { label: "Data Sources", icon: "database", href: "/data-sources", matchPrefix: "/data-sources" },
  { label: "Archive", icon: "archive", href: "/archive", matchPrefix: "/archive" },
];

const secondaryNav: NavItem[] = [
  { label: "Settings", icon: "settings", href: "/settings", matchPrefix: "/settings" },
  { label: "Info", icon: "info", href: "/info", matchPrefix: "/info" },
];

export function Sidebar() {
  const { pathname } = useLocation();

  function isActive(item: NavItem) {
    if (item.href === "/") return pathname === "/" || pathname.startsWith("/dashboard");
    return pathname.startsWith(item.matchPrefix);
  }

  function NavLink({ item }: { item: NavItem }) {
    const active = isActive(item);
    return (
      <Link
        to={item.href}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
          active
            ? "bg-white shadow-sm text-primary font-medium"
            : "text-slate-500 hover:bg-slate-200 hover:translate-x-1"
        }`}
      >
        <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
        <span className="text-sm">{item.label}</span>
      </Link>
    );
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-100 border-r border-slate-200 flex flex-col p-4 z-40">
      <div className="mb-6">
        <p className="font-bold text-on-surface text-lg leading-tight [font-family:'Manrope',sans-serif]">Taskara</p>
        <p className="text-[11px] uppercase tracking-widest text-slate-500 mt-0.5">Dashboard Builder</p>
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        {primaryNav.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </nav>

      <div className="border-t border-slate-200 pt-3 flex flex-col gap-1">
        {secondaryNav.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </div>
    </aside>
  );
}
