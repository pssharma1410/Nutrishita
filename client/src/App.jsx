import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ReadingProgress from './components/ui/ReadingProgress'
import FloatingCTA from './components/ui/FloatingCTA'
import Home from './pages/Home'
import BookingConfirmed from './pages/BookingConfirmed'

function RouteWrapper() {
  const location = useLocation()
  return (
    <div key={location.pathname} className="page-transition flex-1">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking-confirmed" element={<BookingConfirmed />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-svh flex-col bg-surface">
        <ReadingProgress />
        <Navbar />
        <RouteWrapper />
        <FloatingCTA />
        <Footer />
      </div>
    </BrowserRouter>
  )
}
