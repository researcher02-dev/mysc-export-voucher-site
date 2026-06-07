'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Service } from '@/types/service'
import ServiceCard from '@/components/ServiceCard'
import ServiceDrawer from '@/components/ServiceDrawer'
import { openTally } from '@/lib/tally'

// ── 추천 이유 맵 ────────────────────────────────────────────────────────────
const REASON_MAP: Record<string, string> = {
  svc_001: '미국 기후테크 VC·임팩트 투자자 네트워크와 연결합니다.',
  svc_002: '독일 현지 F&B 바이어 초청 상담을 지원합니다.',
  svc_003: '독일·EU F&B 규제·수요·소비자 반응을 단계별로 검증합니다.',
  svc_004: '전시회 전 타깃 바이어 초청과 사후 팔로업을 지원합니다.',
  svc_005: '현지 시장 맞춤 부스 비주얼과 브랜드 자산을 제작합니다.',
  svc_006: '목표 시장 트렌드·경쟁·가격 기반 상품 전략을 제안합니다.',
  svc_007: '사전 바이어 컨택부터 현장 운영, 사후 팔로업까지 지원합니다.',
  svc_008: '타깃 파트너 100건 발굴과 콜드컨택 실행을 대행합니다.',
  svc_009: '미국 전문가 패널과 바이어 네트워크로 파트너를 연결합니다.',
  svc_010: '싱가포르 현지 파트너 발굴과 첫 비즈니스 미팅을 지원합니다.',
  svc_011: '프랑스 현지 시연회로 소비자 반응과 가격 수용도를 검증합니다.',
  svc_012: '단독 브랜드 맞춤형 프랑스 시연회를 기획·운영합니다.',
  svc_013: 'CES·MWC 전시 전략 수립과 글로벌 미디어 노출을 지원합니다.',
  svc_014: '해외 시장 포지셔닝과 진입 전략을 함께 설계합니다.',
  svc_015: '미국 F&B·뷰티·라이프스타일 전시에서 현지 반응을 검증합니다.',
  svc_017: '프랑스 현지 바이어 소통과 거래선 관리를 전담 대행합니다.',
  svc_018: '프랑스 시장 기초조사와 잠재 바이어 발굴을 지원합니다.',
  svc_019: '유럽 주요 전시회 큐레이션과 참가 전 과정을 통합 지원합니다.',
}

// ── Q4 산업 매핑 ─────────────────────────────────────────────────────────────
const Q4_TAG_MAP: Record<string, string[]> = {
  '농림수산식품':   ['농림수산식품'],
  '소비재·패션':   ['섬유/패션', '생활소비재'],
  'IT·소프트웨어': ['IT', '전자/전기', '자동차/수송기기'],
  '환경·기후테크': ['환경'],
  '기타':          ['의료바이오', '문화콘텐츠', '관광/교육/서비스', '산업일반'],
}

// ── Q2 지원유형 매핑 ──────────────────────────────────────────────────────────
const Q2_NEED_MAP: Record<string, string | null> = {
  '국가미정':     null,
  '시장조사':     '시장조사·진출전략',
  '바이어':       '바이어·파트너 연결',
  '전시회':       '전시회 참가',
  '후속영업':     '후속 영업 관리',
}

// ── Q3 국가 매핑 ──────────────────────────────────────────────────────────────
const Q3_COUNTRY_MAP: Record<string, string[] | null> = {
  '미국':   ['미국'],
  '싱가포르': ['싱가포르'],
  '프랑스': ['프랑스'],
  '독일유럽': ['독일', '유럽'],
  '국가미정': null,  // 전체 대상
  '기타국가': 'END' as unknown as null, // 종료 케이스
}

// ── 질문 정의 ─────────────────────────────────────────────────────────────────
interface Option { label: string; value: string; emoji?: string }

const Q1_OPTIONS: Option[] = [
  { label: '네, 보유하고 있습니다', value: 'yes' },
  { label: '아니요, 없거나 신청 예정입니다', value: 'no' },
]

const Q2_OPTIONS: Option[] = [
  { label: '진출할 국가를 아직 정하지 못했습니다', value: '국가미정' },
  { label: '목표 시장의 수요·경쟁·규제를 파악하고 싶습니다', value: '시장조사' },
  { label: '현지 바이어 또는 파트너를 찾고 싶습니다', value: '바이어' },
  { label: '해외 전시회 참가를 준비하고 싶습니다', value: '전시회' },
  { label: '기존 해외 거래선을 유지·확대하고 싶습니다', value: '후속영업' },
]

