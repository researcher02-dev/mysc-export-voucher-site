import Image from 'next/image'
import TallyButton from '@/components/TallyButton'

export default function LandingCtaSection() {
  return (
    <section className="w-full bg-[#0b1b35]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 xl:px-12 py-28">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-16 xl:gap-24">

          {/* Text + button */}
          <div className="flex flex-col items-start gap-0 text-left">
            <h2 className="text-[40px] sm:text-[48px] font-black text-white leading-[1.1] tracking-[-2.4px]">
              지금 바로
            </h2>
            <h2 className="text-[40px] sm:text-[48px] font-black text-[#65ceff] leading-[1.1] tracking-[-2.4px] mb-6">
              상담을 신청해보세요.
            </h2>
            <p className="text-[17px] sm:text-[18px] font-medium text-[#cad5e2] leading-[1.75] tracking-[-0.45px]">
              문의를 남겨주시면 엠와이소셜컴퍼니
            </p>
            <p className="text-[17px] sm:text-[18px] font-medium text-[#cad5e2] leading-[1.75] tracking-[-0.45px] mb-12">
              담당자가 빠른 시일 내에 연락드립니다.
            </p>

            <TallyButton
              sourcePage="landing_cta"
              label="상담신청 바로가기"
              className="px-12 py-4 rounded-full bg-[#65ceff] text-[#0b1b35] text-[18px] font-bold tracking-[-0.45px] hover:bg-[#4dbef5] transition-colors"
            />
          </div>

          {/* Icon */}
          <div
            className="shrink-0 size-[200px] sm:size-[239px] relative"
            style={{ filter: 'drop-shadow(0px 0px 15px rgba(51,195,255,0.3))' }}
          >
            <Image
              src="/images/cta-icon.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
