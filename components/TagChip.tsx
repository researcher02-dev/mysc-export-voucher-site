interface TagChipProps {
  label: string
  /** 'country' = grey pill (light bg), 'support' = cyan pill (light bg),
   *  'dark-country' = white/10 pill (on navy header), 'dark-support' = cyan/20 pill (on navy header) */
  variant?: 'country' | 'support' | 'dark-country' | 'dark-support'
  className?: string
}

export default function TagChip({
  label,
  variant = 'country',
  className = '',
}: TagChipProps) {
  const base =
    'inline-flex items-center h-6 px-3 rounded-full text-xs whitespace-nowrap shrink-0'

  const styles: Record<string, string> = {
    country: 'bg-[#e8eef5] text-[#314158] font-bold',
    support: 'bg-[#33c3ff] text-white font-medium',
    'dark-country': 'bg-white/10 text-[#cad5e2] font-bold',
    'dark-support': 'bg-[rgba(51,195,255,0.2)] text-[#33c3ff] font-medium',
  }

  return (
    <span className={`${base} ${styles[variant]} ${className}`}>{label}</span>
  )
}
