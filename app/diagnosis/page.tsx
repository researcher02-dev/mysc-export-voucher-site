import { fetchServices, getVisibleServices } from '@/lib/csv'
import DiagnosisClient from './DiagnosisClient'

export default async function DiagnosisPage() {
  const all = await fetchServices()
  const services = getVisibleServices(all)
  return <DiagnosisClient services={services} />
}
