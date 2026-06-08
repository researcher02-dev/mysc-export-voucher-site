import { Suspense } from 'react'
import { fetchServices, getVisibleServices } from '@/lib/csv'
import Navbar from '@/components/Navbar'
import ServiceFilterClient from '@/components/ServiceFilterClient'

export const revalidate = 300

export default async function ServicesPage() {
  const allServices = await fetchServices()
  const visibleServices = getVisibleServices(allServices)

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        <section className="bg-[#0b1b35] w-full">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-10 xl:px-12 pt-[94px] pb-28">
            <h1 className="text-[36px] font-black text-white leading-[1.4] tracking-[-1.5px] mb-5">
              수출바우처로 활용 가능한{' '}
              <span className="text-[#33c3ff]">MYSC 서비스 목록</span>
              입니다.
            </h1>
            <p className="text-[18px] font-medium text-[#cad5e2] leading-[1.75] tracking-[-0.45px]">
              국가·산업·지원유형으로 필터링해 우리 기업에 맞는 서비스를 찾아보세요.
            </p>
          </div>
        </section>

        <Suspense fallback={null}>
          <ServiceFilterClient services={visibleServices} />
        </Suspense>
      </main>
    </div>
  )
}
