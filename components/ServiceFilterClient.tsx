'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import type { Service } from '@/types/service'
import {
  COUNTRY_OPTIONS,
  SUPPORT_TYPE_OPTIONS,
  INDUSTRY_OPTIONS,
  SUPPORT_TYPE_DESCRIPTIONS,
  normalizeSupportType,
} from '@/lib/filter-config'
import ServiceCard from './ServiceCard'
import ServiceDrawer from './ServiceDrawer'
import { openTallyGeneral } from '@/lib/tally'

interface ServiceFilterClientProps {
  services: Service[]
}

function matchesCountry(service: Service, selected: string[]): boolean {
  if (selected.length === 0) return true
  const matchSet = new Set([...selected, '전체 국가'])
  return service.countries.some((c) => matchSet.has(c.trim()))
}

function matchesSupportType(service: Service, selected: string[]): boolean {
  if (selected.length === 0) return true
  const normalizedSelected = selected.map(normalizeSupportType)
  return service.support_types.some((t) =>
    normalizedSelected.includes(normalizeSupportType(t))
  )
}

function matchesIndustry(service: Service, selected: string[]): boolean {
  if (selected.length === 0) return true
  const targetTags: string[] = INDUSTRY_OPTIONS
    .filter((o) => selected.includes(o.label))
    .flatMap((o) => [...o.tags])
  return service.industry_tags.some((t) => targetTags.includes(t))
}

