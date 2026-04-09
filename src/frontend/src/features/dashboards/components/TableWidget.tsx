import { MOCK_EMPLOYEES } from '../mockData';
import type { Employee, EmployeeStatus } from '../mockData';
import type { WidgetLayoutScale } from '../types';

const DATE_FORMAT = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

const STATUS_STYLES: Record<EmployeeStatus, string> = {
  Active:   'bg-secondary/10 text-secondary',
  Remote:   'bg-primary/10 text-primary',
  'On Leave': 'bg-tertiary/10 text-tertiary',
  Contract: 'bg-error/10 text-error',
};

function StatusBadge({ status }: { status: EmployeeStatus }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${STATUS_STYLES[status]}`}>
      {status}
    </span>
  );
}

interface TableWidgetProps {
  layoutScale: WidgetLayoutScale;
}

export function TableWidget({ layoutScale }: TableWidgetProps) {
  const isFull = layoutScale === 'full';

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/10 shadow-sm overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant/10">
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined text-primary text-[20px]">table_rows</span>
          <span className="font-headline font-bold text-on-surface text-sm">Team Directory</span>
        </div>
        <span className="text-xs text-on-surface-variant font-medium">
          {MOCK_EMPLOYEES.length} records
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant/10">
              <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Name
              </th>
              <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Department
              </th>
              {isFull && (
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Start Date
                </th>
              )}
              <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {MOCK_EMPLOYEES.map((emp: Employee, i: number) => (
              <tr
                key={emp.id}
                className={[
                  'border-b border-outline-variant/5 hover:bg-surface-container-low/60 transition-colors',
                  i % 2 === 0 ? 'bg-surface-container-lowest' : 'bg-surface/40',
                ].join(' ')}
              >
                <td className="px-5 py-3 font-medium text-on-surface whitespace-nowrap">
                  {emp.name}
                </td>
                <td className="px-5 py-3 text-on-surface-variant whitespace-nowrap">
                  {emp.department}
                </td>
                {isFull && (
                  <td className="px-5 py-3 text-on-surface-variant tabular-nums whitespace-nowrap">
                    {DATE_FORMAT.format(new Date(emp.startDate))}
                  </td>
                )}
                <td className="px-5 py-3">
                  <StatusBadge status={emp.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 bg-surface-container-low/50 border-t border-outline-variant/10">
        <span className="text-xs text-on-surface-variant">
          {isFull ? '4 columns' : '3 columns'} · Mock data
        </span>
      </div>
    </div>
  );
}
