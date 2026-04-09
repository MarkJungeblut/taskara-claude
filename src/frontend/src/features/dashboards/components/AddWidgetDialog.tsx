import { useEffect, useState } from 'react';
import type { WidgetConfig, WidgetInstance, WidgetLayoutScale, WidgetType } from '../types';
import { generateWidgetTitle } from '../utils/generateWidgetTitle';

interface AddWidgetDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (config: WidgetConfig) => void;
  editWidget?: WidgetInstance;
}

const WIDGET_TYPES: { type: WidgetType; label: string; icon: string; iconColor: string }[] = [
  { type: 'table', label: 'Table', icon: 'table_rows', iconColor: 'text-primary' },
  { type: 'line-chart', label: 'Line Chart', icon: 'show_chart', iconColor: 'text-secondary' },
  { type: 'pie-chart', label: 'Pie Chart', icon: 'pie_chart', iconColor: 'text-tertiary' },
  { type: 'bar-chart', label: 'Bar Chart', icon: 'bar_chart', iconColor: 'text-on-secondary-container' },
];

export function AddWidgetDialog({ open, onClose, onAdd, editWidget }: AddWidgetDialogProps) {
  const isEditMode = editWidget !== undefined;

  const initialType = editWidget?.type ?? 'table';
  const [title, setTitle] = useState(editWidget?.title ?? '');
  const [titlePlaceholder, setTitlePlaceholder] = useState(() => generateWidgetTitle(initialType));
  const [selectedType, setSelectedType] = useState<WidgetType>(initialType);
  const [selectedScale, setSelectedScale] = useState<WidgetLayoutScale>(editWidget?.layoutScale ?? 'split');

  function handleTypeChange(type: WidgetType) {
    setSelectedType(type);
    if (!title.trim()) {
      setTitlePlaceholder(generateWidgetTitle(type));
    }
  }

  function handleClose() {
    onClose();
  }

  function handleAdd() {
    onAdd({
      type: selectedType,
      layoutScale: selectedScale,
      title: title.trim() || titlePlaceholder,
    });
    handleClose();
  }

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') handleClose();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-on-background/60 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-surface-container-lowest rounded-[2rem] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 bg-white">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-3xl font-headline font-extrabold tracking-tight text-on-surface">
              Configure Widget
            </h2>
            <button
              onClick={handleClose}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface-variant hover:text-on-surface"
              aria-label="Close dialog"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
          <p className="text-on-surface-variant font-body">
            {isEditMode
              ? 'Adjust the name and layout of your widget.'
              : 'Craft a custom data perspective for your dashboard in three simple steps.'}
          </p>
        </div>

        {/* Steps */}
        <div className="p-8 bg-surface-container-lowest overflow-y-auto max-h-[70vh]">
          {/* Step 1: Widget Name */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs shadow-md shadow-primary/20">
                1
              </span>
              <h3 className="text-xl font-headline font-bold text-on-surface">Widget Name</h3>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={titlePlaceholder}
              className="w-full px-4 py-3 rounded-2xl border-2 border-outline-variant/30 bg-surface-container-low text-on-surface font-body placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary transition-colors"
            />
            <p className="mt-2 text-xs text-on-surface-variant/60 font-body">
              Leave blank to use the suggested name
            </p>
          </section>

          {/* Step 2: Widget Type */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs shadow-md shadow-primary/20">
                2
              </span>
              <h3 className="text-xl font-headline font-bold text-on-surface">Widget Type</h3>
            </div>
            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 ${isEditMode ? 'pointer-events-none opacity-60' : ''}`}>
              {WIDGET_TYPES.map(({ type, label, icon, iconColor }) => (
                <label key={type} className="relative cursor-pointer group">
                  <input
                    type="radio"
                    name="widget_type"
                    value={type}
                    checked={selectedType === type}
                    onChange={() => handleTypeChange(type)}
                    className="peer sr-only"
                    disabled={isEditMode}
                  />
                  <div className="p-4 rounded-2xl border-2 border-transparent bg-surface-container-low transition-all peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-surface-container-high flex flex-col items-center">
                    <div className="w-full aspect-square bg-white rounded-xl mb-3 flex items-center justify-center shadow-sm border border-outline-variant/10 group-hover:scale-105 transition-transform">
                      <span className={`material-symbols-outlined ${iconColor} text-3xl`}>
                        {icon}
                      </span>
                    </div>
                    <span className="font-bold font-headline text-xs uppercase tracking-wider text-on-surface-variant peer-checked:text-primary">
                      {label}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* Step 3: Layout Scale */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs shadow-md shadow-primary/20">
                3
              </span>
              <h3 className="text-xl font-headline font-bold text-on-surface">Layout Scale</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Split Canvas */}
              <label className="relative cursor-pointer group">
                <input
                  type="radio"
                  name="layout_width"
                  value="split"
                  checked={selectedScale === 'split'}
                  onChange={() => setSelectedScale('split')}
                  className="peer sr-only"
                />
                <div className="p-6 rounded-[1.5rem] border-2 border-transparent bg-surface-container-low transition-all peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-surface-container-high">
                  <div className="flex gap-2 mb-6 h-12">
                    <div className="flex-1 bg-primary/40 rounded-lg shadow-inner" />
                    <div className="flex-1 border-2 border-dashed border-outline-variant/40 rounded-lg" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-extrabold font-headline text-lg text-on-surface">
                      Split Canvas
                    </span>
                    <span className="text-sm text-on-surface-variant font-medium">
                      Occupies 50% of the row width
                    </span>
                  </div>
                </div>
              </label>

              {/* Full Canvas */}
              <label className="relative cursor-pointer group">
                <input
                  type="radio"
                  name="layout_width"
                  value="full"
                  checked={selectedScale === 'full'}
                  onChange={() => setSelectedScale('full')}
                  className="peer sr-only"
                />
                <div className="p-6 rounded-[1.5rem] border-2 border-transparent bg-surface-container-low transition-all peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-surface-container-high">
                  <div className="mb-6 h-12">
                    <div className="w-full h-full bg-primary/40 rounded-lg shadow-inner" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-extrabold font-headline text-lg text-on-surface">
                      Full Canvas
                    </span>
                    <span className="text-sm text-on-surface-variant font-medium">
                      Occupies 100% of the row width
                    </span>
                  </div>
                </div>
              </label>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-surface-container-low flex justify-end items-center gap-4">
          <button
            onClick={handleClose}
            className="px-6 py-3 text-on-surface-variant font-label font-bold hover:text-on-surface transition-colors"
          >
            Discard
          </button>
          <button
            onClick={handleAdd}
            className="bg-primary text-on-primary px-10 py-4 rounded-2xl font-label font-extrabold shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
          >
            <span>{isEditMode ? 'Save Changes' : 'Add to Canvas'}</span>
            <span className="material-symbols-outlined text-lg">
              {isEditMode ? 'check' : 'auto_awesome'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
