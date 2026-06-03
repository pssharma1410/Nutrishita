const crypto = require('crypto')
const { google } = require('googleapis')
const { parseLocalDateTime } = require('./calendarHelpers')
const { SLOT_MINUTES } = require('./slotHelpers')

function getOauthClient() {
  const {
    GOOGLE_CALENDAR_CLIENT_ID,
    GOOGLE_CALENDAR_CLIENT_SECRET,
    GOOGLE_CALENDAR_REFRESH_TOKEN,
  } = process.env

  if (!GOOGLE_CALENDAR_CLIENT_ID || !GOOGLE_CALENDAR_CLIENT_SECRET || !GOOGLE_CALENDAR_REFRESH_TOKEN) {
    return null
  }

  const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CALENDAR_CLIENT_ID,
    GOOGLE_CALENDAR_CLIENT_SECRET
  )
  oauth2Client.setCredentials({ refresh_token: GOOGLE_CALENDAR_REFRESH_TOKEN })
  return oauth2Client
}

function isGoogleCalendarConfigured() {
  return Boolean(getOauthClient())
}

async function createMeetLinkForBooking({ name, email, date, time }) {
  const auth = getOauthClient()
  if (!auth) return null

  const calendar = google.calendar({ version: 'v3', auth })
  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary'
  const timezone = process.env.GOOGLE_CALENDAR_TIMEZONE || 'Asia/Kolkata'

  const startDate = parseLocalDateTime(date, time)
  const endDate = new Date(startDate.getTime() + SLOT_MINUTES * 60 * 1000)

  const event = await calendar.events.insert({
    calendarId,
    conferenceDataVersion: 1,
    requestBody: {
      summary: `Nutrition consultation — ${name}`,
      description: `Booked via Nutrishita website\nClient: ${name}\nEmail: ${email}`,
      start: { dateTime: startDate.toISOString(), timeZone: timezone },
      end: { dateTime: endDate.toISOString(), timeZone: timezone },
      attendees: [{ email }],
      conferenceData: {
        createRequest: {
          requestId: crypto.randomUUID(),
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
    },
  })

  const meetLink =
    event.data.hangoutLink ||
    event.data.conferenceData?.entryPoints?.find((entry) => entry.entryPointType === 'video')?.uri ||
    null

  return meetLink
}

module.exports = { createMeetLinkForBooking, isGoogleCalendarConfigured }
