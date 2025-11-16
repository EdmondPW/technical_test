export interface AttendanceResponse {
  id: number
  attendanceDate: string
  checkInTime: string
  checkOutTime: string | null
}
