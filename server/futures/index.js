/**
 * Future-ready API stubs (structure only).
 * Mount when implementing Stripe/Razorpay, admin dashboard, or reschedule flows.
 */
const express = require('express')
const router = express.Router()

// Payments (Stripe / Razorpay) — placeholder
router.post('/payments/intent', (_req, res) => {
  res.status(501).json({
    ok: false,
    message: 'Payment integration not enabled yet.',
    provider: process.env.PAYMENT_PROVIDER || 'stripe|razorpay',
  })
})

// Admin dashboard — placeholder
router.get('/admin/summary', (_req, res) => {
  res.status(501).json({
    ok: false,
    message: 'Admin dashboard API not enabled yet.',
  })
})

// Reschedule / cancel — basic contract only
router.patch('/bookings/:id/reschedule', (_req, res) => {
  res.status(501).json({
    ok: false,
    message: 'Reschedule flow not implemented yet.',
    suggestedBody: { date: 'YYYY-MM-DD', time: 'HH:mm' },
  })
})

router.delete('/bookings/:id', (_req, res) => {
  res.status(501).json({
    ok: false,
    message: 'Cancellation flow not implemented yet.',
  })
})

module.exports = router
