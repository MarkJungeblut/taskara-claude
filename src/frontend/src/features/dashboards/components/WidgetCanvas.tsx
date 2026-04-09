import type { WidgetInstance } from '../types';
import { TableWidget } from './TableWidget';

interface WidgetCanvasProps {
  widgets: WidgetInstance[];
  onEditWidget: (widget: WidgetInstance) => void;
  onDeleteWidget: (widget: WidgetInstance) => void;
}

export function WidgetCanvas({ widgets, onEditWidget, onDeleteWidget }: WidgetCanvasProps) {
  return (
    <div className="grid grid-cols-2 gap-6 p-6">
      {widgets.map((widget) => (
        <div
          key={widget.id}
          className={widget.layoutScale === 'full' ? 'col-span-2' : 'col-span-1'}
        >
          {widget.type === 'table' && (
            <TableWidget
              layoutScale={widget.layoutScale}
              title={widget.title}
              onEdit={() => onEditWidget(widget)}
              onDelete={() => onDeleteWidget(widget)}
            />
          )}
        </div>
      ))}
    </div>
  );
}
