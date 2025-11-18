import { getAttendanceList } from '@/api/handle_get_attendance_list'
import { handleGetTodaysAttendance } from '@/api/handle_get_attendance_today'
import { handleGetSummary } from '@/api/handle_summary'
import SummaryDetaiTable from '@/components/summary_detail_table'
import { useAuthStore } from '@/state/auth.state'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useMemo } from 'react'

export const Route = createFileRoute('/(authenticated)/report_detail/$id')({
  component: reportDetail,
})

function reportDetail() {
  const { id } = Route.useParams()
  const token = useAuthStore((s) => s.token) || ''
  const navigate = useNavigate({ from: Route.fullPath })

  const summaries = useQuery({
    queryKey: ['summary'],
    queryFn: () => handleGetSummary(token),
  })

  const todayAttendanceQuery = useQuery({
    queryKey: ['todayAttendance'],
    queryFn: () => handleGetTodaysAttendance(token),
    staleTime: 60 * 1000,
  })

  const todayAttendanceItem = useMemo(() => {
    return todayAttendanceQuery.data?.data?.[0] ?? null
  }, [todayAttendanceQuery.data])

  const attendanceListQuery = useQuery({
    queryKey: ['attendanceList', id],
    queryFn: () => {
      if (id) {
        return getAttendanceList(parseInt(id), token)
      }
    },
    enabled: Boolean(id),
  })

  const thisAttendanceSummary =
    summaries.data?.data?.filter((s) => s.attendanceId == parseInt(id))[0] ||
    null

  const tableData: AttendanceListType[] = attendanceListQuery.data?.data || []

  const handleReportLink = () => {
    navigate({ to: '/report' })
  }

  const handleAttendanceLink = () => {
    navigate({ to: '/check_attendance' })
  }

  return (
    <>
      <div className="flex flex-col bg-[#D3DAD9] w-screen h-screen items-center">
        <div className="w-2/3 h-12 mb-16">
          <div className="w-full h-full bg-white rounded-xl flex items-center justify-between text-center gap-1 px-1 mt-12">
            <div className="w-1/2 h-3/4  rounded-xl">
              <button
                onClick={handleAttendanceLink}
                className="h-full w-full text-center"
              >
                Attendance
              </button>
            </div>
            <div className="w-1/2 h-3/4 bg-gray-400 rounded-xl">
              <button
                onClick={handleReportLink}
                className="h-full w-full text-center"
              >
                Report
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-2/3 bg-white p-2 rounded-2xl shadow my-2">
          <p>
            Attendance date:{' '}
            {todayAttendanceItem && todayAttendanceItem.attendanceDate}
          </p>
          <p>
            Check in time:{' '}
            {todayAttendanceItem && todayAttendanceItem.checkInTime}
          </p>
          <p>
            Check out time:{' '}
            {todayAttendanceItem && todayAttendanceItem.checkOutTime}
          </p>
          <p>
            Present: {thisAttendanceSummary && thisAttendanceSummary.present}
          </p>
          <p>Late: {thisAttendanceSummary && thisAttendanceSummary.late}</p>
          <p>
            Early leave:
            {thisAttendanceSummary && thisAttendanceSummary.earlyLeave}
          </p>
          <p>Absent: {thisAttendanceSummary && thisAttendanceSummary.absent}</p>
        </div>

        {!attendanceListQuery.isLoading && (
          <SummaryDetaiTable list={tableData} />
        )}
      </div>
    </>
  )
}