const Q3_OPTIONS: Option[] = [
  { label: '미국', value: '미국', emoji: '🇺🇸' },
  { label: '싱가포르', value: '싱가포르', emoji: '🇸🇬' },
  { label: '프랑스', value: '프랑스', emoji: '🇫🇷' },
  { label: '독일 및 기타 유럽', value: '독일유럽', emoji: '🇩🇪' },
  { label: '아직 결정하지 못했습니다', value: '국가미정' },
  { label: '위 국가 외 다른 국가', value: '기타국가' },
]

const Q4_OPTIONS: Option[] = [
  { label: '농림수산식품', value: '농림수산식품' },
  { label: '소비재·패션', value: '소비재·패션' },
  { label: 'IT·소프트웨어', value: 'IT·소프트웨어' },
  { label: '환경·기후테크', value: '환경·기후테크' },
  { label: '기타', value: '기타' },
]

// ── 필터링 로직 ───────────────────────────────────────────────────────────────
function filterServices(
  services: Service[],
  q2: string,
  q3: string | null,
  q4: string
): Service[] {
  const needType = Q2_NEED_MAP[q2] ?? null
  const countryKeys = q3 ? (Q3_COUNTRY_MAP[q3] as string[] | null) : null
  const industryTags = Q4_TAG_MAP[q4] ?? []

  return services.filter((s) => {
    // 국가 매칭
    const countryMatch =
      !countryKeys ||
      s.countries.includes('전체 국가') ||
      s.countries.some((c) => countryKeys.some((k) => c.includes(k)))

    // 니즈 매칭
    const needMatch =
      !needType ||
      s.support_types.some((t) => t.replace(/[/·]/g, '_').toLowerCase() === needType.replace(/[/·]/g, '_').toLowerCase())

    // 산업 매칭: 산업일반은 항상 매칭
    const industryMatch =
      s.industry_tags.includes('산업일반') ||
      industryTags.some((tag) => s.industry_tags.includes(tag))

    return countryMatch && needMatch && industryMatch
  })
}

// ── 컴포넌트 ──────────────────────────────────────────────────────────────────
interface Props { services: Service[] }

type Step = 'q1' | 'q2' | 'q3' | 'q4' | 'result' | 'end-no-voucher' | 'end-other-country'

