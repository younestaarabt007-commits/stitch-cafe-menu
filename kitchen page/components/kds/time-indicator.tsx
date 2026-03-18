interface TimeIndicatorProps {
  createdAt: Date
}

export function TimeIndicator({ createdAt }: TimeIndicatorProps) {
  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (seconds < 60) return `${seconds}s ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    return `${hours}h ago`
  }

  return (
    <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
      <svg className="w-4 h-4 text-muted-foreground/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {getTimeAgo(createdAt)}
    </span>
  )
}
