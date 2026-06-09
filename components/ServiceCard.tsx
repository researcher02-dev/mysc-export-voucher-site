import type { Service } from '@/types/service'
import TagChip from './TagChip'
import KeywordTag from './KeywordTag'
import { trackEvent } from '@/lib/ga'

interface ServiceCardProps {
  service: Service
  onOpenDrawer: () => void
}

export default function ServiceCard({ service, onOpenDrawer }: ServiceCardProps) {
  const hasUrl = Boolean(service.application_url)

  return (
    <article className="bg-white rounded-2xl p-7 flex flex-col gap-4 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]">
      {/* Service name */}
      <h3 className="text-[18px] font-black text-[#0b1b35] leading-[1.625] tracking-[-0.45px]">
        {service.service_name}
      </h3>

      {/* Country tags */}
      {service.countries.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {service.countries.map((c) => (
            <TagChip key={c} label={c} variant="country" />
          ))}
        </div>
      )}

      {/* Support type tags */}
      {service.support_types.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {service.support_types.map((t) => (
            <TagChip key={t} label={t} variant="support" />
          ))}
        </div>
      )}

      {/* Summary */}
      {service.summary && (
        <p className="text-[14px] font-medium text-[#314158] leading-[1.625] flex-1">
          {service.summary}
        </p>
      )}

      {/* Keyword tags */}
      {service.keyword_tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {service.keyword_tags.map((tag) => (
            <KeywordTag key={tag} tag={tag} />
          ))}
        </div>
      )}

      {/* CTAs */}
      <div className="flex flex-col gap-2 mt-auto pt-1">
        {/* Primary: 신청 페이지 바로가기 */}
        {hasUrl ? (
          <a
            href={service.application_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('apply_click', { service_name: service.service_name })}
            className="w-full h-[52px] flex items-center justify-center rounded-full bg-[#33c3ff] text-white text-[16px] font-bold text-center cursor-pointer hover:bg-[#1ab0ed] transition-colors"
          >
            신청 페이지 바로가기
          </a>
        ) : (
          <span
            aria-disabled="true"
            className="w-full h-[52px] flex items-center justify-center rounded-full bg-[#e8eef5] text-[#99a1af] text-[16px] font-bold text-center cursor-not-allowed select-none"
          >
            신청 페이지 준비 중
          </span>
        )}

        {/* Secondary: 자세히 보기 */}
        <button
          onClick={() => { onOpenDrawer(); trackEvent('detail_view', { service_name: service.service_name }) }}
          className="w-full h-[52px] flex items-center justify-center rounded-full bg-[rgba(51,195,255,0.1)] text-[#33c3ff] text-[16px] font-bold text-center cursor-pointer hover:bg-[rgba(51,195,255,0.18)] transition-colors"
        >
          자세히 보기
        </button>
      </div>
    </article>
  )
}
