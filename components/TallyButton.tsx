'use client'

import { openTallyGeneral } from '@/lib/tally'

interface TallyButtonProps {
  sourcePage: string
  label: string
  className?: string
}

export default function TallyButton({
  sourcePage,
  label,
  className = '',
}: TallyButtonProps) {
  return (
    <button
      onClick={() => openTallyGeneral(sourcePage)}
      className={`cursor-pointer ${className}`}
    >
      {label}
    </button>
  )
}
