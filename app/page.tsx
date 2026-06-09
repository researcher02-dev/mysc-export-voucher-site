import type { Metadata } from 'next'
import { fetchServices, getHighlightedServices } from '@/lib/csv'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/landing/HeroSection'
import AboutSection from '@/components/landing/AboutSection'
import CurriculumSection from '@/components/landing/CurriculumSection'
import HighlightCarousel from '@/components/landing/HighlightCarousel'
import ProcessSection from '@/components/landing/ProcessSection'
import FaqSection from '@/components/landing/FaqSection'
import LandingCtaSection from '@/components/landing/LandingCtaSection'


export const metadata: Metadata = {
  title: '수출바우처 전시회·시장조사·해외영업 서비스 | MYSC 글로벌센터',
  description:
    'MYSC 글로벌센터는 수출바우처 수행기관으로, 시장조사·컨설팅·전시회 참가·바이어 발굴 서비스를 제공합니다. 미국·프랑스·독일·싱가포르 진출을 지원합니다.',
  openGraph: {
    title: '수출바우처 전시회·시장조사·해외영업 서비스 | MYSC 글로벌센터',
    description:
      'MYSC 글로벌센터는 수출바우처 수행기관으로, 시장조사·컨설팅·전시회 참가·바이어 발굴 서비스를 제공합니다.',
    type: 'website',
  },
}

export const revalidate = 300 // 5-minute ISR


const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'MYSC 글로벌센터',
  alternateName: '엠와이소셜컴퍼니 글로벌센터',
  url: 'https://mysc-export-voucher-site.vercel.app',
  description: '수출바우처 수행기관. 시장조사·컨설팅·전시회 참가·바이어 발굴·해외영업 지원 서비스 제공.',
  areaServed: ['미국', '프랑스', '독일', '싱가포르'],
  serviceType: '수출바우처 수행기관',
}

export default async function HomePage() {
  const allServices = await fetchServices()
  const highlightedServices = getHighlightedServices(allServices)

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
            <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <CurriculumSection />
        <HighlightCarousel services={highlightedServices} />
        <ProcessSection />
        <FaqSection />
        <LandingCtaSection />
      </main>
    </div>
  )
}
