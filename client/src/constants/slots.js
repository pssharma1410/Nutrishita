/**
 * Mirrors server `slotHelpers.generateDaySlots` — must stay in sync for slot grid UI.
 */
const START_HOUR = 10
const END_HOUR = 18
const SLOT_MINUTES = 30

function generateDaySlots() {
  const slots = []
  for (let h = START_HOUR; h < END_HOUR; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`)
    const endMinutes = h * 60 + 30 + SLOT_MINUTES
    if (endMinutes <= END_HOUR * 60) {
      slots.push(`${String(h).padStart(2, '0')}:30`)
    }
  }
  return slots
}

export const ALL_SLOTS = generateDaySlots()
