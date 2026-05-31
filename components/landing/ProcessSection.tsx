const STEPS = [
  {
    num: 1,
    label: '신청 · 접수',
    detail: '수요기업 사업기간별 모집',
    sub: '12-1, 4-5, 6,8월',
    note: '공고 집중',
    highlight: true,
  },
  {
    num: 2,
    label: '평가 · 선정',
    detail: '수요기업 신청 건에 대한 평가 및 수요기업 선정',
    highlight: false,
  },
  {
    num: 3,
    label: '바우처 발급',
    detail: '바우처 발급 및 사용 계획서 작성',
    highlight: false,
  },
  {
    num: 4,
    label: '프로그램 신청',
    detail: '홈페이지 내 MYSC 프로그램 신청 및 양자 계약 체결',
    highlight: false,
  },
  {
    num: 5,
    label: '사업수행 · 정산',
    detail: '메뉴에 따라 결과물 제공 및 정산 진행',
    highlight: false,
  },
]

function StepCard({ step }: { step: (typeof STEPS)[number] }) {
  return (
    <div className="flex flex-col items-center gap-5">
      {/* Card */}
      <div
        className={`w-full max-w-[256px] rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[176px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] ${
          step.highlight ? 'bg-[#33c3ff]' : 'bg-white'
        }`}
      >
        {step.detail && (
          <p
            className={`text-[16px] font-bold leading-[1.875] tracking-[-0.5px] whitespace-pre-line ${
              step.highlight ? 'text-white/90' : 'text-[#314158]'
            }`}
          >
            {step.detail}
          </p>
        )}
        {step.sub && (
          <p
            className={`text-[20px] font-bold tracking-[-0.5px] leading-[1.875] ${
              step.highlight ? 'text-white' : 'text-[#314158]'
            }`}
          >
            {step.sub}
          </p>
        )}
        {step.note && (
          <p
            className={`text-[20px] font-bold tracking-[-0.5px] ${
              step.highlight ? 'text-[#0b1b35]' : 'text-[#314158]'
            }`}
          >
            {step.note}
          </p>
        )}
      </div>

      {/* Step number badge + label */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#33c3ff] flex items-center justify-center shrink-0 shadow-[0px_1px_3px_rgba(0,0,0,0.1)]">
          <span className="text-[18px] font-bold text-white leading-7">{step.num}</span>
        </div>
        <span className="text-[20px] font-black text-[#0b1b35] tracking-[-1px]">
          {step.label}
        </span>
      </div>
    </div>
  )
}

export default function ProcessSection() {
  return (
    <section className="w-full bg-[#d6f2ff]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 xl:px-12 pt-24 pb-24">

        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-[18px] font-medium text-[#45556c] tracking-[-0.45px] mb-4">
            바우처를 통해 컨설팅 및 전시회 트랙을 이용하고 싶다면?
          </p>
          <h2 className="text-[36px] sm:text-[48px] font-black text-[#0b1b35] leading-[1.25] tracking-[-2.4px]">
            먼저 <span className="text-[#33c3ff]">수출바우처</span>
            <br />
            수요기업으로 선정 되어야 합니다.
          </h2>
        </div>

        {/* Steps — row 1: steps 1–2 */}
        <div className="flex flex-wrap justify-center gap-12 mb-12">
          {STEPS.slice(0, 2).map((step) => (
            <StepCard key={step.num} step={step} />
          ))}
        </div>

        {/* Steps — row 2: steps 3–5 */}
        <div className="flex flex-wrap justify-center gap-12">
          {STEPS.slice(2).map((step) => (
            <StepCard key={step.num} step={step} />
          ))}
        </div>

      </div>
    </section>
  )
}
