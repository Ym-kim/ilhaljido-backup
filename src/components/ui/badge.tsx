import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'open' | 'soon' | 'full' | 'closed' | 'category' | 'default'
  className?: string
}

const variantStyles = {
  open: 'bg-emerald-100 text-emerald-800',
  soon: 'bg-amber-100 text-amber-800',
  full: 'bg-red-100 text-red-800',
  closed: 'bg-gray-100 text-gray-600',
  category: 'bg-brand-pale text-brand',
  default: 'bg-gray-100 text-gray-700',
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
