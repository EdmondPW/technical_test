import type { AttendanceListCheckInInput } from '@/types/attendanceInputType'
import { postJSON } from '@/utils/postJson'

export async function checkIn(
  input: AttendanceListCheckInInput,
  token: string,
) {
  return postJSON(
    'http://localhost:3002/api/v1/attendance/checkin',
    {
      ...input,
      checkInTime: input.checkInTime ? input.checkInTime.toISOString() : null,
    },
    token,
  )
}
