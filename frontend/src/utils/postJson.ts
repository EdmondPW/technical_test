export async function postJSON<T>(url: string, body: T, token: string) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
  let payload: any = null
  try {
    payload = await res.json()
  } catch (e) {
    // no JSON body
  }

  if (!res.ok) {
    const msg = payload?.message ?? payload?.error ?? `HTTP ${res.status}`
    const err: any = new Error(msg)
    err.status = res.status
    err.body = payload
    throw err
  }

  return payload
  //   if (!res.ok) {
  //     throw new Error(`Failed request: ${res.status}`)
  //   }

  //   return res.json()
}
