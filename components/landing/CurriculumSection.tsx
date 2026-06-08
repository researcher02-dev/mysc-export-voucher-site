import Link from 'next/link'

const CURRICULUM_TABS = [
  { label: '전체', href: '/services' },
  { label: '미국', href: '/services?country=%EB%AF%B8%EA%B5%AD' },
  { label: '프랑스', href: '/services?country=%ED%94%84%EB%9E%91%EC%8A%A4' },
  { label: '독일', href: '/services?country=%EB%8F%85%EC%9D%BC' },
  { label: '일본', href: '/services?country=%EC%9D%BC%EB%B3%B8' },
  { label: '싱가포르', href: '/services?country=%EC%8B%B1%EA%B0%80%ED%8F%AC%EB%A5%B4' },
  { label: '유럽', href: '/services?country=%EC%9C%A0%EB%9F%BD' },
]

export default function CurriculumSection() {
  return (
    <section
      className="w-full"
      style={{
        backgroundImage:
          'linear-gradient(129deg, rgb(13,39,136) 14.4%, rgb(16,35,93) 57.8%, rgb(17,14,36) 94.3%)',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 xl:px-12 py-28">

        {/* Heading */}
        <h2 className="text-[36px] sm:text-[48px] font-black text-[#33c3ff] leading-[1.1] tracking-[-2.4px] text-center mb-8">
          수출바우처 해외 진출 커리큘럼
        </h2>

        {/* Description */}
        <div className="max-w-[756px] mx-auto mb-16 text-center">
          <p className="text-[24px] sm:text-[30px] font-bold text-white leading-[1.4] tracking-[-0.9px] mb-3">
            스타트업 맞춤형 해외 진출 커리큘럼을 기반하여
            <br className="hidden sm:block" />
            주요 국가 내 프로그램을 제공하고 있습니다.
          </p>
          <p className="text-[18px] sm:text-[20px] font-medium text-white/80 tracking-[-0.5px]">
            (전주기 맞춤형 해외 진출 지원을 위해 메뉴판 지속 확대중)
          </p>
        </div>

        {/* Country tab row */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {CURRICULUM_TABS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="h-[60px] w-[93px] flex items-center justify-center rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
            >
              <span className="text-[14px] font-bold text-white/80">{label}</span>
            </Link>
          ))}
        </div>

        {/* Curriculum board image */}
        <div className="flex justify-center">
          <img
            src="/images/curriculum-board-new.png"
            alt="수출바우처 해외 진출 커리큘럼 메뉴판"
            className="max-w-full h-auto block"
            style={{ objectFit: 'contain' }}
          />
        </div>

      </div>
    </section>
  )
}
