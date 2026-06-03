require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('node:path')
const bookingRoutes = require('./routes/bookingRoutes')
const futuresRoutes = require('./futures/index')

const app = express()
const PORT = Number(process.env.PORT) || 5000
const CLIENT_DIST = path.join(__dirname, '../client/dist')

const configuredOrigins = process.env.CLIENT_ORIGINS || process.env.CLIENT_ORIGIN
const clientOrigins = configuredOrigins
  ? configuredOrigins
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean)
  : []

const corsOrigins = clientOrigins.length
  ? [...clientOrigins, /^http:\/\/localhost:\d+$/]
  : ['http://localhost:5173', /^http:\/\/localhost:\d+$/]

app.use(
  cors({
    origin: corsOrigins,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)
app.use(express.json({ limit: '32kb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'nutrishita-api', mongo: mongoose.connection.readyState === 1 })
})

app.use('/api', bookingRoutes)
app.use('/api/future', futuresRoutes)

app.use('/api', (_req, res) => {
  res.status(404).json({ ok: false, message: 'Endpoint not found.' })
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(CLIENT_DIST))

  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) return next()
    res.sendFile(path.join(CLIENT_DIST, 'index.html'), (err) => {
      if (err) next(err)
    })
  })
}

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ ok: false, message: 'Unexpected server error.' })
})

async function start() {
  const uri = process.env.MONGO_URI
  if (!uri) {
    console.error('Missing MONGO_URI in environment.')
    process.exit(1)
  }
  await mongoose.connect(uri)
  console.log('MongoDB connected')

  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`)
  })
}

start().catch((e) => {
  console.error('Server failed to start', e)
  process.exit(1)
})
