export default function SkeletonSlot() {
  return <div className="h-10 animate-pulse rounded-full bg-white/10" />
}

export function SkeletonSlotGrid({ count = 6 }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3" role="status" aria-live="polite">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonSlot key={i} />
      ))}
    </div>
  )
}
