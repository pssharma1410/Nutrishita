/**
 * Shared HTML fragments for Nodemailer (client + admin notifications).
 */

function emailShell({ preheader, innerHtml }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Consultation</title>
</head>
<body style="margin:0;padding:0;background:#eef4f1;font-family:'DM Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#2d3330;">
  <span style="display:none!important;visibility:hidden;mso-hide:all;font-size:1px;color:#eef4f1;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${preheader}</span>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#eef4f1;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(15,61,58,0.08);">
          ${innerHtml}
        </table>
        <p style="margin:24px 0 0;font-size:12px;color:#6a726e;">Nutrishita by Akshita · Clinical diet consultation</p>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function buttonsRow({ meetingLink, googleCalendarUrl }) {
  return `
  <table role="presentation" cellspacing="0" cellpadding="0" style="margin:28px 0 0;">
    <tr>
      <td style="padding-right:12px;">
        <a href="${meetingLink}" style="display:inline-block;background:#2c6f5e;color:#ffffff;text-decoration:none;padding:14px 22px;border-radius:10px;font-weight:600;font-size:15px;">Join Consultation</a>
      </td>
      <td>
        <a href="${googleCalendarUrl}" style="display:inline-block;background:#f4f9f7;color:#2c5c51;text-decoration:none;padding:14px 22px;border-radius:10px;font-weight:600;font-size:15px;border:1px solid #c5e0d6;">Add to Google Calendar</a>
      </td>
    </tr>
  </table>`
}

function buildClientConfirmationHtml({
  name,
  dateLabel,
  timeLabel,
  meetingLink,
  googleCalendarUrl,
}) {
  const inner = `
          <tr>
            <td style="padding:36px 32px 28px;">
              <p style="margin:0 0 8px;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#458f78;font-weight:600;">Booking confirmed</p>
              <h1 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:1.25;color:#0f2420;font-weight:600;">Your consultation is scheduled</h1>
              <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#464c49;">Hi ${escapeHtml(name)}, thank you for booking with Nutrishita by Akshita. We look forward to supporting your health goals.</p>
              <table role="presentation" width="100%" style="background:#f4f9f7;border-radius:12px;border:1px solid #e3f0eb;">
                <tr>
                  <td style="padding:20px 22px;">
                    <p style="margin:0 0 6px;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#6a726e;">Date</p>
                    <p style="margin:0 0 16px;font-size:18px;font-weight:600;color:#213e38;">${escapeHtml(dateLabel)}</p>
                    <p style="margin:0 0 6px;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#6a726e;">Time</p>
                    <p style="margin:0;font-size:18px;font-weight:600;color:#213e38;">${escapeHtml(timeLabel)}</p>
                  </td>
                </tr>
              </table>
              <p style="margin:20px 0 0;font-size:14px;color:#6a726e;line-height:1.55;">An <strong>.ics</strong> calendar file is attached — open it on any device to add the appointment to your calendar.</p>
              ${buttonsRow({ meetingLink, googleCalendarUrl })}
            </td>
          </tr>`
  return emailShell({
    preheader: `Confirmed: ${dateLabel} at ${timeLabel}`,
    innerHtml: inner,
  })
}

function buildAdminNotificationHtml({ name, email, phone, dateLabel, timeLabel, meetingLink }) {
  const inner = `
          <tr>
            <td style="padding:36px 32px 28px;">
              <p style="margin:0 0 8px;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#458f78;font-weight:600;">New booking</p>
              <h1 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:24px;color:#0f2420;">Consultation request</h1>
              <table role="presentation" width="100%" style="font-size:15px;line-height:1.7;color:#464c49;">
                <tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
                <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
                <tr><td><strong>Phone</strong></td><td>${escapeHtml(phone)}</td></tr>
                <tr><td><strong>Date</strong></td><td>${escapeHtml(dateLabel)}</td></tr>
                <tr><td><strong>Time</strong></td><td>${escapeHtml(timeLabel)}</td></tr>
                <tr><td><strong>Link</strong></td><td><a href="${meetingLink}" style="color:#2c6f5e;">${escapeHtml(meetingLink)}</a></td></tr>
              </table>
            </td>
          </tr>`
  return emailShell({
    preheader: `New booking from ${name}`,
    innerHtml: inner,
  })
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

module.exports = {
  buildClientConfirmationHtml,
  buildAdminNotificationHtml,
  emailShell,
}
