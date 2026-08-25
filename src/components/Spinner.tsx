type SpinnerProps = {
  className?: string
}

export default function Spinner({ className = '' }: SpinnerProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-white/40 border-t-white ${className}`}
    />
  )
}
