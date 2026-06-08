import type { Service } from '@/types/service'

interface HighlightCarouselProps {
  services: Service[]
}

function GradientPlaceholder() {
  return (
    <div
      className="w-full h-full"
      style={{
        background: 'linear-gradient(135deg, #1a3a7e 0%, #0b1b35 100%)',
      }}
    />
  )
}

function HighlightCard({ service }: { service: Service }) {
  const title = service.highlight_title || service.service_name
  const summary = service.highlight_summary || service.summary
  const ctaLabel = service.highlight_cta_label || '신청하기'
  const hasUrl = Boolean(service.application_url)

  return (
    <article className="shrink-0 w-[340px] sm:w-[372px] rounded-2xl overflow-hidden shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] bg-white snap-start">

      {/* Image area with CTA overlay */}
      <div className="relative h-[224px] overflow-hidden">
        {service.highlight_image_url ? (
          <img
            src={service.highlight_image_url}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <GradientPlaceholder />
        )}

        {/* CTA button overlaid at bottom of image */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center px-6">
          {hasUrl ? (
            <a
              href={service.application_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-[#33c3ff] text-white text-[16px] font-bold hover:bg-[#1ab0ed] transition-colors"
            >
              {ctaLabel}
            </a>
          ) : (
            <span
              aria-disabled="true"
              className="px-8 py-3.5 rounded-full bg-[#e8eef5] text-[#0b1b35] text-[16px] font-bold cursor-not-allowed select-none"
            >
              오픈 예정
            </span>
          )}
        </div>
      </div>

      {/* Text area */}
      <div className="p-7 flex flex-col gap-1">
        <h3 className="text-[20px] font-black text-[#0b1b35] leading-[1.4] tracking-[-0.6px]">
          {title}
        </h3>
        {service.highlight_subtitle && (
          <p className="text-[14px] font-bold text-[#99a1af] leading-[1.5]">
            {service.highlight_subtitle}
          </p>
        )}
        {summary && (
          <p className="text-[16px] font-medium text-[#314158] leading-[1.75] mt-2">
            {summary}
          </p>
        )}
        {service.highlight_period && (
          <p className="text-[18px] font-bold text-[#33c3ff] mt-2">
            {service.highlight_period}
          </p>
        )}
      </div>
    </article>
  )
}

export default function HighlightCarousel({ services }: HighlightCarouselProps) {
  if (services.length === 0) return null

  return (
    <section
      className="w-full overflow-hidden"
      style={{
        backgroundImage:
          'linear-gradient(104deg, rgb(63,89,183) 6%, rgb(9,27,96) 82%, rgb(6,19,66) 119%)',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 xl:px-12 pt-28 pb-8">

        {/* Section heading */}
        <div className="text-center mb-16">
          <h2 className="text-[36px] sm:text-[48px] font-extrabold text-white leading-[1.1] tracking-[-2.4px]">
            수출바우처 선정기업의 해외 진출,
          </h2>
          <h2 className="text-[36px] sm:text-[48px] font-extrabold text-[#33c3ff] leading-[1.1] tracking-[-2.4px]">
            엠와이소셜컴퍼니가 함께 실행합니다.
          </h2>
          <p className="text-[16px] sm:text-[18px] font-medium text-[#cad5e2] mt-4">
            운영 중인 지원 서비스는 서비스 찾기 페이지에서 확인해보세요.
          </p>
        </div>

        {/* Scrollable card row */}
        <div className="pb-12">
          <div
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {services.map((service) => (
              <HighlightCard
                key={service.service_id || service.service_name}
                service={service}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
