export interface FaqItem {
  question: string
  answer: string
  link?: { text: string; url: string }
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: '수출바우처 사업 어떻게 지원하나요?',
    answer:
      '수출바우처는 주관 기관 / 지원 대상 / 지원 기간이 다양하게 열리는 사업으로, 수출바우처 홈페이지의 공고문을 통해 신청 가능합니다.',
    link: {
      text: '수출바우처 홈페이지(링크)',
      url: 'https://www.exportvoucher.com/portal/sample/main',
    },
  },
  {
    question: '수출바우처 올해까지 소진 필요한데 가능한가요?',
    answer:
      '네, 가능합니다. 수출바우처 홈페이지 내 엠와이소셜컴퍼니 메뉴 링크를 이용해주세요.',
    link: {
      text: '엠와이소셜컴퍼니(링크)',
      url: 'https://www.exportvoucher.com/portal/peform/peformDetail?pageNo=1&peformOrgApplySeq=5261&active_menu_cd=EZ004005000&s_ord_type=&s_kor_comp_nm=%EC%97%A0%EC%99%80%EC%9D%B4&s_up_svc_seq=&s_svc_seq=&pageUnit=10',
    },
  },
  {
    question: '선정되는 경우 언제부터 비용 사용이 가능한가요?',
    answer:
      '선정되시는 사업 종류에 따라 상이하나 보통 선정 후 1년간 사용하는 구조입니다.',
  },
  {
    question: '소셜임팩트 기반 수출패키지를 제공하실 계획도 있나요?',
    answer:
      '네, MYSC의 ESG 컨설팅 등 유관 서비스도 차차 메뉴로 오픈될 예정입니다.',
  },
  {
    question: '수출바우처 선정에 연차 제한이 있나요?',
    answer:
      '수출바우처는 스타트업만을 대상으로 하는 사업이 아니기 때문에 SME들도 참여 가능합니다.',
  },
  {
    question: 'MYSC는 언제까지 수출바우처 서비스 제공 예정이신가요?',
    answer:
      '현재 기준 25-27년 바우처 서비스 제공 기업이며 연장 예정에 있습니다.',
  },
]
