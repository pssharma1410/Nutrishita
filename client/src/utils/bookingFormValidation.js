const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateBookingFields({ name, email, phone }) {
  const err = {}
  if (!name.trim()) err.name = 'Please enter your name'
  if (!email.trim() || !emailRe.test(email.trim())) err.email = 'Valid email required'
  if (!phone.trim() || phone.replace(/\D/g, '').length < 8) err.phone = 'Valid phone required'
  return err
}
