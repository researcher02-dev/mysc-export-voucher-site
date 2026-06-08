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

export const INDUSTRY_OPTIONS = [
  { label: '농림수산식품', tags: ['농림수산식품'] },
  { label: '소비재·패션', tags: ['섬유/패션', '생활소비재'] },
  { label: 'IT·소프트웨어', tags: ['IT', '전자/전기', '자동차/수송기기'] },
  { label: '환경·기후테크', tags: ['환경'] },
  { label: '기타', tags: ['의료바이오', '문화콘텐츠', '관광/교육/서비스', '산업일반'] },
] as const

export const SUPPORT_TYPE_DESCRIPTIONS: Record<string, string> = {
  '시장조사·진출전략': '목표 시장의 수요·경쟁·규제를 분석하고, 시장 진입을 위한 전략을 수립합니다.',
  '현지 테스트·판촉': '현지 상권·행사장에서 소비자·바이어를 대상으로 제품을 시연하고, 현장 반응을 수집합니다.',
  '전시회 참가': '공식 해외 전시회에 참가해 브랜드를 노출하고, 바이어 미팅 기회를 확보합니다.',
  '바이어·파트너 연결': '타겟 바이어·파트너를 발굴하고, 초기 콘택부터 미팅까지 연결합니다.',
  '후속 영업 관리': '발굴된 바이어와의 관계를 지속·확대할 수 있도록 커뮤니케이션과 팔로업을 지원합니다.',
}

export type CountryOption = (typeof COUNTRY_OPTIONS)[number]
export type SupportTypeValue = (typeof SUPPORT_TYPE_OPTIONS)[number]['value']
export type IndustryLabel = (typeof INDUSTRY_OPTIONS)[number]['label']

/** Normalize support type for comparison — treat / and · as equivalent */
export function normalizeSupportType(val: string): string {
  return val.replace(/[/·]/g, '_').trim().toLowerCase()
}
