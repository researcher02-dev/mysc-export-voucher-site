import Image from 'next/image'

export default function HeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, rgb(77,104,205) 0%, rgb(13,39,136) 26.4%, rgb(13,39,136) 61.5%, rgb(11,27,53) 100%)',
        minHeight: '904px',
      }}
    >
      {/* Background world-map image — right side, contained, decorative */}
      <img
        src="/images/hero-bg.png"
        alt=""
        aria-hidden="true"
        className="absolute top-0 right-0 h-full w-1/2 object-contain object-right opacity-30 pointer-events-none select-none"
      />

      {/* Radial cyan glow — right side */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 w-3/5 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1152 904' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3E%3Crect x='0' y='0' height='100%25' width='100%25' fill='url(%23g)' opacity='1'/%3E%3Cdefs%3E%3CradialGradient id='g' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(92.16 0 0 90.4 1152 452)'%3E%3Cstop stop-color='rgba(51,195,255,0.15)' offset='0'/%3E%3Cstop stop-color='rgba(51,195,255,0)' offset='0.6'/%3E%3C/radialGradient%3E%3C/defs%3E%3C/svg%3E\")",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-10 xl:px-12 pt-[160px] pb-[112px] flex flex-col gap-16 items-center">

        {/* Centered heading */}
        <div className="flex flex-col items-center gap-0 text-center">
          <h1 className="text-[48px] sm:text-[60px] font-black text-white leading-[1.1] tracking-[-3px]">
            스타트업 수출바우처
          </h1>
          <p className="text-[48px] sm:text-[60px] font-black text-[#33c3ff] leading-[1.1] tracking-[-3px]">
            어떻게 활용해야 할지 고민이셨나요?
          </p>
        </div>

        {/* Globe + Text row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-16 xl:gap-24 w-full">

          {/* Globe illustration */}
          <div className="shrink-0 flex flex-col items-center">
            <div className="mt-11" />
            <div
              className="relative size-[160px] sm:size-[200px]"
              style={{ filter: 'drop-shadow(0px 0px 15px rgba(51,195,255,0.3))' }}
            >
              <Image
                src="/images/hero-globe.png"
                alt=""
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Text content */}
          <div className="flex flex-col gap-4 text-center sm:text-left">
            <p
              className="text-[18px] sm:text-[20px] font-bold text-[#cad5e2] tracking-[-0.5px]"
              style={{ textShadow: '0px 4px 4px rgba(0,0,0,0.25)' }}
            >
              수출바우처 공급기업 엠와이소셜컴퍼니와 함께
            </p>

            <div
              className="text-[40px] sm:text-[48px] font-bold leading-[1.1] tracking-[-2.4px]"
              style={{ textShadow: '0px 4px 4px rgba(0,0,0,0.25)' }}
            >
              <span className="text-white">스타트업 맞춤형 </span>
              <span className="text-[#33c3ff]">해외 진출 트랙</span>
              <span className="text-white">을 시작하세요!</span>
            </div>

            <p className="text-[16px] sm:text-[18px] font-bold text-[#ffd700] tracking-[-0.45px]">
              조사/일반 컨설팅, 전시회/행사/해외영업지원 분야 공급기업
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
