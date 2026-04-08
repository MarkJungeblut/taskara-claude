export type PreviewVariant = 'grid-4' | 'grid-6' | 'quad' | 'header-body';

export interface Dashboard {
  id: string;
  title: string;
  subtitle: string;
  preview: PreviewVariant;
}

export type WidgetType = 'table' | 'line-chart' | 'pie-chart' | 'bar-chart';
export type WidgetLayoutScale = 'split' | 'full';

export interface WidgetConfig {
  type: WidgetType;
  layoutScale: WidgetLayoutScale;
}
