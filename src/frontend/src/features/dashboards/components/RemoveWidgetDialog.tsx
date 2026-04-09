import { useEffect } from 'react';

interface RemoveWidgetDialogProps {
  open: boolean;
  widgetTitle: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function RemoveWidgetDialog({ open, widgetTitle, onClose, onConfirm }: RemoveWidgetDialogProps) {
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
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
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-surface-container-lowest rounded-[2rem] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 bg-white">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-3xl font-headline font-extrabold tracking-tight text-on-surface">
              Remove Widget
            </h2>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface-variant hover:text-on-surface"
              aria-label="Close dialog"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
          <p className="text-on-surface-variant font-body">
            Are you sure you want to remove <strong>{widgetTitle}</strong>? This action cannot be undone.
          </p>
        </div>

        {/* Icon */}
        <div className="px-8 py-6 flex justify-center">
          <span className="material-symbols-outlined text-error text-5xl">delete_forever</span>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-surface-container-low flex justify-end items-center gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 text-on-surface-variant font-label font-bold hover:text-on-surface transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-error text-on-error px-10 py-4 rounded-2xl font-label font-extrabold shadow-xl shadow-error/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
          >
            <span>Remove</span>
            <span className="material-symbols-outlined text-lg">delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
