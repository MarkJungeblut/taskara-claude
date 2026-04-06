import { Link } from 'react-router-dom';
import type { Dashboard, PreviewVariant } from '../types';

function PreviewThumbnail({ variant }: { variant: PreviewVariant }) {
  return (
    <div className="aspect-video bg-surface-container-low rounded-lg mb-6 overflow-hidden relative border border-outline-variant/5">
      <div className="absolute inset-4 opacity-60">
        {variant === 'grid-4' && (
          <div className="grid grid-cols-4 grid-rows-3 gap-2 h-full">
            <div className="col-span-2 row-span-2 bg-primary/20 rounded-md" />
            <div className="col-span-2 bg-secondary/20 rounded-md" />
            <div className="col-span-1 bg-tertiary/20 rounded-md" />
            <div className="col-span-1 bg-slate-300 rounded-md" />
            <div className="col-span-4 bg-slate-200 rounded-md" />
          </div>
        )}
        {variant === 'grid-6' && (
          <div className="grid grid-cols-6 grid-rows-2 gap-2 h-full">
            <div className="col-span-3 bg-secondary/20 rounded-md" />
            <div className="col-span-3 bg-tertiary/20 rounded-md" />
            <div className="col-span-6 bg-primary/10 rounded-md" />
          </div>
        )}
        {variant === 'quad' && (
          <div className="grid grid-cols-2 grid-rows-2 gap-3 h-full">
            <div className="bg-primary/20 rounded-md" />
            <div className="bg-secondary/20 rounded-md" />
            <div className="bg-tertiary/20 rounded-md" />
            <div className="bg-slate-300 rounded-md" />
          </div>
        )}
        {variant === 'header-body' && (
          <div className="flex flex-col gap-2 h-full">
            <div className="h-8 bg-primary/20 rounded-md" />
            <div className="flex-1 bg-slate-200 rounded-md" />
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-xs font-semibold text-primary">Preview Layout</span>
      </div>
    </div>
  );
}

export function DashboardCard({ id, title, subtitle, preview }: Dashboard) {
  return (
    <Link to={`/dashboard/${id}`} className="block group">
      <div className="bg-surface-container-lowest rounded-xl p-6 transition-all duration-300 hover:bg-white border border-transparent hover:border-outline-variant/10 cursor-pointer">
        <PreviewThumbnail variant={preview} />
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-headline text-lg font-bold text-on-surface">{title}</h3>
            <p className="text-sm text-on-surface-variant mt-1">{subtitle}</p>
          </div>
          <button
            className="p-1 rounded-full text-slate-300 hover:text-on-surface-variant hover:bg-surface-container transition-colors"
            onClick={(e) => e.stopPropagation()}
            aria-label="More options"
          >
            <span className="material-symbols-outlined text-[20px]">more_vert</span>
          </button>
        </div>
      </div>
    </Link>
  );
}
