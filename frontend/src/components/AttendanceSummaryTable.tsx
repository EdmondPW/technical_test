import type { Summary } from '@/types/summary'

type Props = {
  summaries: Summary[]
  className?: string
}

export default function AttendanceSummaryTable({
  summaries,
  className = '',
}: Props) {
  return (
    <div className={`w-full p-4 bg-white rounded-lg shadow-sm ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y table-auto">
          <thead>
            <tr className="bg-gray-50 text-left text-sm text-gray-700">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Attendance ID</th>
              <th className="px-4 py-2">Present</th>
              <th className="px-4 py-2">Late</th>
              <th className="px-4 py-2">Early Leave</th>
              <th className="px-4 py-2">Absent</th>
              <th className="px-4 py-2">Detail</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y text-sm text-gray-800">
            {summaries.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{s.id}</td>
                <td className="px-4 py-3">{s.attendanceId ?? '—'}</td>
                <td className="px-4 py-3">{s.present}</td>
                <td className="px-4 py-3">{s.late}</td>
                <td className="px-4 py-3">{s.earlyLeave}</td>
                <td className="px-4 py-3">{s.absent}</td>
                <td className="px-4 py-3">{'Detail>>'}</td>
              </tr>
            ))}

            {summaries.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-sm text-gray-500"
                >
                  No data
                </td>
              </tr>
            )}
          </tbody>

          <tfoot className="bg-gray-50 text-sm text-gray-700">
            <tr>
              <td className="px-4 py-2 font-medium">Totals</td>
              <td className="px-4 py-2" />
              <td className="px-4 py-2 font-medium">
                {summaries.reduce((a, b) => a + b.present, 0)}
              </td>
              <td className="px-4 py-2 font-medium">
                {summaries.reduce((a, b) => a + b.late, 0)}
              </td>
              <td className="px-4 py-2 font-medium">
                {summaries.reduce((a, b) => a + b.earlyLeave, 0)}
              </td>
              <td className="px-4 py-2 font-medium">
                {summaries.reduce((a, b) => a + b.absent, 0)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
