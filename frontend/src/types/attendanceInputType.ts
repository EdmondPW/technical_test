export type AttendanceListCheckInInput = {
  attendanceId: number
  userId: string
  checkInTime: Date | null
}

export type AttendanceListCheckOutInput = {
  attendanceId: number
  userId: string
  checkOutTime: Date | null
}
