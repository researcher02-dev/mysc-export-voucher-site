'use client'

import { useState, useMemo } from 'react'
import type { Service } from '@/types/service'
import {
  COUNTRY_OPTIONS,
  SUPPORT_TYPE_OPTIONS,
  normalizeSupportType,
} from '@/lib/filter-config'
import ServiceCard from './ServiceCard'
import ServiceDrawer from './ServiceDrawer'
import { openTallyGeneral } from '@/lib/tally'

interface ServiceFilterClientProps {
  services: Service[]
}

// ── Filtering helpers ─────────────────────────────────────────────────────────

function matchesCountry(service: Service, selected: string[]): boolean {
  if (selected.length === 0) return true
  // Always include "전체 국가"-tagged services when any country filter is active
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

// ── Component ─────────────────────────────────────────────────────────────────

export default function ServiceFilterClient({
  services,
}: ServiceFilterClientProps) {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedSupportTypes, setSelectedSupportTypes] = useState<string[]>([])
  const [drawerService, setDrawerService] = useState<Service | null>(null)

  // Toggle a country chip
  const toggleCountry = (country: string) => {
    setSelectedCountries((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country]
    )
  }

  // Toggle a support type chip
  const toggleSupportType = (value: string) => {
    setSelectedSupportTypes((prev) =>
      prev.includes(value)
        ? prev.filter((t) => t !== value)
        : [...prev, value]
    )
  }

  const resetCountries = () => setSelectedCountries([])
  const resetSupportTypes = () => setSelectedSupportTypes([])
  const resetAll = () => {
    setSelectedCountries([])
    setSelectedSupportTypes([])
  }

  const anyFilterActive =
    selectedCountries.length > 0 || selectedSupportTypes.length > 0

  // Filtered services
  const filtered = useMemo(
    () =>
      services.filter(
        (s) =>
          matchesCountry(s, selectedCountries) &&
          matchesSupportType(s, selectedSupportTypes)
      ),
    [services, selectedCountries, selectedSupportTypes]
  )

  return (
    <>
      {/* ── Filter section ───────────────────────────────────────────────── */}
      <section className="bg-[#f8f9fb] border-b border-[#e8eef5]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 xl:px-12 pt-12 pb-8">
          <div className="flex flex-col gap-8">

            {/* Country / region filter */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-[18px] font-bold text-[#0b1b35] leading-7">
                  관심 국가/권역
                </h2>
                {selectedCountries.length > 0 && (
                  <button
                    onClick={resetCountries}
                    className="cursor-pointer text-[13px] font-medium text-[#99a1af] hover:text-[#314158] underline underline-offset-2 transition-colors"
                  >
                    국가/권역 선택 초기화
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                {COUNTRY_OPTIONS.map((country) => {
                  const active = selectedCountries.includes(country)
                  return (
                    <button
                      key={country}
                      onClick={() => toggleCountry(country)}
                      className={`cursor-pointer h-10 px-6 rounded-full text-[14px] font-medium transition-all whitespace-nowrap ${
                        active
                          ? 'bg-[#33c3ff] text-white shadow-[0px_4px_3px_rgba(0,0,0,0.1),0px_2px_2px_rgba(0,0,0,0.1)]'
                          : 'bg-white text-[#314158] shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] hover:shadow-[0px_2px_4px_rgba(0,0,0,0.12)] hover:bg-[#f0f9ff]'
                      }`}
                    >
                      {country}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Support type filter */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-[18px] font-bold text-[#0b1b35] leading-7">
                  필요한 지원유형
                </h2>
                {selectedSupportTypes.length > 0 && (
                  <button
                    onClick={resetSupportTypes}
                    className="cursor-pointer text-[13px] font-medium text-[#99a1af] hover:text-[#314158] underline underline-offset-2 transition-colors"
                  >
                    지원유형 선택 초기화
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                {SUPPORT_TYPE_OPTIONS.map(({ label, value }) => {
                  const active = selectedSupportTypes.includes(value)
                  return (
                    <button
                      key={value}
                      onClick={() => toggleSupportType(value)}
                      className={`cursor-pointer h-10 px-6 rounded-full text-[14px] font-medium transition-all whitespace-nowrap ${
                        active
                          ? 'bg-[#33c3ff] text-white shadow-[0px_4px_3px_rgba(0,0,0,0.1),0px_2px_2px_rgba(0,0,0,0.1)]'
                          : 'bg-white text-[#314158] shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] hover:shadow-[0px_2px_4px_rgba(0,0,0,0.12)] hover:bg-[#f0f9ff]'
                      }`}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Result count + reset row */}
            <div className="flex items-center justify-between border-t border-[#e8eef5] pt-6">
              <div className="flex items-center gap-4">
                <p className="text-[16px] font-bold text-[#314158]">
                  총 {filtered.length}개의 서비스를 확인할 수 있습니다.
                </p>
                {anyFilterActive && (
                  <button
                    onClick={resetAll}
                    className="cursor-pointer h-9 px-5 rounded-full bg-white text-[14px] font-medium text-[#314158] shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] hover:shadow-[0px_2px_4px_rgba(0,0,0,0.12)] transition-shadow"
                  >
                    필터 초기화
                  </button>
                )}
              </div>

              <a
                href="/diagnosis"
                className="cursor-pointer h-10 px-6 rounded-full bg-[#0b1b35] text-white text-[14px] font-bold flex items-center gap-2 hover:bg-[#162d52] transition-colors whitespace-nowrap"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Z" fill="currentColor"/>
                  <path d="M8 4.5a.75.75 0 0 1 .75.75v3.69l2.28 2.28a.75.75 0 1 1-1.06 1.06L7.47 9.78A.75.75 0 0 1 7.25 9V5.25A.75.75 0 0 1 8 4.5Z" fill="currentColor"/>
                </svg>
                내 메뉴 찾기
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Service card grid ────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 xl:px-12 py-16">
          {services.length === 0 ? (
            /* Initial empty — likely a data error */
            <div className="text-center py-20">
              <p className="text-[16px] font-medium text-[#99a1af]">
                서비스 정보를 불러오지 못했습니다.
              </p>
              <p className="text-[14px] text-[#99a1af] mt-2">
                잠시 후 다시 시도해주세요.
              </p>
            </div>
          ) : filtered.length === 0 ? (
            /* Filter-induced empty */
            <div className="text-center py-20">
              <p className="text-[16px] font-medium text-[#314158]">
                조건에 맞는 서비스가 없습니다.
              </p>
              <p className="text-[14px] text-[#99a1af] mt-2">
                선택한 국가나 지원유형을 다시 조정해보세요.
              </p>
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

      {/* ── Bottom consultation CTA ──────────────────────────────────────── */}
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

      {/* ── Service detail drawer ────────────────────────────────────────── */}
      <ServiceDrawer
        service={drawerService}
        onClose={() => setDrawerService(null)}
      />
    </>
  )
}
