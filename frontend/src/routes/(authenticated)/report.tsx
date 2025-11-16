import AttendanceSummaryTable from '@/components/AttendanceSummaryTable'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/(authenticated)/report')({
  component: report,
})

function report() {
  const navigate = useNavigate()

  const handleReportLink = () => {
    navigate({ to: '/report' })
  }

  const handleAttendanceLink = () => {
    navigate({ to: '/check_attendance' })
  }
  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center bg-[#D3DAD9] px-2">
        <div className="w-2/3 h-12 mb-6">
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
        <p className="text-5xl mt-12">Summary</p>
        <AttendanceSummaryTable summaries={[]} className={'mt-5'} />
      </div>
    </>
  )
}
