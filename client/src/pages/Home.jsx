import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Hero from '../components/sections/Hero'
import TrustBar from '../components/sections/TrustBar'
import About from '../components/sections/About'
import Services from '../components/sections/Services'
import Social from '../components/sections/Social'
import Booking from '../components/sections/Booking'
import { scrollToSection } from '../utils/scroll'

export default function Home() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.state?.scrollToBooking) {
      scrollToSection('booking')
      navigate('.', { replace: true, state: null })
    }
  }, [location.state, navigate])

  useEffect(() => {
    const id = location.hash?.replace('#', '')
    if (id) {
      requestAnimationFrame(() => scrollToSection(id))
    }
  }, [location.hash])

  return (
    <main>
      <Hero />
      <TrustBar />
      <About />
      <Services />
      <Social />
      <Booking />
    </main>
  )
}
