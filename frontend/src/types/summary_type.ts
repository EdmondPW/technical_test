export interface summaryData {
  id: string
  attendanceId: number | null
  present: number
  late: number
  earlyLeave: number
  absent: number
}
;[]

export interface summaryResult {
  ok: boolean
  data?: summaryData[] | undefined
  error?: any
}