export default function DiagnosisClient({ services }: Props) {
  const router = useRouter()
  const [step, setStep] = useState<Step>('q1')
  const [answers, setAnswers] = useState<{ q2?: string; q3?: string | null; q4?: string }>({})
  const [results, setResults] = useState<Service[]>([])
  const [showAll, setShowAll] = useState(false)
  const [drawerService, setDrawerService] = useState<Service | null>(null)

  function handleQ1(value: string) {
    if (value === 'no') { setStep('end-no-voucher'); return }
    setStep('q2')
  }

  function handleQ2(value: string) {
    if (value === '국가미정') {
      // Q3를 건너뛰므로 이전에 입력된 q3 답변을 반드시 초기화
      setAnswers((a) => ({ ...a, q2: value, q3: undefined }))
      setStep('q4')
    } else {
      setAnswers((a) => ({ ...a, q2: value }))
      setStep('q3')
    }
  }

  function handleQ3(value: string) {
    if (value === '기타국가') { setAnswers((a) => ({ ...a, q3: value })); setStep('end-other-country'); return }
    setAnswers((a) => ({ ...a, q3: value }))
    setStep('q4')
  }

  function handleQ4(value: string) {
    const q2 = answers.q2 ?? '국가미정'
    const q3 = answers.q3 ?? null
    const matched = filterServices(services, q2, q3, value)
    const fallback = services.find((s) => s.service_id === 'svc_014')

    const final = matched.length > 0 ? matched : (fallback ? [fallback] : [])
    setAnswers((a) => ({ ...a, q4: value }))
    setResults(final)
    setShowAll(false)
    setStep('result')
  }

  function openConsultation() {
    openTally({
      source_page: 'diagnosis_result',
      diagnosis_q2: answers.q2 ?? '',
      diagnosis_q3: answers.q3 ?? '',
      diagnosis_q4: answers.q4 ?? '',
    })
  }

  function reset() {
    setStep('q1')
    setAnswers({})
    setResults([])
    setShowAll(false)
  }

  // ── 공통 레이아웃 ──────────────────────────────────────────────────────────
  const displayed = showAll ? results : results.slice(0, 3)

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* 상단 네비 영역 */}
      <div className="bg-white border-b border-[#e8eef5]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 xl:px-12 py-4 flex items-center gap-3">
          <button
            onClick={() => router.push('/services')}
            className="flex items-center gap-1.5 text-[14px] font-medium text-[#99a1af] hover:text-[#314158] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            전체 메뉴 보기
          </button>
          <span className="text-[#e8eef5]">/</span>
          <span className="text-[14px] font-medium text-[#0b1b35]">내 메뉴 찾기</span>
        </div>
      </div>

      <div className="max-w-[680px] mx-auto px-5 sm:px-10 py-16">

        {/* ── Q1 ─────────────────────────────────────────────────────── */}
        {step === 'q1' && (
          <QuestionCard
            step={1}
            total={4}
            question="수출바우처를 보유하고 계신가요?"
            options={Q1_OPTIONS}
            onSelect={handleQ1}
          />
        )}

        {/* ── Q2 ─────────────────────────────────────────────────────── */}
        {step === 'q2' && (
          <QuestionCard
            step={2}
            total={4}
            question="현재 가장 필요한 것이 무엇인가요?"
            options={Q2_OPTIONS}
            onSelect={handleQ2}
            onBack={() => setStep('q1')}
          />
        )}

        {/* ── Q3 ─────────────────────────────────────────────────────── */}
        {step === 'q3' && (
          <QuestionCard
            step={3}
            total={4}
            question="주요 목표 국가를 선택해 주세요."
            options={Q3_OPTIONS}
            onSelect={handleQ3}
            onBack={() => setStep('q2')}
          />
        )}

        {/* ── Q4 ─────────────────────────────────────────────────────── */}
        {step === 'q4' && (
          <QuestionCard
            step={4}
            total={4}
            question="주요 제품·서비스 카테고리를 선택해 주세요."
            options={Q4_OPTIONS}
            onSelect={handleQ4}
            onBack={() => setStep(answers.q2 === '국가미정' ? 'q2' : 'q3')}
          />
        )}

        {/* ── 종료: 바우처 없음 ──────────────────────────────────────── */}
        {step === 'end-no-voucher' && (
          <div className="flex flex-col items-center gap-8 text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#fff7e6] flex items-center justify-center text-3xl">📋</div>
            <div className="flex flex-col gap-3">
              <h2 className="text-[24px] font-bold text-[#0b1b35] leading-[1.4] tracking-[-0.5px]">
                수출바우처 신청부터 시작해보세요
              </h2>
              <p className="text-[15px] font-medium text-[#314158] leading-[1.75] max-w-[480px]">
                수출바우처는 중소·중견기업의 수출 활동을 지원하는 정부 사업입니다.
                신청 방법과 지원 조건을 먼저 확인해보세요.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
              <a
                href="https://notion.so" /* TODO: 노션 가이드 URL */
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 h-14 flex items-center justify-center rounded-full bg-[#33c3ff] text-white text-[15px] font-bold hover:bg-[#1ab0ed] transition-colors"
              >
                바우처 신청 가이드 보기
              </a>
              <button
                onClick={() => openTally({ source_page: 'diagnosis_no_voucher' })}
                className="flex-1 h-14 flex items-center justify-center rounded-full border border-[#0b1b35] text-[#0b1b35] text-[15px] font-medium hover:bg-[#0b1b35]/5 transition-colors"
              >
                상담 신청하기
              </button>
            </div>
            <button onClick={reset} className="text-[13px] text-[#99a1af] hover:text-[#314158] underline underline-offset-2 transition-colors">
              처음으로 돌아가기
            </button>
          </div>
        )}

        {/* ── 종료: 기타 국가 ────────────────────────────────────────── */}
        {step === 'end-other-country' && (
          <div className="flex flex-col items-center gap-8 text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#e8f0ff] flex items-center justify-center text-3xl">🌍</div>
            <div className="flex flex-col gap-3">
              <h2 className="text-[24px] font-bold text-[#0b1b35] leading-[1.4] tracking-[-0.5px]">
                맞춤 컨설팅으로 함께 전략을 세워드립니다
              </h2>
              <p className="text-[15px] font-medium text-[#314158] leading-[1.75] max-w-[480px]">
                현재 메뉴는 미국·싱가포르·프랑스·유럽 중심으로 구성되어 있습니다.
                다른 국가 진출은 Global GTM 컨설팅을 통해 전략을 맞춤 설계해드립니다.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
              <button
                onClick={() => openTally({ source_page: 'diagnosis_other_country' })}
                className="flex-1 h-14 flex items-center justify-center rounded-full bg-[#33c3ff] text-white text-[15px] font-bold hover:bg-[#1ab0ed] transition-colors"
              >
                상담 신청하기
              </button>
            </div>
            <button onClick={reset} className="text-[13px] text-[#99a1af] hover:text-[#314158] underline underline-offset-2 transition-colors">
              처음으로 돌아가기
            </button>
          </div>
        )}

        {/* ── 결과 ───────────────────────────────────────────────────── */}
        {step === 'result' && (
          <div className="flex flex-col gap-8">
            {/* 헤더 */}
            <div className="flex flex-col gap-2">
              <p className="text-[13px] font-bold text-[#33c3ff] tracking-[1.3px] uppercase">결과</p>
              <h2 className="text-[24px] font-bold text-[#0b1b35] leading-[1.4] tracking-[-0.5px]">
                선택하신 조건에 맞는 메뉴예요
              </h2>
              <p className="text-[14px] text-[#99a1af]">총 {results.length}개의 서비스를 찾았습니다.</p>
            </div>

            {/* 카드 */}
            <div className="flex flex-col gap-4">
              {displayed.map((service) => (
                <div key={service.service_id} className="flex flex-col gap-2">
                  {/* 추천 이유 */}
                  {REASON_MAP[service.service_id] && (
                    <div className="flex items-center gap-2 px-1">
                      <span className="text-[#33c3ff]">✦</span>
                      <p className="text-[13px] font-medium text-[#314158]">
                        {REASON_MAP[service.service_id]}
                      </p>
                    </div>
                  )}
                  <ServiceCard
                    service={service}
                    onOpenDrawer={() => setDrawerService(service)}
                  />
                </div>
              ))}
            </div>

            {/* 더 보기 */}
            {!showAll && results.length > 3 && (
              <button
                onClick={() => setShowAll(true)}
                className="w-full h-12 rounded-full border border-[#e8eef5] text-[14px] font-medium text-[#314158] hover:bg-white hover:border-[#cad5e2] transition-colors"
              >
                더 보기 ({results.length - 3}개 더)
              </button>
            )}

            {/* 하단 CTA */}
            <div className="flex flex-col items-center gap-4 pt-4 border-t border-[#e8eef5] text-center">
              <p className="text-[14px] font-medium text-[#314158]">
                원하는 메뉴를 찾지 못했나요?
              </p>
              <button
                onClick={openConsultation}
                className="h-12 px-8 rounded-full bg-[#0b1b35] text-white text-[15px] font-bold hover:bg-[#162d52] transition-colors"
              >
                상담 신청하기
              </button>
            </div>

            <button onClick={reset} className="text-center text-[13px] text-[#99a1af] hover:text-[#314158] underline underline-offset-2 transition-colors">
              처음으로 돌아가기
            </button>
          </div>
        )}
      </div>

      {/* Drawer */}
      <ServiceDrawer
        service={drawerService}
        onClose={() => setDrawerService(null)}
      />
    </div>
  )
}

