type Response = {
  ok: boolean
  data: AttendanceListType[]
}

export async function getAttendanceList(attendanceId: number, token: string) {
  const res = await fetch(
    `http://localhost:3002/api/v1/attendance-list/${attendanceId}/list`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  )

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Failed to fetch attendance list: ${errorText}`)
  }

  return (await res.json()) as Response
}
