import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function Layout() {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden ml-64">
        <Header />
        <div className="flex-1 overflow-y-auto p-10 bg-surface-container-low relative">
          <div className="absolute inset-0 pointer-events-none dot-grid" />
          <div className="relative z-10 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
