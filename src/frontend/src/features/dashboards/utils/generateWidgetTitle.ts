import type { WidgetType } from '../types';

const ADJECTIVES = [
  'Brave', 'Calm', 'Cosmic', 'Daring', 'Eager',
  'Fierce', 'Gentle', 'Happy', 'Jolly', 'Keen',
  'Lively', 'Mighty', 'Nimble', 'Noble', 'Proud',
  'Quick', 'Radiant', 'Serene', 'Swift', 'Vivid',
];

const NOUNS_BY_TYPE: Record<WidgetType, string[]> = {
  'table':      ['Catalog', 'Directory', 'Ledger', 'Register', 'Roster'],
  'line-chart': ['Projection', 'Timeline', 'Trajectory', 'Trend', 'Waveline'],
  'pie-chart':  ['Breakdown', 'Composition', 'Distribution', 'Share', 'Slice'],
  'bar-chart':  ['Benchmark', 'Comparison', 'Ranking', 'Snapshot', 'Tally'],
};

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateWidgetTitle(type: WidgetType): string {
  return `${pick(ADJECTIVES)} ${pick(NOUNS_BY_TYPE[type])}`;
}
