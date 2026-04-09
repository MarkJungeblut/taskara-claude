import type { Dashboard } from './types';

export type EmployeeStatus = 'Active' | 'Inactive';

export interface Employee {
  id: string;
  name: string;
  department: string;
  startDate: string;
  status: EmployeeStatus;
}

export const MOCK_EMPLOYEES: Employee[] = [
  { id: '1', name: 'Alicia Fernández',  department: 'Engineering',    startDate: '2019-06-10T00:00:00', status: 'Active'   },
  { id: '2', name: 'Marcus Webb',       department: 'Design',         startDate: '2020-11-03T00:00:00', status: 'Active'   },
  { id: '3', name: 'Priya Chandrasek',  department: 'Product',        startDate: '2021-01-18T00:00:00', status: 'Inactive' },
  { id: '4', name: 'Jordan Osei',       department: 'Engineering',    startDate: '2018-08-22T00:00:00', status: 'Inactive' },
  { id: '5', name: 'Tatiana Morozova',  department: 'Marketing',      startDate: '2022-03-07T00:00:00', status: 'Inactive' },
  { id: '6', name: 'Kwame Asante',      department: 'Engineering',    startDate: '2017-05-30T00:00:00', status: 'Active'   },
  { id: '7', name: 'Sofia Lindqvist',   department: 'Data Analytics', startDate: '2023-09-14T00:00:00', status: 'Active'   },
  { id: '8', name: 'Dmitri Volkov',     department: 'Infrastructure', startDate: '2020-02-28T00:00:00', status: 'Inactive' },
];

export const MOCK_DASHBOARDS: Dashboard[] = [
  {
    id: 'marketing-performance',
    title: 'Marketing Performance',
    subtitle: 'Updated 2 hours ago',
    preview: 'grid-4',
  },
  {
    id: 'user-retention-q3',
    title: 'User Retention Q3',
    subtitle: 'Edited by Sarah M.',
    preview: 'grid-6',
  },
  {
    id: 'cloud-infrastructure',
    title: 'Cloud Infrastructure',
    subtitle: 'Real-time monitoring',
    preview: 'quad',
  },
  {
    id: 'financial-audit-2024',
    title: 'Financial Audit 2024',
    subtitle: 'Verified status',
    preview: 'header-body',
  },
];
