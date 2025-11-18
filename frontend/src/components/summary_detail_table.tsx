type Props = {
  list: AttendanceListType[]
}

export default function SummaryDetaiTable({ list }: Props) {
  return (
    <>
      <div className={`w-2/3 p-4 bg-white rounded-lg shadow-sm`}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y table-auto">
            <thead>
              <tr className="bg-gray-50 text-left text-sm text-gray-700">
                <th className="px-4 py-2">User ID</th>
                <th className="px-4 py-2">Check in</th>
                <th className="px-4 py-2">Check out</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y text-sm text-gray-800">
              {list.map((attendance) => {
                return (
                  <tr key={attendance.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{attendance.userId}</td>
                    <td className="px-4 py-3">
                      {(attendance.checkInTime &&
                        new Date(attendance.checkInTime).toISOString()) ??
                        '—'}
                    </td>
                    <td className="px-4 py-3">
                      {(attendance.checkOutTime &&
                        new Date(attendance.checkOutTime).toISOString()) ??
                        '-'}
                    </td>
                    <td className="px-4 py-3">{attendance.attendanceStatus}</td>
                  </tr>
                )
              })}

              {list.length === 0 && (
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
          </table>
        </div>
      </div>
    </>
  )
}
