import { useState } from 'react';
import { AddWidgetDialog } from '../components/AddWidgetDialog';
import { GhostWidgetIllustration } from '../components/GhostWidgetIllustration';
import { WidgetCanvas } from '../components/WidgetCanvas';
import type { WidgetConfig, WidgetInstance } from '../types';

const DOTTED_BG = {
  backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
  backgroundSize: '24px 24px',
} as const;

export default function DashboardViewerPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [widgets, setWidgets] = useState<WidgetInstance[]>([]);

  function handleWidgetAdd(config: WidgetConfig) {
    setWidgets((prev) => [...prev, { id: crypto.randomUUID(), ...config }]);
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {widgets.length === 0 ? (
        <div
          className="flex-1 flex items-center justify-center bg-surface min-h-0"
          style={DOTTED_BG}
        >
          <div className="flex flex-col items-center gap-6 max-w-lg px-8 text-center">
            <GhostWidgetIllustration />

            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Your canvas is ready
            </p>
            <h1 className="font-headline text-4xl font-extrabold text-slate-900 leading-tight">
              Start building your data masterpiece.
            </h1>
            <p className="text-sm text-slate-500">
              Combine metrics, charts, and visualizations to create a dashboard that tells your unique story.
            </p>

            <button
              onClick={() => setDialogOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold uppercase tracking-wider text-sm px-8 py-3 rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Add your first widget
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Toolbar strip */}
          <div className="flex justify-between items-center px-6 py-3 border-b border-outline-variant/10 bg-surface-container-low/80 backdrop-blur-sm shrink-0">
            <span className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
              {widgets.length} widget{widgets.length !== 1 ? 's' : ''}
            </span>
            <button
              onClick={() => setDialogOpen(true)}
              className="flex items-center gap-1.5 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold uppercase tracking-wider text-xs px-4 py-2 rounded-lg shadow-sm hover:scale-105 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              Add Widget
            </button>
          </div>

          {/* Scrollable canvas */}
          <div className="flex-1 overflow-y-auto min-h-0" style={DOTTED_BG}>
            <WidgetCanvas widgets={widgets} />
          </div>
        </>
      )}

      <AddWidgetDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onAdd={handleWidgetAdd}
      />
    </div>
  );
}
