const express = require('express')
const { getSlots, createBooking } = require('../controllers/bookingController')

const router = express.Router()

router.get('/slots', getSlots)
router.post('/book', createBooking)

module.exports = router
