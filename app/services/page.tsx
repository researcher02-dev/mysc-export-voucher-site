import { fetchServices, getVisibleServices } from '@/lib/csv'
import Navbar from '@/components/Navbar'
import ServiceFilterClient from '@/components/ServiceFilterClient'

export const revalidate = 300 // 5-minute ISR

export default async function ServicesPage() {
  const allServices = await fetchServices()
  const visibleServices = getVisibleServices(allServices)

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* ── Hero header ───────────────────────────────────────────────── */}
        <section className="bg-[#0b1b35] w-full">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-10 xl:px-12 pt-[94px] pb-28">
            <h1 className="text-[36px] font-black text-white leading-[1.5] tracking-[-1.5px] mb-5">
              우리 기업에 맞는 수출바우처 서비스를 찾아보세요.
            </h1>
            <p className="text-[18px] font-medium text-[#cad5e2] leading-[1.75] tracking-[-0.45px] mb-2">
              관심 국가와 필요한 지원유형을 선택해 활용 가능한 글로벌 진출 서비스를 확인할 수 있습니다.
            </p>
            <p className="text-[16px] font-medium text-[#cad5e2]/70 leading-[1.625]">
              아직 진출 국가가 정해지지 않았다면 &apos;전체&apos;로 두고, 필요한 지원유형부터 선택해보세요.
            </p>
          </div>
        </section>

        {/* ── Filters + Cards + CTA (client) ────────────────────────────── */}
        <ServiceFilterClient services={visibleServices} />
      </main>
    </div>
  )
}
