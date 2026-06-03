const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    phone: { type: String, required: true, trim: true, maxlength: 32 },
    /** Calendar day YYYY-MM-DD */
    date: { type: String, required: true, index: true },
    /** Slot start HH:mm (24h) */
    time: { type: String, required: true },
    meetingLink: { type: String, required: true },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } }
)

// Prevent double booking for the same date + time slot
bookingSchema.index({ date: 1, time: 1 }, { unique: true })

module.exports = mongoose.model('Booking', bookingSchema)
