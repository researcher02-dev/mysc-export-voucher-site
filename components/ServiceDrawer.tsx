'use client'

import { useEffect, useRef } from 'react'
import type { Service } from '@/types/service'
import TagChip from './TagChip'
import KeywordTag from './KeywordTag'
import { openTallyFromDrawer } from '@/lib/tally'

interface ServiceDrawerProps {
  service: Service | null
  onClose: () => void
}

/**
 * detail_composition 텍스트를 파싱해 Basic / Upgrade / Expert 섹션으로 분리.
 * ### 헤더가 없으면 단일 섹션으로 반환.
 */
function parseComposition(text: string): { title: string; content: string }[] {
  if (!text.trim()) return []

  const HEADER_RE = /^###\s+(.+)$/m
  if (!HEADER_RE.test(text)) {
    return [{ title: 'BASIC 구성', content: text.trim() }]
  }

  const lines = text.split('\n')
  const sections: { title: string; content: string }[] = []
  let current: { title: string; lines: string[] } | null = null

  for (const line of lines) {
    const match = line.match(/^###\s+(.+)$/)
    if (match) {
      if (current) {
        sections.push({ title: current.title, content: current.lines.join('\n').trim() })
      }
      current = { title: match[1].trim(), lines: [] }
    } else {
      current?.lines.push(line)
    }
  }
  if (current) {
    sections.push({ title: current.title, content: current.lines.join('\n').trim() })
  }

  return sections.filter((s) => s.content)
}

const STATIC_SECTIONS = [
  { title: '서비스 소개', field: 'detail_intro' as const },
  { title: '진행 방식', field: 'detail_process' as const },
]

export default function ServiceDrawer({ service, onClose }: ServiceDrawerProps) {
  const isOpen = Boolean(service)
  const drawerRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      closeBtnRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const drawer = drawerRef.current
    if (!drawer) return

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const focusable = drawer.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }
    document.addEventListener('keydown', handleTab)
    return () => document.removeEventListener('keydown', handleTab)
  }, [isOpen])

  if (!service) return null

  const hasUrl = Boolean(service.application_url)
  const compositionSections = parseComposition(service.detail_composition)

  return (
    <>
      {/* Dim overlay */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={service.service_name}
        className="fixed top-0 right-0 z-50 h-full w-full sm:w-[520px] bg-white flex flex-col shadow-2xl"
      >
        {/* ── Header ─────────────────────────────────────────── */}
        <div className="bg-[#0b1b35] border-b border-[#e8eef5] flex-none">
          <div className="px-8 pt-8 pb-1 flex flex-col gap-4">
            {/* Title row */}
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-[20px] font-black text-white leading-[1.375] tracking-[-0.5px]">
                {service.service_name}
              </h2>
              <button
                ref={closeBtnRef}
                onClick={onClose}
                aria-label="닫기"
                className="shrink-0 mt-0.5 w-8 h-8 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Tags row */}
            <div className="flex flex-wrap gap-1.5 pb-4">
              {service.official_category && (
                <TagChip label={service.official_category} variant="dark-category" />
              )}
              {service.countries.map((c) => (
                <TagChip key={c} label={c} variant="dark-country" />
              ))}
              {service.support_types.map((t) => (
                <TagChip key={t} label={t} variant="dark-support" />
              ))}
            </div>
          </div>
        </div>

        {/* ── Body (scrollable) ──────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-8 py-8 flex flex-col gap-6">
          {/* Summary */}
          {service.summary && (
            <p className="text-[15px] font-medium text-[#314158] leading-[1.625]">
              {service.summary}
            </p>
          )}

          {/* Keyword tags */}
          {service.keyword_tags.length > 0 && (
            <div className="flex flex-wrap gap-2 -mt-2">
              {service.keyword_tags.map((tag) => (
                <KeywordTag key={tag} tag={tag} />
              ))}
            </div>
          )}

          {/* Detail sections */}
          <div className="flex flex-col divide-y divide-[#e8eef5]">
            {STATIC_SECTIONS.map(({ title, field }) => {
              const content = service[field]
              if (!content) return null
              return (
                <div key={field} className="py-6 flex flex-col gap-3">
                  <h4 className="text-[14px] font-bold text-[#33c3ff] tracking-[1.4px] uppercase">
                    {title}
                  </h4>
                  <p className="text-[14px] font-medium text-[#314158] leading-[1.625] whitespace-pre-line">
                    {content}
                  </p>
                </div>
              )
            })}

            {/* Composition sections (Basic only or Basic/Upgrade/Expert) */}
            {compositionSections.map(({ title, content }) => (
              <div key={title} className="py-6 flex flex-col gap-3">
                <h4 className="text-[14px] font-bold text-[#33c3ff] tracking-[1.4px] uppercase">
                  {title}
                </h4>
                <p className="text-[14px] font-medium text-[#314158] leading-[1.625] whitespace-pre-line">
                  {content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer ─────────────────────────────────────────── */}
        <div className="flex-none bg-[#f8f9fb] border-t border-[#e8eef5] px-8 py-6 flex flex-col gap-3">
          {hasUrl ? (
            <a
              href={service.application_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-14 flex items-center justify-center rounded-full bg-[#33c3ff] text-white text-[16px] font-bold cursor-pointer hover:bg-[#1ab0ed] transition-colors"
            >
              신청 페이지 바로가기
            </a>
          ) : (
            <span
              aria-disabled="true"
              className="w-full h-14 flex items-center justify-center rounded-full bg-[#e8eef5] text-[#99a1af] text-[16px] font-bold cursor-not-allowed select-none"
            >
              신청 페이지 준비 중
            </span>
          )}

          <button
            onClick={() => openTallyFromDrawer(service)}
            className="w-full h-[54px] flex items-center justify-center rounded-full border border-[#0b1b35] text-[#0b1b35] text-[16px] font-medium cursor-pointer hover:bg-[#0b1b35]/5 transition-colors"
          >
            상담 문의하기
          </button>
        </div>
      </div>
    </>
  )
}
