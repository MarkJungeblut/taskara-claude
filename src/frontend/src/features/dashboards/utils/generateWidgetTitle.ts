import type { WidgetType } from '../types';

const ADJECTIVES = [
  'Brave', 'Calm', 'Cosmic', 'Daring', 'Eager',
  'Fierce', 'Gentle', 'Happy', 'Jolly', 'Keen',
  'Lively', 'Mighty', 'Nimble', 'Noble', 'Proud',
  'Quick', 'Radiant', 'Serene', 'Swift', 'Vivid',
];

const TYPE_LABEL: Record<WidgetType, string> = {
  'table':      'Table',
  'line-chart': 'Line Chart',
  'pie-chart':  'Pie Chart',
  'bar-chart':  'Bar Chart',
};

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateWidgetTitle(type: WidgetType): string {
  return `${pick(ADJECTIVES)} ${TYPE_LABEL[type]}`;
}
