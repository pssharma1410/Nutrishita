const pad = (n) => String(n).padStart(2, '0')

export function toYMD(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function todayYMD() {
  return toYMD(new Date())
}
