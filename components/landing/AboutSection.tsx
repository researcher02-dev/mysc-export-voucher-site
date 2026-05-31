import Image from 'next/image'

export default function AboutSection() {
  return (
    <section className="w-full bg-[#d6f2ff]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 xl:px-12 py-24">

        {/* Two intro panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">

          {/* Left: 수출바우처란? */}
          <div className="bg-white rounded-2xl p-12 flex flex-col gap-5 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]">
            {/* Badge tile */}
            <div className="w-fit rounded-xl px-6 h-20 flex items-center shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]">
              <Image
                src="/images/export-voucher-logo.png"
                alt="수출지원기반활용사업 로고"
                width={160}
                height={56}
                className="object-contain h-12 w-auto"
              />
            </div>
            <h2 className="text-[30px] font-black text-[#0b1b35] leading-[1.2] tracking-[-1.5px]">
              수출바우처란?
            </h2>
            <p className="text-[18px] font-medium text-[#314158] leading-[1.75] tracking-[-0.45px]">
              중소·중견기업이 자사의 수출역량에 맞는 수출지원 서비스를 자유롭게 선택할 수 있도록
              &apos;바우처&apos; 형태로 지원하는 보조금 지원사업
              (스타트업 기준 정부 지원 70%, 자부담 30%~)
            </p>
          </div>

          {/* Right: MYSC 소개 */}
          <div className="bg-white rounded-2xl p-12 flex flex-col gap-5 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]">
            {/* MYSC logo tile */}
            <div className="w-fit rounded-xl px-8 h-20 flex items-center shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]">
              <Image
                src="/images/mysc-logo-dark.png"
                alt="MYSC 엠와이소셜컴퍼니"
                width={120}
                height={46}
                className="object-contain"
              />
            </div>
            <h2 className="text-[30px] font-black text-[#0b1b35] leading-[1.2] tracking-[-1.5px]">
              수출바우처 공급기업 &apos;엠와이소셜컴퍼니&apos;
            </h2>
            <p className="text-[18px] font-medium text-[#314158] leading-[1.75] tracking-[-0.45px]">
              MYSC(엠와이소셜컴퍼니)는 스타트업의 글로벌 확장과 해외 사업화를 전문 지원하는
              액셀러레이터 겸 투자사입니다. 싱가포르·태국 지사와 베트남·인도네시아 오피스를 통해
              아시아 전역의 현지 시장 정보와 파트너십, 실증 기회를 제공하며, 프랑스·독일·영국 등
              주요 유럽 국가와 미국의 유통사·투자사와 협력 네트워크를 구축해 다지역 확장을 지원합니다.
            </p>
          </div>
        </div>

        {/* Three info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            {
              title: '지원대상',
              body: '수출을 목표하는\n국내 중소/중견 기업\n(예비수출기업 포함)',
              icon: '/images/icon-target.png',
            },
            {
              title: '지원분야',
              body: '조사일반컨설팅\n(컨설팅, 비즈매칭 포함)\n전시회/행사/해외영업지원',
              icon: '/images/icon-support.png',
            },
            {
              title: '바우처한도',
              body: '기업 기존 수출 실적 및\n심사 결과에 따라\n3천만원 ~ 1억원 이상',
              icon: '/images/icon-voucher.png',
            },
          ].map(({ title, body, icon }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-6 flex items-center gap-6 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]"
            >
              <div className="flex flex-col gap-3 flex-1">
                <h3 className="text-[20px] font-black text-[#0b1b35] tracking-[-1px] leading-7">
                  {title}
                </h3>
                <p className="text-[18px] font-bold text-[#314158] tracking-[-0.45px] leading-[1.5] whitespace-pre-line">
                  {body}
                </p>
              </div>
              <div
                className="shrink-0 size-24 relative"
                style={{ filter: 'drop-shadow(0px 3px 1.5px rgba(0,0,0,0.12))' }}
              >
                <Image src={icon} alt={title} fill className="object-contain" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
