export async function handleGetTodaysAttendance(token: string) {
  const resp = await fetch('http://localhost:3002/api/v1/attendance/today', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!resp.ok) {
    const err = await resp.text().catch(() => 'Unable to fetch')
    throw new Error(`Failed to get today's attendance: ${err}`)
  }

  return await resp.json()
}
