export type PreviewVariant = 'grid-4' | 'grid-6' | 'quad' | 'header-body';

export interface Dashboard {
  id: string;
  title: string;
  subtitle: string;
  preview: PreviewVariant;
}
