/**
 * Default consultation window and slot length (minutes).
 */
const START_HOUR = 10
const END_HOUR = 18 // exclusive end — last slot starts 17:30 for 30m duration
const SLOT_MINUTES = 30

/**
 * Build all slot start labels "HH:mm" for a given calendar day.
 */
function generateDaySlots() {
  const slots = []
  for (let h = START_HOUR; h < END_HOUR; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`)
    // second slot in hour unless last block would end after END_HOUR
    const second = `${String(h).padStart(2, '0')}:30`
    const endMinutes = h * 60 + 30 + SLOT_MINUTES
    if (endMinutes <= END_HOUR * 60) slots.push(second)
  }
  return slots
}

const ALL_SLOTS = generateDaySlots()

/**
 * YYYY-MM-DD for today in local server time.
 */
function todayYMD() {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

/**
 * True if dateStr is strictly before today (local).
 */
function isPastDate(dateStr) {
  return dateStr < todayYMD()
}

module.exports = {
  ALL_SLOTS,
  SLOT_MINUTES,
  START_HOUR,
  END_HOUR,
  isPastDate,
  todayYMD,
}
