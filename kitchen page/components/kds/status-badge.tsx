import { Badge } from '@/components/ui/badge'

interface StatusBadgeProps {
  label: string
  variant?: 'rush' | 'default'
  className?: string
}

export function StatusBadge({ label, variant = 'default', className = '' }: StatusBadgeProps) {
  const baseStyles = 'px-3 py-1 text-sm font-bold rounded-lg'
  
  if (variant === 'rush') {
    return (
      <span className={`${baseStyles} bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md ${className}`}>
        ⚡ {label}
      </span>
    )
  }

  return (
    <Badge variant="secondary" className={`${baseStyles} bg-secondary text-foreground shadow-sm ${className}`}>
      {label}
    </Badge>
  )
}
