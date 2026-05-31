export const COUNTRY_OPTIONS = [
  '미국',
  '프랑스',
  '독일',
  '일본',
  '싱가포르',
  '유럽',
  '전체 국가',
] as const

export const SUPPORT_TYPE_OPTIONS = [
  { label: '시장조사·진출전략', value: '시장조사·진출전략' },
  { label: '현지 테스트·판촉', value: '현지 테스트·판촉' },
  { label: '전시회 참가', value: '전시회 참가' },
  { label: '바이어·파트너 연결', value: '바이어·파트너 연결' },
  { label: '후속 영업 관리', value: '후속 영업 관리' },
] as const

export type CountryOption = (typeof COUNTRY_OPTIONS)[number]
export type SupportTypeValue = (typeof SUPPORT_TYPE_OPTIONS)[number]['value']

/** Normalize support type for comparison — treat / and · as equivalent */
export function normalizeSupportType(val: string): string {
  return val.replace(/[/·]/g, '_').trim().toLowerCase()
}
