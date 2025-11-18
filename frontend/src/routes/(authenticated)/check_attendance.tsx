import { checkIn } from '@/api/handle_checkIn'
import { checkOut } from '@/api/handle_checkout'
import { getAttendanceList } from '@/api/handle_get_attendance_list'
import { handleGetTodaysAttendance } from '@/api/handle_get_attendance_today'
import { useAuthStore } from '@/state/auth.state'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useMemo } from 'react'

export const Route = createFileRoute('/(authenticated)/check_attendance')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate({ from: Route.fullPath })
  const user = useAuthStore((s) => s.user)
  const token = useAuthStore((s) => s.token) ?? ''
  const logout = useAuthStore((s) => s.logout)
  const queryClient = useQueryClient()

  const todayAttendanceQuery = useQuery({
    queryKey: ['todayAttendance'],
    queryFn: () => handleGetTodaysAttendance(token),
    staleTime: 60 * 1000,
  })

  const todayAttendanceItem = useMemo(() => {
    return todayAttendanceQuery.data?.data?.[0] ?? null
  }, [todayAttendanceQuery.data])

  const todayAttendanceId = todayAttendanceItem?.id

  // Fetch attendance list only when we have the ID
  const attendanceListQuery = useQuery({
    queryKey: ['attendanceList', todayAttendanceId],
    queryFn: () => {
      if (todayAttendanceId) {
        // This shouldn't run when ID is not available because of `enabled`
        return getAttendanceList(todayAttendanceId, token)
      }
    },
    enabled: Boolean(todayAttendanceId), // only run when true
  })

  const todayUserAttendance = useMemo(() => {
    const list = attendanceListQuery.data?.data ?? []
    return list.find((r) => r.userId === user?.id) ?? null
  }, [attendanceListQuery.data, user?.id])

  const checkInMutation = useMutation({
    mutationFn: (payload: Parameters<typeof checkIn>[0]) =>
      checkIn(payload, token),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['attendanceList'],
        refetchType: 'all',
      })
      await queryClient.invalidateQueries({
        queryKey: ['todayAttendance'],
        refetchType: 'all',
      })
    },
  })

  const checkOutMutation = useMutation({
    mutationFn: (payload: Parameters<typeof checkOut>[0]) =>
      checkOut(payload, token),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['attendanceList'],
        refetchType: 'all',
      })
      await queryClient.invalidateQueries({
        queryKey: ['todayAttendance'],
        refetchType: 'all',
      })
    },
  })

  const handleLogout = () => {
    logout()
    navigate({ to: '/' })
  }

  const handleReportLink = () => {
    navigate({ to: '/report' })
  }

  const handleCheckIn = () => {
    if (!todayAttendanceItem || !user?.id) return
    checkInMutation.mutate({
      attendanceId: todayAttendanceItem.id,
      userId: user.id,
      checkInTime: new Date(),
    })
  }

  const handleCheckOut = () => {
    if (!todayAttendanceItem || !user?.id) return
    checkOutMutation.mutate({
      attendanceId: todayAttendanceItem.id,
      userId: user.id,
      checkOutTime: new Date(),
    })
  }

  const loading =
    todayAttendanceQuery.isLoading ||
    (attendanceListQuery.isLoading && Boolean(todayAttendanceId))
  const error = todayAttendanceQuery.isError || attendanceListQuery.isError

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center bg-[#D3DAD9]">
      <div className="w-2/3 h-12 mb-6">
        <div className="w-full h-full bg-white rounded-xl flex items-center justify-between gap-1 px-1">
          <div
            className={`${user?.role === 1 ? 'w-1/2' : 'w-full'} h-3/4 bg-gray-400 rounded-xl`}
          >
            <button className="h-full w-full">Attendance</button>
          </div>
          {user?.role === 1 && (
            <div className="w-1/2 h-3/4 bg-white rounded-xl">
              <button onClick={handleReportLink} className="h-full w-full">
                Report
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="w-2/3 h-1/2 rounded-3xl p-2 shadow-2xl bg-white flex items-center justify-center">
        {loading ? (
          <div>Loading …</div>
        ) : error ? (
          <div className="text-red-600">Error loading attendance</div>
        ) : !todayAttendanceItem ? (
          <div>No attendance defined for today</div>
        ) : (
          <div className="flex w-full h-full gap-1">
            <div className="w-1/2 p-4 bg-green-200 rounded-l-3xl flex flex-col items-center justify-center">
              <p>Check In for {todayAttendanceItem.attendanceDate}</p>
              {todayUserAttendance?.checkInTime == null ? (
                <button
                  onClick={handleCheckIn}
                  disabled={checkInMutation.isPending}
                  className="mt-2 px-4 py-2 rounded bg-blue-300 disabled:opacity-50"
                >
                  {checkInMutation.isPending ? 'Checking in…' : 'Check in now'}
                </button>
              ) : (
                <p>
                  Checked in at{' '}
                  {new Date(
                    todayUserAttendance.checkInTime,
                  ).toLocaleTimeString()}
                </p>
              )}
            </div>

            {/* Check Out section */}
            <div className="w-1/2 p-4 bg-red-200 rounded-r-3xl flex flex-col items-center justify-center">
              <p>Check Out</p>
              {todayUserAttendance?.checkOutTime == null ? (
                <button
                  onClick={handleCheckOut}
                  disabled={
                    checkOutMutation.isPending ||
                    todayUserAttendance?.checkInTime == null
                  }
                  className="mt-2 px-4 py-2 rounded bg-yellow-300 disabled:opacity-50"
                >
                  {checkOutMutation.isPending
                    ? 'Checking out…'
                    : 'Check out now'}
                </button>
              ) : (
                <p>
                  Checked out at{' '}
                  {new Date(
                    todayUserAttendance.checkOutTime,
                  ).toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="w-2/3 h-12 mt-6">
        <button
          onClick={handleLogout}
          className="w-full h-full bg-red-400 text-white rounded-xl"
        >
          LOGOUT
        </button>
      </div>
    </div>
  )
}
