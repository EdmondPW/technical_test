import type { AttendanceListCheckOutInput } from '@/types/attendance_checkin_input_type'
import { postJSON } from '@/utils/postJson'

export async function checkOut(
  input: AttendanceListCheckOutInput,
  token: string,
) {
  return postJSON(
    'http://localhost:3002/api/v1/attendance/checkout',
    {
      ...input,
      checkOutTime: input.checkOutTime
        ? input.checkOutTime.toISOString()
        : null,
    },
    token,
  )
}
