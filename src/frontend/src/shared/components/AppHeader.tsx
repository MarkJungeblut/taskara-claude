import { useState } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';

function formatDashboardName(id: string): string {
  return id
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function AppHeader() {
  const editorMatch = useMatch('/dashboard/:id/edit');
  const dashboardIdMatch = useMatch({ path: '/dashboard/:id', end: false });

  const dashboardId = dashboardIdMatch?.params.id;
  const dashboardName = dashboardId ? formatDashboardName(dashboardId) : '';

  // Store custom titles keyed by dashboard id; falls back to formatted id
  const [customTitles, setCustomTitles] = useState<Map<string, string>>(new Map());
  // Track which dashboard id is being edited (naturally resets on navigation)
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const isEditing = editingId === dashboardId && dashboardId != null;
  const displayTitle = dashboardId ? (customTitles.get(dashboardId) ?? dashboardName) : '';

  const navigate = useNavigate();

  function startEditing() {
    setEditValue(displayTitle);
    setEditingId(dashboardId ?? null);
  }

  function commitTitle() {
    const trimmed = editValue.trim();
    if (dashboardId) {
      setCustomTitles(prev => new Map(prev).set(dashboardId, trimmed || dashboardName));
    }
    setEditingId(null);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      commitTitle();
    } else if (e.key === 'Escape') {
      setEditingId(null);
    }
  }

  return (
    <header className="bg-slate-50/80 backdrop-blur-xl flex justify-between items-center w-full px-6 py-4 sticky top-0 z-30 border-b border-slate-200/60">
      <div className="flex items-center gap-4">
        {dashboardIdMatch ? (
          <>
            <Link
              to="/"
              className="flex items-center gap-2 group"
            >
              <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors text-[20px]">
                arrow_back
              </span>
              <span className="font-label text-sm uppercase tracking-widest text-slate-400 group-hover:text-primary transition-colors">
                Dashboards
              </span>
            </Link>
            <span className="text-slate-400">/</span>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <input
                  autoFocus
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="font-headline text-2xl font-bold text-slate-900 bg-transparent border-b-2 border-primary outline-none min-w-0"
                  style={{ width: `${Math.max(editValue.length, 4)}ch` }}
                />
                <button
                  onClick={commitTitle}
                  className="text-primary hover:text-primary/80 transition-colors"
                  aria-label="Confirm rename"
                >
                  <span className="material-symbols-outlined text-[18px]">check</span>
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label="Cancel rename"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="font-headline text-2xl font-bold text-slate-900">
                  {displayTitle}
                </span>
                <button
                  onClick={startEditing}
                  className="text-slate-400 hover:text-primary transition-colors"
                  aria-label="Rename dashboard"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
              </div>
            )}
          </>
        ) : (
          <span className="font-headline text-2xl font-bold text-slate-900">
            Dashboards
          </span>
        )}
      </div>

      <div className="flex items-center">
        {editorMatch && (
          <div className="flex items-center bg-surface-container-low rounded-xl p-1 gap-1">
            <button
              onClick={() => navigate(`/dashboard/${dashboardId}`)}
              className="px-6 py-2 text-sm font-bold text-on-primary bg-gradient-to-br from-primary to-primary-container rounded-lg shadow-sm hover:scale-[1.02] active:scale-95 transition-all"
            >
              Save Changes
            </button>
            <button
              onClick={() => navigate(`/dashboard/${dashboardId}`)}
              className="px-4 py-2 text-sm font-semibold text-on-surface hover:bg-surface-container-highest rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
        {dashboardIdMatch && !editorMatch && (
          <div className="p-1">
            <button
              onClick={() => navigate(`/dashboard/${dashboardId}/edit`)}
              className="px-6 py-2 text-sm font-bold text-on-primary bg-gradient-to-br from-primary to-primary-container rounded-lg shadow-sm hover:scale-[1.02] active:scale-95 transition-all"
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
