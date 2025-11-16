import { checkIn } from '@/api/handleCheckIn'
import { checkOut } from '@/api/handleCheckout'
import { handleGetTodaysAttendance } from '@/api/handleGetAttendanceToday'
import { useAuthStore } from '@/state/auth.state'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/(authenticated)/check_attendance')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()

  const user = useAuthStore((s) => s.user)
  const token = useAuthStore((s) => s.token) || ''
  const logout = useAuthStore((s) => s.logout)

  const { data, isPending } = useQuery({
    queryKey: ['TodayAttendance'],
    queryFn: () => handleGetTodaysAttendance(token),
  })

  console.log(data)

  const handleLogout = () => {
    logout()
    navigate({ to: '/' })
  }

  const handleReportLink = () => {
    navigate({ to: '/report' })
  }

  const handleCheckIn = async () => {
    if (data.data) {
      const result = await checkIn(
        {
          attendanceId: data.data[0].id,
          userId: user?.id || '',
          checkInTime: new Date(),
        },
        token,
      )
      console.log(result)
    } else {
      console.log('data not available.')
    }
  }

  const handleCheckOut = async () => {
    if (data.data) {
      await checkOut(
        {
          attendanceId: data.data[0].id,
          userId: user?.id || '',
          checkOutTime: new Date(),
        },
        token,
      )
    } else {
      console.log('data not available.')
    }
  }

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center bg-[#D3DAD9]">
      <div className="w-2/3 h-12 mb-6">
        <div className="w-full h-full bg-white rounded-xl flex items-center justify-between text-center gap-1 px-1">
          <div
            className={`${user?.role == 1 ? 'w-1/2' : 'w-full'} h-3/4 bg-gray-400 rounded-xl`}
          >
            <button className="h-full w-full text-center">Attendance</button>
          </div>
          {user?.role != undefined && user?.role == 1 ? (
            <div className="w-1/2 h-3/4 bg-white rounded-xl">
              <button
                onClick={handleReportLink}
                className="h-full w-full text-center"
              >
                Report
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="w-2/3 h-1/2 rounded-3xl shadow-2xl bg-white flex justify-center items-center">
        {!isPending && (
          <>
            <div className="w-1/2 h-full pl-1 pt-1 pb-1 pr-0.5">
              <div className="w-full h-full bg-green-200 rounded-l-3xl flex flex-col justify-center items-center">
                <p>Check In for {data.data && data.data[0].attendanceDate}</p>
                <button
                  onClick={handleCheckIn}
                  className="bg-blue-300 shadow-2xl p-2 rounded-xl mt-2"
                >
                  Check in now
                </button>
              </div>
            </div>
            <div className="w-1/2 h-full pr-1 pt-1 pb-1 px-1 pl-0.5 ">
              <div className="flex flex-col justify-center items-center w-full h-full bg-red-200 rounded-r-3xl">
                <p>Check Out</p>
                <button
                  onClick={handleCheckOut}
                  className="bg-yellow-300 shadow-2xl p-2 rounded-xl mt-2"
                >
                  Check out now
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="w-2/3 h-12 mt-6">
        <div className="w-full h-full bg-white rounded-xl flex items-center justify-between text-center gap-1 px-1">
          <div className="w-full h-3/4 bg-red-400 rounded-xl">
            <button
              onClick={handleLogout}
              className="h-full w-full text-center text-white"
            >
              LOGOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
