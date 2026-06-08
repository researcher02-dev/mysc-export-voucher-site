'use client'

import { openTallyGeneral } from '@/lib/tally'

interface GuideCtaProps {
  label?: string
  source: string
  className?: string
}

export default function GuideCta({
  label = '상담 문의하기',
  source,
  className = '',
}: GuideCtaProps) {
  return (
    <button
      onClick={() => openTallyGeneral(source)}
      className={`cursor-pointer inline-flex items-center justify-center h-[52px] px-10 rounded-full bg-[#33c3ff] text-white text-[16px] font-bold tracking-[-0.4px] hover:bg-[#1ab0ed] transition-colors ${className}`}
    >
      {label}
    </button>
  )
}
