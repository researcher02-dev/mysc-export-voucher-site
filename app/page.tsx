import { fetchServices, getHighlightedServices } from '@/lib/csv'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/landing/HeroSection'
import AboutSection from '@/components/landing/AboutSection'
import CurriculumSection from '@/components/landing/CurriculumSection'
import HighlightCarousel from '@/components/landing/HighlightCarousel'
import ProcessSection from '@/components/landing/ProcessSection'
import FaqSection from '@/components/landing/FaqSection'
import LandingCtaSection from '@/components/landing/LandingCtaSection'

export const revalidate = 300 // 5-minute ISR

export default async function HomePage() {
  const allServices = await fetchServices()
  const highlightedServices = getHighlightedServices(allServices)

  return (
    <div className="flex flex-col min-h-screen">
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
