const Booking = require('../models/Booking')
const { ALL_SLOTS, isPastDate, todayYMD } = require('../utils/slotHelpers')
const { sendBookingEmails } = require('../utils/email')
const { createMeetLinkForBooking, isGoogleCalendarConfigured } = require('../utils/googleCalendar')

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/
const TIME_REGEX = /^\d{2}:\d{2}$/

function meetingLinkForBooking() {
  return process.env.DEFAULT_MEETING_LINK || 'https://meet.example.com/nutrishita-consultation'
}

/**
 * GET /api/slots?date=YYYY-MM-DD
 */
async function getSlots(req, res) {
  try {
    const { date } = req.query
    if (!date || !DATE_REGEX.test(date)) {
      return res.status(400).json({ ok: false, message: 'Query "date" must be YYYY-MM-DD.' })
    }
    if (isPastDate(date)) {
      return res.status(400).json({ ok: false, message: 'Cannot load slots for past dates.' })
    }

    const booked = await Booking.find({ date }).select('time -_id').lean()
    const taken = new Set(booked.map((b) => b.time))
    let pool = ALL_SLOTS.filter((t) => !taken.has(t))

    /** Hide same-day slots that are already in the past (15-minute buffer). */
    if (date === todayYMD()) {
      const now = new Date()
      const nowMinutes = now.getHours() * 60 + now.getMinutes()
      pool = pool.filter((t) => {
        const [h, m] = t.split(':').map(Number)
        return h * 60 + m >= nowMinutes + 15
      })
    }

    const available = pool

    return res.json({
      ok: true,
      date,
      slotDurationMinutes: 30,
      workingHours: { start: '10:00', end: '18:00' },
      available,
      booked: Array.from(taken),
    })
  } catch (err) {
    console.error('[getSlots]', err)
    return res.status(500).json({ ok: false, message: 'Could not load availability.' })
  }
}

/**
 * POST /api/book
 * Body: { name, email, phone, date, time }
 */
async function createBooking(req, res) {
  try {
    const { name, email, phone, date, time } = req.body || {}

    if (!name || !email || !phone || !date || !time) {
      return res.status(400).json({
        ok: false,
        message: 'name, email, phone, date, and time are required.',
      })
    }
    if (!DATE_REGEX.test(date) || !TIME_REGEX.test(time)) {
      return res.status(400).json({ ok: false, message: 'Invalid date or time format.' })
    }
    if (isPastDate(date)) {
      return res.status(400).json({ ok: false, message: 'Cannot book a past date.' })
    }
    if (!ALL_SLOTS.includes(time)) {
      return res.status(400).json({ ok: false, message: 'Selected time is outside working hours.' })
    }

    if (date === todayYMD()) {
      const now = new Date()
      const nowMinutes = now.getHours() * 60 + now.getMinutes()
      const [h, m] = time.split(':').map(Number)
      if (h * 60 + m < nowMinutes + 15) {
        return res.status(400).json({ ok: false, message: 'This time slot is no longer available today.' })
      }
    }

    const existing = await Booking.findOne({ date, time }).lean()
    if (existing) {
      return res.status(409).json({
        ok: false,
        message: 'This slot was just booked. Please choose another time.',
        code: 'SLOT_TAKEN',
      })
    }

    let meetingLink = meetingLinkForBooking()
    if (isGoogleCalendarConfigured()) {
      try {
        const generatedMeetLink = await createMeetLinkForBooking({
          name: String(name).trim(),
          email: String(email).trim(),
          date,
          time,
        })
        if (generatedMeetLink) meetingLink = generatedMeetLink
      } catch (e) {
        console.error('[createMeetLinkForBooking]', e.message || e)
      }
    }
    const booking = await Booking.create({
      name: String(name).trim(),
      email: String(email).trim(),
      phone: String(phone).trim(),
      date,
      time,
      meetingLink,
    })

    // Fire-and-forget email; failures should not roll back booking in MVP
    sendBookingEmails(booking).catch((e) => console.error('[sendBookingEmails]', e))

    return res.status(201).json({
      ok: true,
      booking: {
        id: booking._id,
        name: booking.name,
        email: booking.email,
        phone: booking.phone,
        date: booking.date,
        time: booking.time,
        meetingLink: booking.meetingLink,
        createdAt: booking.createdAt,
      },
    })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        ok: false,
        message: 'This slot is no longer available.',
        code: 'DUPLICATE_BOOKING',
      })
    }
    console.error('[createBooking]', err)
    return res.status(500).json({ ok: false, message: 'Could not complete booking.' })
  }
}

module.exports = { getSlots, createBooking }
