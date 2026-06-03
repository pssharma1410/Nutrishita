const nodemailer = require('nodemailer')
const crypto = require('crypto')
const { parseLocalDateTime, generateCalendarLinks, generateICS } = require('./calendarHelpers')
const { SLOT_MINUTES } = require('./slotHelpers')
const { buildClientConfirmationHtml, buildAdminNotificationHtml } = require('./emailTemplates')

let transporter

function getTransporter() {
  if (transporter) return transporter
  const { EMAIL_USER, EMAIL_PASS } = process.env
  if (!EMAIL_USER || !EMAIL_PASS) {
    console.warn('[email] EMAIL_USER / EMAIL_PASS not set — emails will not send.')
    return null
  }
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  })
  return transporter
}

function formatDisplayDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  const dt = new Date(y, m - 1, d)
  return dt.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function formatDisplayTime(timeStr) {
  const [h, mi] = timeStr.split(':').map(Number)
  const d = new Date(2000, 0, 1, h, mi)
  return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
}

/**
 * Send client confirmation + admin alert with ICS attachment on client email.
 */
async function sendBookingEmails(bookingDoc) {
  const tp = getTransporter()
  const from = process.env.EMAIL_USER
  const adminTo = process.env.ADMIN_EMAIL || process.env.EMAIL_USER

  const { name, email, phone, date, time, meetingLink } = bookingDoc
  const start = parseLocalDateTime(date, time)
  const end = new Date(start.getTime() + SLOT_MINUTES * 60 * 1000)

  const title = 'Nutrition consultation — Nutrishita by Akshita'
  const description = 'Personalized nutrition consultation with Nutrishita by Akshita.'

  const { googleCalendarUrl } = generateCalendarLinks({
    title,
    description,
    start,
    end,
    meetingLink,
  })

  const uid = `${crypto.randomUUID()}@nutrishita.local`
  const icsContent = generateICS({
    uid,
    title,
    description,
    start,
    end,
    meetingLink,
    organizerName: process.env.BRAND_NAME || 'Nutrishita by Akshita',
    organizerEmail: from,
  })

  const dateLabel = formatDisplayDate(date)
  const timeLabel = `${formatDisplayTime(time)} (${SLOT_MINUTES} min)`

  if (!tp || !from) {
    console.warn('[email] Skipping send — transporter not configured.')
    return
  }

  const clientHtml = buildClientConfirmationHtml({
    name,
    dateLabel,
    timeLabel,
    meetingLink,
    googleCalendarUrl,
  })

  const adminHtml = buildAdminNotificationHtml({
    name,
    email,
    phone,
    dateLabel,
    timeLabel,
    meetingLink,
  })

  const icsFilename = `consultation-${date}-${time.replace(':', '')}.ics`

  await tp.sendMail({
    from: `"${process.env.BRAND_NAME || 'Nutrishita by Akshita'}" <${from}>`,
    to: email,
    subject: `Confirmed: consultation on ${dateLabel}`,
    html: clientHtml,
    attachments: [
      {
        filename: icsFilename,
        content: icsContent,
        contentType: 'text/calendar; charset=utf-8; method=PUBLISH',
      },
    ],
  })

  await tp.sendMail({
    from: `"${process.env.BRAND_NAME || 'Nutrishita by Akshita'} (system)" <${from}>`,
    to: adminTo,
    subject: `[New booking] ${name} — ${date} ${time}`,
    html: adminHtml,
  })
}

module.exports = {
  getTransporter,
  sendBookingEmails,
  formatDisplayDate,
  formatDisplayTime,
}