// ── QuestionCard ──────────────────────────────────────────────────────────────
interface QuestionCardProps {
  step: number
  total: number
  question: string
  options: Option[]
  onSelect: (value: string) => void
  onBack?: () => void
}

function QuestionCard({ step, total, question, options, onSelect, onBack }: QuestionCardProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* 진행 표시 */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-bold text-[#33c3ff] tracking-[1.3px] uppercase">
            Q{step} / {total}
          </span>
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-1 text-[13px] font-medium text-[#99a1af] hover:text-[#314158] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              이전
            </button>
          )}
        </div>
        {/* 프로그레스 바 */}
        <div className="w-full h-1.5 bg-[#e8eef5] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#33c3ff] rounded-full transition-all duration-300"
            style={{ width: `${(step / total) * 100}%` }}
          />
        </div>
      </div>

      {/* 질문 */}
      <h2 className="text-[22px] font-bold text-[#0b1b35] leading-[1.45] tracking-[-0.5px]">
        {question}
      </h2>

      {/* 선택지 */}
      <div className="flex flex-col gap-3">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className="w-full text-left px-6 py-4 rounded-2xl bg-white border border-[#e8eef5] text-[15px] font-medium text-[#314158] hover:border-[#33c3ff] hover:bg-[#f0fbff] hover:text-[#0b1b35] transition-all shadow-[0px_1px_1.5px_rgba(0,0,0,0.06)] flex items-center gap-3"
          >
            {opt.emoji && <span className="text-xl leading-none">{opt.emoji}</span>}
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
