/**
 * Calendar helpers for Google Calendar deep links and RFC 5545 ICS content.
 * Times are interpreted in the server's local timezone unless TZ is set in process.env.
 */

/**
 * Parse YYYY-MM-DD and HH:mm into a Date in local time.
 */
function parseLocalDateTime(dateStr, timeStr) {
  const [y, mo, d] = dateStr.split('-').map(Number)
  const [h, mi] = timeStr.split(':').map(Number)
  return new Date(y, mo - 1, d, h, mi, 0, 0)
}

/**
 * Format Date as ICS UTC: YYYYMMDDTHHmmssZ
 */
function toICSUtc(dt) {
  return dt
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '')
}

/**
 * Format floating local time for ICS (no Z suffix).
 */
function toICSLocal(dt) {
  const pad = (n) => String(n).padStart(2, '0')
  return (
    `${dt.getFullYear()}${pad(dt.getMonth() + 1)}${pad(dt.getDate())}` +
    `T${pad(dt.getHours())}${pad(dt.getMinutes())}${pad(dt.getSeconds())}`
  )
}

/**
 * Build Google Calendar "create event" URL and return structured links.
 * @param {object} opts
 * @param {string} opts.title
 * @param {string} opts.description
 * @param {Date} opts.start
 * @param {Date} opts.end
 * @param {string} [opts.meetingLink]
 */
function generateCalendarLinks({ title, description, start, end, meetingLink = '' }) {
  const formatG = (d) =>
    d
      .toISOString()
      .replace(/[-:]/g, '')
      .replace(/\.\d{3}/, '')

  const dates = `${formatG(start)}/${formatG(end)}`
  const text = encodeURIComponent(title)
  const details = encodeURIComponent(
    [description, meetingLink ? `\n\nJoin consultation:\n${meetingLink}` : '']
      .filter(Boolean)
      .join('')
  )
  const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}`

  return { googleCalendarUrl }
}

/**
 * Generate .ics file content (CRLF line endings per RFC 5545).
 * Uses UTC timestamps for broad client compatibility.
 */
function generateICS({
  uid,
  title,
  description,
  start,
  end,
  meetingLink,
  organizerName = 'Nutrishita by Akshita',
  organizerEmail,
}) {
  const stamp = toICSUtc(new Date())
  const dtStart = toICSUtc(start)
  const dtEnd = toICSUtc(end)
  const loc = meetingLink ? `Online — ${meetingLink}` : 'Online consultation'

  const escapeText = (s) =>
    String(s || '')
      .replace(/\\/g, '\\\\')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
      .replace(/\r?\n/g, '\\n')

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//NutrishitaByAkshita//Consult Booking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${escapeText(title)}`,
    `DESCRIPTION:${escapeText(`${description}${meetingLink ? `\\n\\nJoin: ${meetingLink}` : ''}`)}`,
    `LOCATION:${escapeText(loc)}`,
    organizerEmail ? `ORGANIZER;CN=${escapeText(organizerName)}:MAILTO:${organizerEmail}` : '',
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean)

  return lines.join('\r\n')
}

module.exports = {
  parseLocalDateTime,
  generateCalendarLinks,
  generateICS,
  toICSLocal,
  toICSUtc,
}
