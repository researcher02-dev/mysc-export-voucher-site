import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import GuideCta from './GuideCta'

export const metadata: Metadata = {
  title: '수출바우처 신청방법 총정리 | 대상·서류·선정기준·전시회 활용 — MYSC',
  description:
    '수출바우처 신청방법을 한 페이지에 정리했습니다. 신청 대상, 제출서류, 선정기준, 최근 공고 일정, 전시회·시장조사·해외영업 활용 방법까지 공식 기준으로 확인하세요.',
  keywords: [
    '수출바우처 신청방법',
    '수출바우처 신청자격',
    '수출바우처 제출서류',
    '수출바우처 선정기준',
    '수출바우처 수행기관',
    '수출바우처 전시회',
    '수출바우처 시장조사',
    '수출바우처 해외영업지원',
    '수출바우처 컨설팅',
    '수출바우처 CES',
    '미국 시장 진출 전략 컨설팅',
  ],
  openGraph: {
    title: '수출바우처 신청방법 총정리 | 대상·서류·선정기준·전시회 활용',
    description:
      '수출바우처를 어디서 신청하고 어떤 서류를 준비해야 하는지, 조사·전시회·해외영업 메뉴 중 어디에 해당하는지 공식 기준으로 안내합니다.',
    type: 'article',
  },
}

// ── Small reusable primitives ─────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[12px] font-bold tracking-[1.5px] text-[#33c3ff] uppercase mb-3">
      {children}
    </span>
  )
}

function H2({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="text-[28px] sm:text-[32px] font-bold text-[#0b1b35] leading-[1.25] tracking-[-1px] mb-6"
    >
      {children}
    </h2>
  )
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[20px] font-bold text-[#0b1b35] leading-[1.35] tracking-[-0.5px] mb-3">
      {children}
    </h3>
  )
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[16px] text-[#314158] leading-[1.8] tracking-[-0.2px]">
      {children}
    </p>
  )
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 bg-[#f0f9ff] border border-[#b3e8ff] rounded-xl p-5 text-[15px] text-[#314158] leading-[1.75]">
      {children}
    </div>
  )
}

function WarnBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 bg-[#fffbeb] border border-[#fde68a] rounded-xl p-5 text-[15px] text-[#5c4a00] leading-[1.75]">
      {children}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function GuidePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section
        className="w-full py-20 sm:py-28"
        style={{
          background:
            'linear-gradient(135deg, rgb(77,104,205) 0%, rgb(13,39,136) 30%, rgb(11,27,53) 100%)',
        }}
      >
        <div className="max-w-[900px] mx-auto px-5 sm:px-10 text-center flex flex-col items-center gap-5">
          <span className="inline-block text-[12px] font-bold tracking-[2px] text-[#33c3ff] uppercase">
            마지막 업데이트: 2026-06-07 · 수출바우처 포털·중기부·KOTRA 최근 공고 반영
          </span>
          <h1 className="text-[40px] sm:text-[52px] font-black text-white leading-[1.15] tracking-[-2px]">
            수출바우처 신청방법
          </h1>
          <p className="text-[18px] sm:text-[20px] font-medium text-[#cad5e2] leading-[1.65] max-w-[680px]">
            신청자격·제출서류·선정기준·전시회/컨설팅 활용까지 한 번에 정리
          </p>

          {/* Quick-answer cards */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-[740px]">
            {[
              { label: '신청처', value: '수출바우처 홈페이지 (온라인)' },
              { label: '기본 대상', value: '중소기업 / 일부 트랙 중견기업' },
              { label: '동시 신청', value: '동일공고 최대 2개 → 최종 1개 선정' },
              { label: '주요 서류', value: '중소기업확인서 · 수출실적 증빙 外' },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-white/10 backdrop-blur rounded-xl p-4 text-left flex flex-col gap-1"
              >
                <span className="text-[11px] font-bold text-[#33c3ff] tracking-[1px] uppercase">
                  {label}
                </span>
                <span className="text-[13px] font-medium text-white leading-[1.5]">{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-3 items-center">
            <GuideCta label="수출바우처 서비스 상담받기" source="guide_hero" />
            <Link
              href="/services"
              className="inline-flex items-center justify-center h-[52px] px-10 rounded-full border border-white/30 text-white text-[16px] font-bold tracking-[-0.4px] hover:bg-white/10 transition-colors"
            >
              서비스 목록 보기
            </Link>
          </div>
        </div>
      </section>

      {/* ── TOC bar ─────────────────────────────────────────────────────── */}
      <nav
        aria-label="페이지 내 이동"
        className="sticky top-[66.5px] z-40 w-full bg-white border-b border-[#e8eef5] overflow-x-auto"
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 xl:px-12 flex gap-0 whitespace-nowrap">
          {[
            ['#intro', '수출바우처란'],
            ['#eligibility', '신청자격'],
            ['#how-to', '신청방법'],
            ['#docs', '제출서류'],
            ['#evaluation', '선정기준'],
            ['#services', '서비스 활용'],
            ['#faq', 'FAQ'],
            ['#checklist', '체크리스트'],
          ].map(([href, text]) => (
            <a
              key={href}
              href={href}
              className="px-4 py-4 text-[14px] font-medium text-[#314158] hover:text-[#0b1b35] hover:border-b-2 hover:border-[#33c3ff] transition-colors"
            >
              {text}
            </a>
          ))}
        </div>
      </nav>

      {/* ── Main content ────────────────────────────────────────────────── */}
      <main className="flex-1">
        <div className="max-w-[900px] mx-auto px-5 sm:px-10 xl:px-0 py-16 flex flex-col gap-20">

          {/* 1. 수출바우처란 */}
          <section id="intro">
            <SectionLabel>제도 개요</SectionLabel>
            <H2>수출바우처란</H2>
            <Prose>
              수출바우처는 정부가 참여기업에 바우처를 발급하고, 기업이 수출마케팅 서비스
              메뉴판에서 필요한 서비스와 수행기관을 직접 선택해 활용하는 통합형 수출지원
              제도입니다. 공식 서비스 메뉴판에는 조사/일반 컨설팅, 통번역, 브랜드 개발,
              홍보/광고, <strong>전시회/행사/해외영업지원</strong>, 해외규격인증 등 14개 분야가
              포함됩니다.
            </Prose>
            <Prose>
              주관기관은 중소벤처기업부(중기부), 산업통상자원부(산업부), KOTRA,
              중소벤처기업진흥공단(중진공) 등으로 나뉘며, 트랙에 따라 신청 대상·지원 규모·평가
              방식이 다릅니다. 시장조사, 미국 진출 전략, CES 전시 전략, 바이어 미팅 지원 등의
              서비스는 이 메뉴판 안에서 활용 가능한 항목과 직접 연결됩니다.
            </Prose>
            <InfoBox>
              📌 이 페이지는 공통적으로 반복되는 기준을 안내합니다. 최종 판단은 반드시 해당
              차수 공고문을 직접 확인하세요. 공식 FAQ도 "제출자료와 세부 사업 내용은 사업별로
              상이하므로 공고문 세부내용을 직접 확인하라"고 안내합니다.
            </InfoBox>
          </section>

          {/* 2. 신청자격 */}
          <section id="eligibility">
            <SectionLabel>신청 대상</SectionLabel>
            <H2>누가 신청할 수 있나요</H2>
            <Prose>
              중기부 최근 공고 기준으로는 「중소기업기본법」상 중소기업이 기본 대상입니다.
              산업부·KOTRA 트랙은 수출 중소·중견기업도 대상에 포함되는 경우가 있어, 트랙마다
              요건이 다릅니다.
            </Prose>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: '중기부 트랙',
                  items: [
                    '「중소기업기본법」상 중소기업',
                    '수출실적 구간별로 신청 가능 트랙 상이',
                    '수출실적 1,000불 미만(내수기업) 구간도 일부 공고에 포함',
                  ],
                },
                {
                  title: '산업부/KOTRA 트랙',
                  items: [
                    '수출 중소·중견기업 대상',
                    '산업군·지역별로 별도 트랙 운영',
                    '세부 요건은 각 공고문 확인 필요',
                  ],
                },
              ].map(({ title, items }) => (
                <div key={title} className="bg-[#f8f9fb] rounded-xl p-5">
                  <p className="text-[15px] font-bold text-[#0b1b35] mb-3">{title}</p>
                  <ul className="flex flex-col gap-2">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[14px] text-[#314158] leading-[1.6]">
                        <span className="mt-1 shrink-0 w-4 h-4 rounded-full bg-[#33c3ff]/20 flex items-center justify-center text-[10px] text-[#33c3ff] font-bold">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <WarnBox>
              ⚠️ 휴·폐업, 국세·지방세 체납 기업은 신청 제외됩니다. 협약기간이 끝나지 않은
              참여기업은 동일 차수 신청이 제한될 수 있으며, 수출실적이 없어도 일부 트랙은 신청
              가능하나 공고별 요건을 반드시 확인해야 합니다.
            </WarnBox>
          </section>

          {/* 3. 신청방법 */}
          <section id="how-to">
            <SectionLabel>신청 절차</SectionLabel>
            <H2>어디서 어떻게 신청하나요</H2>
            <Prose>
              신청은 <strong>수출바우처 홈페이지(exportvoucher.com)</strong>에서 온라인으로
              진행합니다. 동일공고 안에서 최대 2개 사업에 신청할 수 있지만, 최종적으로는 선순위
              1개 사업만 선정됩니다. 우선순위를 정한 뒤 각 사업별 신청서를 작성해 제출해야
              합니다.
            </Prose>

            {/* Steps */}
            <div className="mt-6 flex flex-col gap-0">
              {[
                {
                  step: '01',
                  title: '공고 확인',
                  desc: '수출바우처 홈페이지 또는 기업마당(Bizinfo)에서 현재 모집 중인 공고를 확인합니다. 중기부 트랙인지 산업부/KOTRA 트랙인지 먼저 구분하세요.',
                },
                {
                  step: '02',
                  title: '신청 자격 검토',
                  desc: '공고문 내 지원 대상, 수출실적 구간, 업종 요건을 확인합니다. 중소기업확인서 유효기간도 미리 점검하세요.',
                },
                {
                  step: '03',
                  title: '서류 준비',
                  desc: '중소기업확인서, 수출실적 증빙 서류, 민원증명 서류 등 공통서류를 준비합니다. 세부사업은 추가서류 요건이 다를 수 있습니다.',
                },
                {
                  step: '04',
                  title: '온라인 신청',
                  desc: '수출바우처 홈페이지에서 신청서를 작성하고 서류를 업로드합니다. 마감 당일 접속 집중으로 지연될 수 있으니 마감 2~3일 전 제출을 권장합니다.',
                },
                {
                  step: '05',
                  title: '평가 및 선정',
                  desc: '요건검토 → 서면평가(→ 현장/면접평가) 순으로 진행됩니다. 선정 후 협약을 체결하고 서비스 수행기관을 선택합니다.',
                },
                {
                  step: '06',
                  title: '바우처 활용',
                  desc: '협약기간 내 수행기관을 선택해 서비스를 활용합니다. 사용계획서는 수정 가능하지만 운영기관과 사전 공유가 필요하며, 바우처 총액은 최초 제출 후 수정 불가합니다.',
                },
              ].map(({ step, title, desc }, i, arr) => (
                <div key={step} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-[#0b1b35] text-white text-[13px] font-bold flex items-center justify-center">
                      {step}
                    </div>
                    {i < arr.length - 1 && (
                      <div className="w-px flex-1 bg-[#e8eef5] my-2" />
                    )}
                  </div>
                  <div className="pb-8">
                    <p className="text-[16px] font-bold text-[#0b1b35] mb-1">{title}</p>
                    <Prose>{desc}</Prose>
                  </div>
                </div>
              ))}
            </div>

            <WarnBox>
              ⚠️ 일부 지역·연계형 프로그램은 온라인 신청과 별도 서류 제출을 모두 해야 접수가
              완료됩니다. 홈페이지에서 제출 버튼을 눌렀다고 끝이 아닐 수 있습니다. 공고문 내
              제출방법 항목을 반드시 재확인하세요.
            </WarnBox>
          </section>

          {/* 4. 제출서류 */}
          <section id="docs">
            <SectionLabel>준비 서류</SectionLabel>
            <H2>어떤 서류를 준비해야 하나요</H2>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <H3>공통 서류 (반복 확인)</H3>
                <ul className="flex flex-col gap-3">
                  {[
                    '신청일 기준 유효한 중소기업확인서',
                    '수출실적 증빙 서류',
                    '중소기업지원플랫폼 경유 민원증명 서류',
                    '신용조회·정보제공 관련 자료',
                    '사업신청 관련 기본정보',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[15px] text-[#314158] leading-[1.6]">
                      <span className="mt-[3px] shrink-0 text-[#33c3ff]">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <H3>차수별 추가 서류 (예시)</H3>
                <ul className="flex flex-col gap-3">
                  {[
                    '목록통관 수출실적 시 → 무역통계진흥원 수출증명서',
                    '지점 수출합산 시 → 관련 추가 증빙',
                    'KOTRA 지역연계형 → 사업자등록증명원, 재무제표, 국세·지방세 완납증명, 활동계획서',
                    '일부 사업 → 공장등록증명서, 가입자명부, 제품정보·사진',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[15px] text-[#314158] leading-[1.6]">
                      <span className="mt-[3px] shrink-0 text-[#ffb432]">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <InfoBox>
              💡 세부사업이나 KOTRA 지역 연계형 프로그램에서는 사업자등록증만으로 끝나지 않는
              경우가 많습니다. 공고별 추가서류 목록을 별도로 정리해두는 것을 권장합니다.
            </InfoBox>
          </section>

          {/* 5. 선정기준 */}
          <section id="evaluation">
            <SectionLabel>평가 방식</SectionLabel>
            <H2>선정은 어떻게 되나요</H2>
            <Prose>
              수출바우처는 "신청만 하면 자동 선정"이 아닙니다. 최근 공식 공고 기준으로
              중기부 트랙은 <strong>요건검토 → 서면평가</strong>(수출준비도, 수출비율, 수출실적
              성장률)가 기본이며, 1차 공고는 현장평가 대상 선정을 포함했습니다. 산업부 산업바우처는
              <strong> 1차 서류(계량) → 2차 면접(비계량)</strong> 구조입니다.
            </Prose>

            <div className="mt-6 grid sm:grid-cols-2 gap-5">
              {[
                {
                  badge: '중기부 트랙',
                  color: 'bg-[#0b1b35]',
                  items: [
                    '요건검토 (기본 서류 확인)',
                    '서면평가 — 수출준비도, 수출비율, 실적 성장률',
                    '일부 차수: 현장평가 대상 선정',
                  ],
                },
                {
                  badge: '산업부/KOTRA 트랙',
                  color: 'bg-[#162d52]',
                  items: [
                    '1차 서류 심사 (계량 평가)',
                    '2차 면접 (비계량 평가)',
                    '해외진출 역량 + 바우처 활용계획 종합평가',
                  ],
                },
              ].map(({ badge, color, items }) => (
                <div key={badge} className={`${color} rounded-xl p-5`}>
                  <span className="inline-block text-[11px] font-bold tracking-[1px] text-[#33c3ff] uppercase mb-4">
                    {badge}
                  </span>
                  <ol className="flex flex-col gap-3">
                    {items.map((item, i) => (
                      <li key={item} className="flex items-start gap-3 text-[14px] text-[#cad5e2] leading-[1.6]">
                        <span className="shrink-0 w-5 h-5 rounded-full bg-white/10 text-white text-[11px] font-bold flex items-center justify-center mt-[2px]">
                          {i + 1}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>

            <Prose>
              평가에서 좋은 결과를 내려면 서류 정확도와 함께 <strong>사업 적합성, 기업 수출
              역량, 바우처 활용계획</strong>이 설득력 있게 담겨야 합니다. 특히 사용계획서는
              바우처 신청 단계에서 작성하지 않지만, 선정 후 활용계획의 구체성이 평가에 영향을 미치는 트랙도 있습니다.
            </Prose>
          </section>

          {/* 6. 서비스 활용 */}
          <section id="services">
            <SectionLabel>서비스 매핑</SectionLabel>
            <H2>우리 서비스는 어떤 메뉴로 활용할 수 있나요</H2>
            <Prose>
              공식 수출바우처 서비스 메뉴판 기준으로 MYSC의 서비스는 아래 두 대분류에 연결됩니다.
              메뉴판 공식 명칭은 <strong>조사/일반 컨설팅</strong>과{' '}
              <strong>전시회/행사/해외영업지원</strong>입니다. 기업 측에서는 '해외영업'으로
              별도 검색하는 경우가 많지만, 공식 분류상으로는 전시회/행사/해외영업지원 안에 포함됩니다.
            </Prose>

            <div className="mt-6 flex flex-col gap-5">
              {/* Card 1: 조사·일반컨설팅 */}
              <div className="border border-[#e8eef5] rounded-2xl overflow-hidden">
                <div className="bg-[#f8f9fb] px-6 py-4 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold tracking-[1px] text-[#33c3ff] uppercase">공식 메뉴명</span>
                    <p className="text-[17px] font-bold text-[#0b1b35] mt-1">조사/일반 컨설팅</p>
                  </div>
                  <span className="text-[12px] font-medium text-[#314158] bg-[#e8eef5] px-3 py-1 rounded-full">
                    법무·세무·회계 제외
                  </span>
                </div>
                <div className="px-6 py-5">
                  <p className="text-[14px] text-[#99a1af] mb-4">
                    정보 조사 및 법무·세무·회계를 제외한 수출 관련 일반·컨설팅 지원
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-[13px] font-bold text-[#0b1b35] mb-2">검색 친화 표현</p>
                      <div className="flex flex-wrap gap-2">
                        {['수출바우처 시장조사', '미국 시장 진출 전략', '포지셔닝 컨설팅', '수출 전략 수립', '경쟁 분석'].map(tag => (
                          <span key={tag} className="text-[12px] bg-[#e8eef5] text-[#314158] px-3 py-1 rounded-full">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-[#0b1b35] mb-2">MYSC 서비스 연결</p>
                      <ul className="flex flex-col gap-1">
                        {['Global GTM 컨설팅', '미국 시장 진출 전략 컨설팅', '타겟 시장 조사', '경쟁 분석·포지셔닝', '진입 로드맵 수립'].map(item => (
                          <li key={item} className="text-[13px] text-[#314158] flex items-center gap-2">
                            <span className="text-[#33c3ff]">→</span>{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: 전시회/행사/해외영업지원 */}
              <div className="border border-[#e8eef5] rounded-2xl overflow-hidden">
                <div className="bg-[#f8f9fb] px-6 py-4 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold tracking-[1px] text-[#33c3ff] uppercase">공식 메뉴명</span>
                    <p className="text-[17px] font-bold text-[#0b1b35] mt-1">전시회/행사/해외영업지원</p>
                  </div>
                  <span className="text-[12px] font-medium text-[#314158] bg-[#e8eef5] px-3 py-1 rounded-full">
                    해외영업 포함
                  </span>
                </div>
                <div className="px-6 py-5">
                  <p className="text-[14px] text-[#99a1af] mb-4">
                    전시회·상담회·세미나 등 수출 관련 행사 기획·지원 및 해외영업지원을 통한 수출 지원
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-[13px] font-bold text-[#0b1b35] mb-3">전시회·행사</p>
                      <ul className="flex flex-col gap-1 mb-4">
                        {['CES 전시 전략 컨설팅', 'CES·MWC 글로벌 브랜드 마케팅', '현지 행사 운영 지원', '해외전시회 참가 지원'].map(item => (
                          <li key={item} className="text-[13px] text-[#314158] flex items-center gap-2">
                            <span className="text-[#33c3ff]">→</span>{item}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2">
                        {['수출바우처 CES', '수출바우처 전시회 참가', '해외전시회 바우처'].map(tag => (
                          <span key={tag} className="text-[12px] bg-[#e8eef5] text-[#314158] px-3 py-1 rounded-full">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-[#0b1b35] mb-3">해외영업</p>
                      <ul className="flex flex-col gap-1 mb-4">
                        {['미국 진출 & PoC 연결 컨설팅', '파트너·바이어 미팅 주선', '영문 제안서·세일즈 레퍼런스 자료', '현지 네트워킹 지원'].map(item => (
                          <li key={item} className="text-[13px] text-[#314158] flex items-center gap-2">
                            <span className="text-[#33c3ff]">→</span>{item}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2">
                        {['수출바우처 해외영업지원', '바이어 발굴', 'PoC 제안'].map(tag => (
                          <span key={tag} className="text-[12px] bg-[#e8eef5] text-[#314158] px-3 py-1 rounded-full">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-[#0b1b35] rounded-2xl p-8 text-center flex flex-col items-center gap-4">
              <p className="text-[18px] font-bold text-white leading-[1.5]">
                우리 기업이 신청한 서비스가 어느 메뉴에 해당하는지,
                <br className="hidden sm:block" />
                정산 가능 범위까지 함께 확인해드립니다.
              </p>
              <p className="text-[15px] text-[#cad5e2]">
                미국 시장 진출 전략, CES 전시 참가, 바이어 미팅 지원 중 어떤 항목이 바우처로
                연결되는지 상담받아보세요.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <GuideCta label="서비스 메뉴 상담받기" source="guide_service_mapping" />
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center h-[52px] px-10 rounded-full border border-white/30 text-white text-[16px] font-bold hover:bg-white/10 transition-colors"
                >
                  전체 서비스 보기
                </Link>
              </div>
            </div>
          </section>

          {/* 7. FAQ */}
          <section id="faq">
            <SectionLabel>자주 묻는 질문</SectionLabel>
            <H2>FAQ</H2>

            <div className="flex flex-col gap-4">
              {[
                {
                  q: '수출바우처는 어디서 신청하나요?',
                  a: '수출바우처 홈페이지(exportvoucher.com)에서 온라인으로 신청합니다. 동일공고 내 최대 2개 사업 신청이 가능하지만, 최종 선정은 1개 사업만 됩니다. 우선순위를 먼저 정해두세요.',
                },
                {
                  q: '수출실적이 없어도 신청 가능한가요?',
                  a: '일부 공고는 내수기업 또는 전년도 수출액 1,000불 미만 구간을 별도로 두고 있습니다. "수출실적이 없으면 무조건 불가"가 아니라, 차수별 공고에서 해당 구간 신청 가능 여부를 직접 확인해야 합니다.',
                },
                {
                  q: '전시회 참가도 수출바우처로 가능한가요?',
                  a: '가능합니다. 공식 서비스 메뉴판에 전시회/행사/해외영업지원 대분류가 포함되어 있고, 공식 FAQ도 해외전시회 개별참가 시 이 대분류를 선택하도록 안내합니다. CES·MWC 같은 해외 주요 전시회도 해당됩니다.',
                },
                {
                  q: '사용계획서는 나중에 수정할 수 있나요?',
                  a: '세부 내용은 사업종료일까지 수정 가능하지만, 변경 전 운영기관과 사전 공유가 권장됩니다. 중요한 점은 최초 제출 이후 바우처 총액 자체는 수정할 수 없다는 것입니다.',
                },
                {
                  q: '작년에 선정된 기업도 다시 신청할 수 있나요?',
                  a: '협약기간이 종료되지 않은 참여기업은 협약기간 내 모집 사업에 중복 참여할 수 없습니다. 협약기간이 끝났다면 재신청이 가능하며, 차수별 예외조건이 붙는 경우도 있으니 공고를 확인하세요.',
                },
                {
                  q: '같은 전시회에 다른 기관 지원금도 같이 받을 수 있나요?',
                  a: '공식 FAQ 기준으로 동일 전시회에 대해 타 정부기관·지자체 등의 지원금 중복수령은 불가합니다. 이미 다른 지원을 받고 있다면 반드시 사전에 확인이 필요합니다.',
                },
              ].map(({ q, a }) => (
                <details key={q} className="group border border-[#e8eef5] rounded-xl overflow-hidden">
                  <summary className="cursor-pointer flex items-start justify-between gap-4 px-6 py-5 text-[16px] font-bold text-[#0b1b35] list-none hover:bg-[#f8f9fb] transition-colors">
                    <span>{q}</span>
                    <span className="shrink-0 mt-1 w-5 h-5 rounded-full border border-[#cad5e2] flex items-center justify-center text-[12px] text-[#314158] group-open:rotate-180 transition-transform">
                      ▾
                    </span>
                  </summary>
                  <div className="px-6 pb-5 pt-2 text-[15px] text-[#314158] leading-[1.75]">
                    {a}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* 8. 체크리스트 */}
          <section id="checklist">
            <SectionLabel>신청 전 확인</SectionLabel>
            <H2>신청 체크리스트</H2>
            <Prose>
              최근 공식 공고와 FAQ, 공통 제출서류 패턴을 바탕으로 만든 예시입니다. 공고별
              추가서류는 반드시 별도로 확인해야 합니다.
            </Prose>

            <div className="mt-6 flex flex-col gap-2">
              {[
                '이번 공고가 중기부인지, 산업부/KOTRA인지 먼저 확인했다',
                '우리 회사가 중소기업/중견기업 요건에 맞는지 확인했다',
                '수출실적 구간과 신청 가능 트랙을 확인했다',
                '동일공고 내 신청 우선순위를 정했다',
                '중소기업확인서 유효기간을 확인했다',
                '수출실적 증빙 서류를 준비했다',
                '목록통관 실적이 있으면 별도 수출증명 서류를 준비했다',
                '중소기업지원플랫폼으로 제출해야 하는 민원증명 서류를 확인했다',
                '우리 서비스가 조사·일반컨설팅 / 전시회·행사 / 해외영업 중 어디에 해당하는지 정리했다',
                '마감 당일이 아니라 최소 2~3일 전에 제출하기로 했다',
              ].map((item, i) => (
                <div
                  key={item}
                  className="flex items-center gap-4 px-5 py-4 bg-[#f8f9fb] rounded-xl text-[15px] text-[#314158]"
                >
                  <span className="shrink-0 w-6 h-6 rounded border-2 border-[#cad5e2] bg-white flex items-center justify-center text-[12px] text-[#99a1af]">
                    {i + 1}
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </section>

          {/* 9. 최근 일정 */}
          <section>
            <SectionLabel>공고 일정 예시</SectionLabel>
            <H2>최근 공고 기준 일정</H2>
            <Prose>
              아래 일정은 최근 공식 공고를 바탕으로 한 예시입니다. 실제 일정은 차수마다 달라지므로
              수출바우처 홈페이지에서 현재 모집 공고를 직접 확인하세요.
            </Prose>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-[14px] border-collapse">
                <thead>
                  <tr className="bg-[#0b1b35] text-white">
                    <th className="text-left px-5 py-3 font-bold rounded-tl-xl">트랙</th>
                    <th className="text-left px-5 py-3 font-bold">차수</th>
                    <th className="text-left px-5 py-3 font-bold">접수 기간</th>
                    <th className="text-left px-5 py-3 font-bold rounded-tr-xl">비고</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { track: '중기부', round: '2026년 1차', period: '2025.12.17 ~ 2026.1.9', note: '협약 2026.2.1 ~ 12.31' },
                    { track: '중기부', round: '2026년 2차', period: '2026.4.17 ~ 5.6', note: '수정공고 기준' },
                    { track: '산업부', round: '2026 산업바우처', period: '2025.12.22 ~ 2026.1.9 18시', note: '마감 시간 주의' },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f8f9fb]'}>
                      <td className="px-5 py-3 font-medium text-[#0b1b35]">{row.track}</td>
                      <td className="px-5 py-3 text-[#314158]">{row.round}</td>
                      <td className="px-5 py-3 text-[#314158] font-medium">{row.period}</td>
                      <td className="px-5 py-3 text-[#99a1af]">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 10. 공식 참고자료 */}
          <section>
            <SectionLabel>공식 출처</SectionLabel>
            <H2>공식 참고자료</H2>
            <Prose>
              이 페이지는 아래 공식 소스를 기반으로 작성됐습니다. 최신 공고 및 세부 조건은
              각 공식 채널에서 직접 확인하시기 바랍니다.
            </Prose>
            <ul className="mt-4 flex flex-col gap-2">
              {[
                { label: '수출바우처 포털 (공지사항·FAQ·서비스 메뉴판)', url: 'https://www.exportvoucher.com' },
                { label: '중소벤처기업부 사업공고', url: 'https://www.mss.go.kr' },
                { label: '기업마당 Bizinfo 공고 상세', url: 'https://www.bizinfo.go.kr' },
                { label: 'KOTRA 무역투자24 수출바우처 안내', url: 'https://www.kotra.or.kr' },
                { label: '중소벤처기업진흥공단 사업개요', url: 'https://www.kosmes.or.kr' },
              ].map(({ label, url }) => (
                <li key={url}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] text-[#33c3ff] hover:underline"
                  >
                    {label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      {/* ── Bottom CTA ──────────────────────────────────────────────────── */}
      <section className="bg-[#0b1b35]">
        <div className="max-w-[900px] mx-auto px-5 sm:px-10 xl:px-0 py-24 flex flex-col items-center gap-5 text-center">
          <h2 className="text-[32px] sm:text-[40px] font-bold text-white leading-[1.3] tracking-[-1.5px]">
            공고문 기준으로 필요한 서류와<br className="hidden sm:block" />
            적용 가능한 서비스 범위를 함께 점검해드립니다.
          </h2>
          <p className="text-[17px] font-medium text-[#cad5e2] leading-[1.75] max-w-[540px]">
            바우처 신청 전, 우리 기업이 어떤 메뉴로 활용할 수 있는지 MYSC와 함께 검토해보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <GuideCta label="상담 문의하기" source="guide_bottom_cta" className="h-[60px] px-12 text-[18px]" />
            <Link
              href="/services"
              className="inline-flex items-center justify-center h-[60px] px-12 rounded-full border border-white/30 text-white text-[18px] font-bold hover:bg-white/10 transition-colors"
            >
              서비스 목록 보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
