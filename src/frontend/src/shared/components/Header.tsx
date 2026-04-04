import { useLocation } from "react-router-dom";

type SectionConfig = {
  label: string;
  matchPrefix: string;
};

const sections: SectionConfig[] = [
  { label: "Data Sources", matchPrefix: "/data-sources" },
  { label: "Archive", matchPrefix: "/archive" },
  { label: "Settings", matchPrefix: "/settings" },
  { label: "Info", matchPrefix: "/info" },
  { label: "Dashboards", matchPrefix: "/" },
];

function getSectionLabel(pathname: string): string {
  return sections.find((s) => pathname.startsWith(s.matchPrefix))?.label ?? "Dashboards";
}

export function Header() {
  const { pathname } = useLocation();
  const section = getSectionLabel(pathname);

  return (
    <header className="sticky top-0 z-50 h-16 flex justify-between items-center px-6 bg-slate-50/80 backdrop-blur-xl border-b border-slate-200">
      <div className="flex items-center gap-8">
        <span className="text-2xl font-bold tracking-tight text-slate-900 [font-family:'Manrope',sans-serif]">Taskara</span>
        <nav className="flex items-center gap-6">
          <span className="text-primary font-semibold text-sm pb-1 border-b-2 border-primary">
            {section}
          </span>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
          <input
            type="text"
            placeholder="Search dashboards..."
            className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-64"
          />
        </div>
        <button className="p-2 rounded-full text-slate-500 hover:bg-slate-200/50 transition-colors active:scale-95 duration-200">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="p-2 rounded-full text-slate-500 hover:bg-slate-200/50 transition-colors active:scale-95 duration-200">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </div>
    </header>
  );
}