export default function ServiceFilterClient({ services }: ServiceFilterClientProps) {
  const searchParams = useSearchParams()

  const [selectedCountries, setSelectedCountries] = useState<string[]>(() => {
    const param = searchParams.get('country')
    if (param && (COUNTRY_OPTIONS as readonly string[]).includes(param)) return [param]
    return []
  })
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([])
  const [selectedSupportTypes, setSelectedSupportTypes] = useState<string[]>([])
  const [drawerService, setDrawerService] = useState<Service | null>(null)

  useEffect(() => {
    const param = searchParams.get('country')
    if (param && (COUNTRY_OPTIONS as readonly string[]).includes(param)) {
      setSelectedCountries([param])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleCountry = (v: string) =>
    setSelectedCountries((p) => p.includes(v) ? p.filter((c) => c !== v) : [...p, v])
  const toggleIndustry = (v: string) =>
    setSelectedIndustries((p) => p.includes(v) ? p.filter((i) => i !== v) : [...p, v])
  const toggleSupportType = (v: string) =>
    setSelectedSupportTypes((p) => p.includes(v) ? p.filter((t) => t !== v) : [...p, v])

  const resetAll = () => {
    setSelectedCountries([])
    setSelectedIndustries([])
    setSelectedSupportTypes([])
  }

  const anyFilterActive =
    selectedCountries.length > 0 ||
    selectedIndustries.length > 0 ||
    selectedSupportTypes.length > 0

  const filtered = useMemo(
    () =>
      services.filter(
        (s) =>
          matchesCountry(s, selectedCountries) &&
          matchesIndustry(s, selectedIndustries) &&
          matchesSupportType(s, selectedSupportTypes)
      ),
    [services, selectedCountries, selectedIndustries, selectedSupportTypes]
  )

  const activeDescriptions = selectedSupportTypes
    .map((v) => ({ value: v, desc: SUPPORT_TYPE_DESCRIPTIONS[v] }))
    .filter((d) => Boolean(d.desc))

  const chipClass = (active: boolean) =>
    `cursor-pointer h-10 px-6 rounded-full text-[14px] font-medium transition-all whitespace-nowrap ${
      active
        ? 'bg-[#33c3ff] text-white shadow-[0px_4px_3px_rgba(0,0,0,0.1),0px_2px_2px_rgba(0,0,0,0.1)]'
        : 'bg-white text-[#314158] shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] hover:shadow-[0px_2px_4px_rgba(0,0,0,0.12)] hover:bg-[#f0f9ff]'
    }`

  return (
    <>
      <section className="bg-[#f8f9fb] border-b border-[#e8eef5]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 xl:px-12 pt-10 pb-8">

          {/* 선정기업 안내 배너 */}
          <div className="flex items-center justify-between gap-4 bg-[#eef6fc] border border-[#c8e4f5] rounded-xl px-5 py-3 mb-8">
            <p className="text-[14px] font-medium text-[#2d6a94] leading-[1.6]">
              이 페이지는 <span className="font-semibold">수출바우처 선정기업</span>을 위한 서비스 목록입니다.
            </p>
            <Link
              href="/guide"
              className="shrink-0 text-[13px] font-semibold text-[#33c3ff] hover:text-[#1ab0ed] transition-colors whitespace-nowrap"
            >
              아직 신청 전이라면 → 신청방법 안내
            </Link>
          </div>

          <div className="flex flex-col gap-8">

            {/* 1. 국가/권역 */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-[18px] font-bold text-[#0b1b35] leading-7">관심 국가/권역</h2>
                {selectedCountries.length > 0 && (
                  <button onClick={() => setSelectedCountries([])} className="cursor-pointer text-[13px] font-medium text-[#99a1af] hover:text-[#314158] underline underline-offset-2 transition-colors">
                    국가/권역 선택 초기화
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                {COUNTRY_OPTIONS.map((c) => (
                  <button key={c} onClick={() => toggleCountry(c)} className={chipClass(selectedCountries.includes(c))}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. 산업 분야 */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-[18px] font-bold text-[#0b1b35] leading-7">산업 분야</h2>
                {selectedIndustries.length > 0 && (
                  <button onClick={() => setSelectedIndustries([])} className="cursor-pointer text-[13px] font-medium text-[#99a1af] hover:text-[#314158] underline underline-offset-2 transition-colors">
                    산업 선택 초기화
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                {INDUSTRY_OPTIONS.map(({ label }) => (
                  <button key={label} onClick={() => toggleIndustry(label)} className={chipClass(selectedIndustries.includes(label))}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. 지원유형 + 설명 인라인 */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-[18px] font-bold text-[#0b1b35] leading-7">필요한 지원유형</h2>
                {selectedSupportTypes.length > 0 && (
                  <button onClick={() => setSelectedSupportTypes([])} className="cursor-pointer text-[13px] font-medium text-[#99a1af] hover:text-[#314158] underline underline-offset-2 transition-colors">
                    지원유형 선택 초기화
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                {SUPPORT_TYPE_OPTIONS.map(({ label, value }) => (
                  <button key={value} onClick={() => toggleSupportType(value)} className={chipClass(selectedSupportTypes.includes(value))}>
                    {label}
                  </button>
                ))}
              </div>
              {activeDescriptions.length > 0 && (
                <div className="flex flex-col gap-1">
                  {activeDescriptions.map(({ value, desc }) => (
                    <p key={value} className="text-[14px] font-medium text-[#4a7fa8] leading-[1.6]">
                      <span className="font-semibold text-[#2d6a94]">{value}</span>
                      {'  '}{desc}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* 결과 + 초기화 */}
            <div className="flex items-center justify-between border-t border-[#e8eef5] pt-6">
              <div className="flex items-center gap-4">
                <p className="text-[16px] font-bold text-[#314158]">
                  총 {filtered.length}개의 서비스를 확인할 수 있습니다.
                </p>
                {anyFilterActive && (
                  <button onClick={resetAll} className="cursor-pointer h-9 px-5 rounded-full bg-white text-[14px] font-medium text-[#314158] shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] hover:shadow-[0px_2px_4px_rgba(0,0,0,0.12)] transition-shadow">
                    필터 초기화
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 xl:px-12 py-16">
          {services.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[16px] font-medium text-[#99a1af]">서비스 정보를 불러오지 못했습니다.</p>
              <p className="text-[14px] text-[#99a1af] mt-2">잠시 후 다시 시도해주세요.</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[16px] font-medium text-[#314158]">조건에 맞는 서비스가 없습니다.</p>
              <p className="text-[14px] text-[#99a1af] mt-2">선택한 필터를 다시 조정해보세요.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((service) => (
                <ServiceCard
                  key={service.service_id || service.service_name}
                  service={service}
                  onOpenDrawer={() => setDrawerService(service)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#0b1b35]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 xl:px-12 py-24 flex flex-col items-center gap-5 text-center">
          <h2 className="text-[36px] font-bold text-white leading-[1.3] tracking-[-1.5px]">
            어떤 서비스를 선택해야 할지 고민되시나요?
          </h2>
          <p className="text-[18px] font-medium text-[#cad5e2] leading-[1.75] tracking-[-0.45px] max-w-[520px]">
            기업의 진출 국가·산업·준비 상황에 맞춰
            <br />
            활용 가능한 수출바우처 서비스를 함께 검토해드립니다.
          </p>
          <p className="text-[16px] font-medium text-[#cad5e2] leading-[1.75] max-w-[580px]">
            문의 시 보유 바우처 정보, 관심 국가, 현재 준비 상황 등을 함께 남겨주시면 더 정확한 안내가 가능합니다.
          </p>
          <button
            onClick={() => openTallyGeneral('service_finder_bottom_cta')}
            className="cursor-pointer mt-2 h-[60px] px-12 rounded-full bg-[#33c3ff] text-white text-[18px] font-bold tracking-[-0.45px] hover:bg-[#1ab0ed] transition-colors"
          >
            상담 문의하기
          </button>
        </div>
      </section>

      <ServiceDrawer service={drawerService} onClose={() => setDrawerService(null)} />
    </>
  )
}
