import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import GuideCta from './GuideCta'

export const metadata: Metadata = {
  title: '수출바우처 신청방법 총정리 | 대상·서류·선정기준·전시회 활용 — MYSC',
  description:
    '수출바우처 신청방법을 한 페이지에 정리했습니다. 신청 대상, 제출서류, 선정기준, 전시회·시장조사·해외영업 활용 방법까지 공식 기준으로 확인하세요.',
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

// ── Small reusable primitives ──────────────────────────────────────────────

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

// ── Page ──────────────────────────────────────────────────────────────────

export default function GuidePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section
        className="w-full py-20 sm:py-28"
        style={{
          background:
            'linear-gradient(135deg, rgb(77,104,205) 0%, rgb(13,39,136) 30%, rgb(11,27,53) 100%)',
        }}
      >
        <div className="max-w-[900px] mx-auto px-5 sm:px-10 text-center flex flex-col items-center gap-5">
          <span className="inline-block text-[12px] font-bold tracking-[2px] text-[#33c3ff] uppercase">
            마지막 업데이트: 2026-06-08 · 수출바우처 포털·정산가이드(중기부/KOTRA) 반영
          </span>
          <h1 className="text-[40px] sm:text-[52px] font-black text-white leading-[1.15] tracking-[-2px]">
            수출바우처 신청 안내 페이지
          </h1>
          <p className="text-[18px] sm:text-[20px] font-medium text-[#cad5e2] leading-[1.65] max-w-[680px]">
            전반적인 사업 운영 구조 및 지원 대상, 받을 수 있는 혜택 등을 종합적으로 정리했습니다.
          </p>

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

      {/* ── TOC bar ───────────────────────────────────────────────────── */}
      <nav
        aria-label="페이지 내 이동"
        className="sticky top-[66.5px] z-40 w-full bg-white border-b border-[#e8eef5] overflow-x-auto"
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 xl:px-12 flex gap-0 whitespace-nowrap">
          {[
            ['#structure', '사업 구조'],
            ['#eligibility', '신청자격'],
            ['#how-to', '신청방법'],
            ['#docs', '제출서류'],
            ['#evaluation', '선정기준'],
            ['#faq', 'FAQ'],
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

      {/* ── Main content ──────────────────────────────────────────────── */}
      <main className="flex-1">
        <div className="max-w-[900px] mx-auto px-5 sm:px-10 xl:px-0 py-16 flex flex-col gap-20">

          {/* 1. 사업 구조 이해 */}
          <section id="structure">
            <SectionLabel>사업 구조 이해</SectionLabel>
            <H2>수출바우처는 어떤 사업인가요?</H2>
            <Prose>
              정부가 수출을 준비하는 기업에게 <strong>바우처(이용권)</strong>를 발급하면,
              기업이 그 바우처로 공식 서비스 메뉴판에서 필요한 서비스를 골라 쓰는 방식입니다.
              전시회 참가, 시장조사, 해외영업 지원, 번역·인증·특허 등 14개 분야 중 원하는 서비스를
              자유롭게 선택할 수 있습니다.
            </Prose>

            {/* 용어 정의 */}
            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              {[
                {
                  term: '참여기업',
                  def: '바우처를 발급받아 서비스를 이용하는 수요 기업.',
                  icon: '🏢',
                },
                {
                  term: '수행기관',
                  def: '메뉴판에 등록되어 참여기업에게 수출지원 서비스를 제공하는 민간·공공기관.',
                  icon: '🔧',
                },
                {
                  term: '운영기관',
                  def: '선정·협약·정산·관리를 담당하는 공공기관. 중기부 트랙은 중진공, 산업부/KOTRA 트랙은 KOTRA.',
                  icon: '🏛',
                },
              ].map(({ term, def, icon }) => (
                <div key={term} className="bg-[#f8f9fb] rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[18px]">{icon}</span>
                    <p className="text-[15px] font-bold text-[#0b1b35]">{term}</p>
                  </div>
                  <p className="text-[13px] text-[#314158] leading-[1.65]">{def}</p>
                </div>
              ))}
            </div>

            {/* 시각화 B: 자금 구조 흐름도 */}
            <div className="mt-8">
              <p className="text-[14px] font-bold text-[#0b1b35] mb-4">바우처 자금은 어떻게 구성되나요?</p>
              <div className="bg-[#0b1b35] rounded-2xl p-6 sm:p-8">
                {/* 상단: 정부 → 운영기관 분기 */}
                <div className="flex flex-col items-center gap-2 mb-6">
                  <div className="bg-white/10 border border-white/20 rounded-xl px-6 py-3 text-center">
                    <p className="text-[12px] text-[#33c3ff] font-bold tracking-[1px] uppercase mb-1">정부 예산</p>
                    <p className="text-white text-[14px] font-bold">중소벤처기업부 · 산업통상자원부</p>
                  </div>
                  <div className="text-[#33c3ff] text-[20px]">↓</div>
                  <div className="grid grid-cols-2 gap-3 w-full max-w-[500px]">
                    <div className="bg-white/10 border border-white/20 rounded-xl p-4 text-center">
                      <p className="text-[11px] text-[#33c3ff] font-bold mb-1">중기부 트랙</p>
                      <p className="text-white text-[13px] font-medium">운영기관: 중진공</p>
                      <p className="text-[#cad5e2] text-[12px] mt-1">기준: 수출실적 구간</p>
                    </div>
                    <div className="bg-white/10 border border-white/20 rounded-xl p-4 text-center">
                      <p className="text-[11px] text-[#33c3ff] font-bold mb-1">산업부/KOTRA 트랙</p>
                      <p className="text-white text-[13px] font-medium">운영기관: KOTRA</p>
                      <p className="text-[#cad5e2] text-[12px] mt-1">기준: 업종 + 매출액 구간</p>
                    </div>
                  </div>
                  <div className="text-[#33c3ff] text-[20px]">↓</div>
                </div>

                {/* 바우처 구성 */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6">
                  <p className="text-[13px] font-bold text-[#33c3ff] mb-3 text-center">바우처 구성 (중소기업 기준)</p>
                  <div className="flex gap-2 items-stretch">
                    <div className="flex-[7] bg-[#33c3ff]/20 border border-[#33c3ff]/30 rounded-lg p-3 text-center">
                      <p className="text-[12px] text-[#33c3ff] font-bold">국고보조금 70%</p>
                      <p className="text-[11px] text-[#cad5e2] mt-1">정부 지원</p>
                    </div>
                    <div className="flex-[3] bg-white/10 border border-white/20 rounded-lg p-3 text-center">
                      <p className="text-[12px] text-white font-bold">기업 30%</p>
                      <p className="text-[11px] text-[#cad5e2] mt-1">자부담</p>
                    </div>
                  </div>
                  <p className="text-[12px] text-[#99a1af] text-center mt-3">중견기업은 국고 50% / 자부담 50%</p>
                </div>

                {/* 하단 흐름 */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
                  {([
                    { label: '참여기업', sub1: '분담금 납부 후', sub2: '바우처 수령' },
                    { arrow: true },
                    { label: '메뉴판', sub1: '14개 분야 중', sub2: '서비스 선택' },
                    { arrow: true },
                    { label: '수행기관', sub1: '서비스 제공', sub2: '(부가세 10% 기업부담)' },
                    { arrow: true },
                    { label: '운영기관', sub1: '검토 후', sub2: '대금 지급' },
                  ] as Array<{ arrow: true } | { label: string; sub1: string; sub2: string }>).map((item, i) =>
                    'arrow' in item ? (
                      <span key={i} className="text-[#33c3ff] text-[18px] hidden sm:block">→</span>
                    ) : (
                      <div key={i} className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 min-w-[100px]">
                        <p className="text-white text-[13px] font-bold">{item.label}</p>
                        <p className="text-[#cad5e2] text-[11px] mt-1 leading-[1.5]">{item.sub1}</p>
                        <p className="text-[#cad5e2] text-[11px] leading-[1.5]">{item.sub2}</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* 시각화 C: 기업 여정 흐름도 */}
            <div className="mt-8">
              <p className="text-[14px] font-bold text-[#0b1b35] mb-4">선정된 후 어떻게 진행되나요?</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { num: '01', title: '공고 확인 & 신청', desc: 'exportvoucher.com에서 모집 중인 공고 확인 후 온라인 신청', color: 'bg-[#0b1b35]' },
                  { num: '02', title: '평가 & 선정', desc: '서면 평가(일부 현장/면접 포함). 선정 통보 후 협약 체결', color: 'bg-[#0f2249]' },
                  { num: '03', title: '분담금 납부 & 바우처 수령', desc: '기업분담금(중소 30%) 납부 후 온라인 포인트 형태로 바우처 발급', color: 'bg-[#0f2249]' },
                  { num: '04', title: '수행기관 선택', desc: '메뉴판에서 원하는 서비스와 수행기관을 직접 선택·계약', color: 'bg-[#0f2249]' },
                  { num: '05', title: '서비스 이용', desc: '협약기간 내 서비스 진행. 변경 시 운영기관 사전 공유 필요', color: 'bg-[#0f2249]' },
                  { num: '06', title: '만족도 등록 & 정산', desc: '서비스 완료 후 만족도 등록 → 수행기관이 정산 신청. 부가세(10%)는 기업이 별도 납부', color: 'bg-[#162d52]' },
                ].map(({ num, title, desc, color }) => (
                  <div key={num} className={`${color} rounded-xl p-4 flex flex-col gap-2`}>
                    <span className="text-[12px] font-bold text-[#33c3ff]">STEP {num}</span>
                    <p className="text-[14px] font-bold text-white leading-[1.4]">{title}</p>
                    <p className="text-[12px] text-[#cad5e2] leading-[1.6]">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <InfoBox>
              📌 이 페이지는 수출바우처 공고에서 공통적으로 확인되는 기준을 바탕으로 작성되었습니다.
              <br />
              다만 제출서류와 세부 지원 내용은 사업별·차수별로 달라질 수 있으므로, 최종 기준은 반드시 해당 공고문에서 확인해 주세요.
            </InfoBox>
          </section>

          {/* 2. 신청자격 */}
          <section id="eligibility">
            <SectionLabel>신청 대상</SectionLabel>
            <H2>누가, 얼마나 지원받을 수 있나요?</H2>
            <Prose>
              중소기업이 기본 대상이며, 공고에 따라 중견기업도 신청할 수 있습니다. 일부 공고는
              수출실적이 없거나 적은 기업도 신청 가능한 구간을 운영하므로, 먼저 공고별 지원 요건을
              확인하는 것을 추천드립니다.
            </Prose>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: '중기부 트랙',
                  badge: '기준: 수출실적 구간',
                  badgeColor: 'bg-[#dbeafe] text-[#1e40af]',
                  items: [
                    '「중소기업기본법」상 중소기업',
                    '수출실적 구간에 따라 신청 가능 트랙 상이',
                    '수출실적 1,000불 미만(내수기업) 구간도 일부 공고 포함',
                  ],
                },
                {
                  title: '산업부/KOTRA 트랙',
                  badge: '기준: 업종 + 매출액',
                  badgeColor: 'bg-[#d1fae5] text-[#065f46]',
                  items: [
                    '수출 중소·중견기업 대상',
                    '소부장·그린·소비재·서비스 등 업종별 트랙 구분',
                    '수출실적은 평가 항목으로 반영 (신청 자격 제한 아님)',
                  ],
                },
              ].map(({ title, badge, badgeColor, items }) => (
                <div key={title} className="bg-[#f8f9fb] rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <p className="text-[15px] font-bold text-[#0b1b35]">{title}</p>
                    <span className={`text-[11px] font-bold px-2 py-1 rounded-full ${badgeColor}`}>{badge}</span>
                  </div>
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

            {/* 트랙별 지원금액 표 */}
            <div className="mt-6">
              <p className="text-[14px] font-bold text-[#0b1b35] mb-3">트랙별 바우처 지원 한도</p>
              <div className="overflow-x-auto">
                <table className="w-full text-[14px] border-collapse">
                  <thead>
                    <tr className="bg-[#0b1b35] text-white">
                      <th className="text-left px-4 py-3 font-bold rounded-tl-xl">트랙</th>
                      <th className="text-left px-4 py-3 font-bold">단계</th>
                      <th className="text-left px-4 py-3 font-bold">구분 기준</th>
                      <th className="text-left px-4 py-3 font-bold rounded-tr-xl">지원 한도</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { track: '중기부', stage: '내수기업', criterion: '수출실적 1천불 미만', amount: '3,000만원', bg: 'bg-white' },
                      { track: '', stage: '초보기업', criterion: '수출실적 1천~10만불 미만', amount: '3,000만원', bg: 'bg-[#f8f9fb]' },
                      { track: '', stage: '유망기업', criterion: '수출실적 10만~100만불 미만', amount: '4,500만원', bg: 'bg-white' },
                      { track: '', stage: '성장기업', criterion: '수출실적 100만~500만불 미만', amount: '7,000만원', bg: 'bg-[#f8f9fb]' },
                      { track: '', stage: '강소기업', criterion: '수출실적 500만불 이상', amount: '1억원', bg: 'bg-white' },
                      { track: '산업부/KOTRA', stage: '진입단계', criterion: '평균 매출액 10억 미만', amount: '5,000만원', bg: 'bg-[#f0f9ff]' },
                      { track: '', stage: '성장단계', criterion: '평균 매출액 10억~100억', amount: '7,000만원', bg: 'bg-[#f8f9fb]' },
                      { track: '', stage: '확장단계', criterion: '평균 매출액 100억 이상', amount: '1억원', bg: 'bg-[#f0f9ff]' },
                    ].map((row, i) => (
                      <tr key={i} className={row.bg}>
                        <td className="px-4 py-3 font-medium text-[#0b1b35]">{row.track}</td>
                        <td className="px-4 py-3 text-[#314158]">{row.stage}</td>
                        <td className="px-4 py-3 text-[#314158]">{row.criterion}</td>
                        <td className="px-4 py-3 font-bold text-[#0b1b35]">{row.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[12px] text-[#99a1af] mt-2">
                ※ 중기부 트랙 금액은 1천만원 단위로 선택 가능한 발급 한도 기준. 산업부 트랙은 소비재 분야 기준이며 분야별 상이할 수 있음. 최종 지원 금액은 공고별 확인 필요.
              </p>
            </div>

            <WarnBox>
              ⚠️ 휴·폐업, 국세·지방세 체납 기업은 신청 제외됩니다. 협약기간이 끝나지 않은
              참여기업은 동일 차수 신청이 제한될 수 있습니다.
            </WarnBox>
          </section>

          {/* 3. 신청방법 */}
          <section id="how-to">
            <SectionLabel>신청 절차</SectionLabel>
            <H2>어디서 어떻게 신청하나요?</H2>
            <Prose>
              신청은 <strong>수출바우처 홈페이지(exportvoucher.com)</strong>에서 온라인으로
              진행합니다. 동일공고 안에서 최대 2개 사업에 신청할 수 있지만, 최종 선정은 1개만 됩니다.
            </Prose>

            <div className="mt-6 flex flex-col gap-0">
              {[
                {
                  step: '01',
                  title: '공고 확인',
                  desc: '수출바우처 홈페이지 또는 기업마당(Bizinfo)에서 현재 모집 중인 공고를 확인합니다. 중기부 트랙인지 산업부/KOTRA 트랙인지, 내가 해당하는 구간인지 먼저 확인하세요.',
                },
                {
                  step: '02',
                  title: '자격 검토 & 서류 준비',
                  desc: '공고문 내 지원 대상, 수출실적 구간, 업종 요건을 확인합니다. 중소기업확인서 유효기간과 수출실적 증빙 서류를 미리 점검하세요.',
                },
                {
                  step: '03',
                  title: '온라인 신청',
                  desc: '수출바우처 홈페이지에서 신청서를 작성하고 서류를 업로드합니다. 마감 당일 접속 집중이 있을 수 있으니 마감 2~3일 전 제출을 권장합니다.',
                },
                {
                  step: '04',
                  title: '평가 · 선정 · 협약',
                  desc: '요건검토 → 서면평가(→ 현장/면접 평가) 순으로 진행됩니다. 선정 통보 후 협약을 체결하고, 기업분담금을 납부하면 바우처가 발급됩니다.',
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
              ⚠️ 일부 세부사업이나 지역·연계형 공고는 온라인 신청 외에 추가 서류 제출 또는 별도 제출 절차가 안내될 수 있습니다.
              온라인 제출을 완료했더라도 접수 요건이 모두 충족된 것은 아닐 수 있으므로, 공고문에 기재된 제출방법과 제출서류 항목을 반드시 다시 확인해 주세요.
            </WarnBox>
          </section>

          {/* 4. 제출서류 */}
          <section id="docs">
            <SectionLabel>준비 서류</SectionLabel>
            <H2>어떤 서류를 준비해야 하나요?</H2>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <H3>공통 서류</H3>
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
              💡 수출바우처는 사업별로 신청 대상, 제출서류, 평가 방식이 달라질 수 있습니다.
              사업자등록증 등 기본 서류만 준비하기보다, 해당 공고문에서 요구하는 추가 증빙서류 목록을 별도로 확인해두는 것이 안전합니다.
            </InfoBox>
          </section>

          {/* 5. 선정기준 */}
          <section id="evaluation">
            <SectionLabel>평가 방식</SectionLabel>
            <H2>선정은 어떻게 되나요?</H2>
            <Prose>
              수출바우처는 신청만 하면 자동 선정되는 사업이 아닙니다. 트랙에 따라 평가 방식은
              다르지만, 공통적으로 <strong>수출규모, 매출규모, 사업분야, 바우처 활용계획</strong>
              등이 종합 평가됩니다.
            </Prose>

            <div className="mt-6 grid sm:grid-cols-2 gap-5">
              {[
                {
                  badge: '중기부 트랙',
                  color: 'bg-[#0b1b35]',
                  items: [
                    '요건검토 — 기본 서류 확인',
                    '서면평가 — 수출규모, 매출규모, 사업분야 등 종합 평가',
                    '일부 차수: 현장평가 대상 선정',
                  ],
                },
                {
                  badge: '산업부/KOTRA 트랙',
                  color: 'bg-[#162d52]',
                  items: [
                    '1차 서류 심사 — 계량 평가',
                    '2차 면접 — 비계량 평가',
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
              역량, 바우처 활용계획</strong>이 설득력 있게 담겨야 합니다.
            </Prose>
          </section>

          {/* 6. FAQ */}
          <section id="faq">
            <SectionLabel>자주 묻는 질문</SectionLabel>
            <H2>FAQ</H2>

            {/* 그룹 1: 신청 전 */}
            <p className="text-[13px] font-bold text-[#99a1af] uppercase tracking-[1px] mb-3">신청 전</p>
            <div className="flex flex-col gap-3 mb-8">
              {[
                {
                  q: '수출실적이 없어도 신청 가능한가요?',
                  a: '일부 공고는 내수기업 또는 전년도 수출액 1,000불 미만 구간을 별도로 두고 있습니다. "수출실적이 없으면 무조건 불가"가 아니므로, 차수별 공고에서 해당 구간 신청 가능 여부를 직접 확인하세요.',
                },
                {
                  q: '작년에 선정된 기업도 다시 신청할 수 있나요?',
                  a: '협약기간이 종료되지 않은 참여기업은 협약기간 내 모집 사업에 중복 참여할 수 없습니다. 협약기간이 끝났다면 재신청 가능하며, 차수별 예외조건이 있을 수 있으니 공고를 확인하세요.',
                },
              ].map(({ q, a }) => (
                <details key={q} className="group border border-[#e8eef5] rounded-xl overflow-hidden">
                  <summary className="cursor-pointer flex items-start justify-between gap-4 px-6 py-5 text-[16px] font-bold text-[#0b1b35] list-none hover:bg-[#f8f9fb] transition-colors">
                    <span>{q}</span>
                    <span className="shrink-0 mt-1 w-5 h-5 rounded-full border border-[#cad5e2] flex items-center justify-center text-[12px] text-[#314158] group-open:rotate-180 transition-transform">▾</span>
                  </summary>
                  <div className="px-6 pb-5 pt-2 text-[15px] text-[#314158] leading-[1.75]">{a}</div>
                </details>
              ))}
            </div>

            {/* 그룹 2: 바우처 활용 */}
            <p className="text-[13px] font-bold text-[#99a1af] uppercase tracking-[1px] mb-3">바우처 활용</p>
            <div className="flex flex-col gap-3 mb-8">
              {[
                {
                  q: '전시회 참가도 수출바우처로 가능한가요?',
                  a: '가능합니다. 공식 서비스 메뉴판에 "전시회/행사/해외영업지원" 대분류가 포함되어 있습니다. 해외전시회 개별참가, CES·MWC 같은 주요 전시회도 이 메뉴에 해당합니다. 단, 타 기관에서 동일 전시회 비용을 지원받은 경우 중복 정산은 불가합니다.',
                },
                {
                  q: '사용계획서는 나중에 수정할 수 있나요?',
                  a: '세부 내용은 사업종료일까지 수정 가능하지만, 변경 전 운영기관 담당자와 사전 공유 및 승인이 필요합니다. 최초 제출 이후 바우처 총액 자체는 수정할 수 없습니다.',
                },
                {
                  q: '정산은 어떻게 진행되나요?',
                  a: '서비스가 완료되면 수행기관이 운영기관에 정산을 신청합니다. 기업은 만족도 조사를 등록하면 절차가 진행되고, 운영기관 검토 후 수행기관에 대금이 지급됩니다. 부가세(10%)는 바우처로 지원되지 않아 기업이 수행기관에 별도로 납부해야 합니다. 서비스 완료 후 1개월 이내 정산 신청이 이루어져야 하며, 기간을 넘기면 거절될 수 있습니다.',
                },
              ].map(({ q, a }) => (
                <details key={q} className="group border border-[#e8eef5] rounded-xl overflow-hidden">
                  <summary className="cursor-pointer flex items-start justify-between gap-4 px-6 py-5 text-[16px] font-bold text-[#0b1b35] list-none hover:bg-[#f8f9fb] transition-colors">
                    <span>{q}</span>
                    <span className="shrink-0 mt-1 w-5 h-5 rounded-full border border-[#cad5e2] flex items-center justify-center text-[12px] text-[#314158] group-open:rotate-180 transition-transform">▾</span>
                  </summary>
                  <div className="px-6 pb-5 pt-2 text-[15px] text-[#314158] leading-[1.75]">{a}</div>
                </details>
              ))}
            </div>
          </section>

          {/* 8. 공식 참고자료 */}
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

      {/* ── Bottom CTA ────────────────────────────────────────────────── */}
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
