import axios from 'axios'

/** Empty string uses Vite dev proxy to `/api` on same origin in development. */
const apiBase = import.meta.env.VITE_API_URL ?? ''

const client = axios.create({
  baseURL: apiBase,
  headers: { 'Content-Type': 'application/json' },
  timeout: 20000,
})

/**
 * @param {string} date YYYY-MM-DD
 */
export async function fetchSlots(date) {
  const { data } = await client.get('/api/slots', { params: { date } })
  return data
}

/**
 * @param {{ name: string; email: string; phone: string; date: string; time: string }} payload
 */
export async function submitBooking(payload) {
  const { data } = await client.post('/api/book', payload)
  return data
}
