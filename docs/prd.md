# PRD: MYSC 수출바우처 안내페이지 MVP

## 1. 프로젝트 개요

본 프로젝트는 MYSC 글로벌센터의 수출바우처 서비스 안내 및 탐색을 위한 MVP 웹페이지입니다.

수출바우처 선정 기업 또는 해외 진출을 준비하는 스타트업이 관심 국가와 필요한 지원유형을 기준으로 MYSC의 활용 가능한 서비스를 탐색하고, 필요한 경우 상담 문의로 연결될 수 있도록 합니다.

## 2. MVP 목표

### 2.1 주요 목표

- 수출바우처 서비스 메뉴를 사용자가 쉽게 탐색할 수 있도록 합니다.
- 국가/권역과 지원유형 기준으로 서비스 필터링이 가능하도록 합니다.
- 각 서비스의 요약 정보와 상세 정보를 구분해 제공합니다.
- 랜딩페이지에서 주요 추천/모집 메뉴를 하이라이트 캐러셀로 노출합니다.
- 서비스 데이터는 Google Sheets CSV를 통해 관리합니다.
- 상담 문의는 Tally popup을 통해 접수합니다.
- 별도 관리자 페이지 없이, 팀원이 Google Sheets를 수정해 메뉴 정보를 관리할 수 있도록 합니다.

### 2.2 MVP 제외 범위

- 전체 메뉴판 페이지 개발
- 전체 메뉴판 보기 버튼 노출
- Supabase 연동
- 별도 DB 구축
- 관리자 페이지 개발
- 로그인/권한 관리
- 자체 문의 DB 저장
- CRM/성과관리 기능
- 메뉴판 매트릭스 표 HTML 구현

## 3. 전체 시스템 구조

이번 MVP는 다음 구조로 구현합니다.

```txt
Vercel
→ 웹사이트 배포 및 호스팅

Google Sheets
→ 서비스 메뉴 데이터 관리
→ Published CSV로 웹사이트에 데이터 제공

Tally
→ 상담 문의 폼 및 문의 접수
```

### 3.1 데이터 흐름

```txt
Google Sheets
→ Published CSV URL
→ 웹사이트에서 CSV fetch
→ 서비스 카드 / 필터 / 하이라이트 캐러셀 / 상세 Drawer 렌더링
```

### 3.2 문의 흐름

```txt
사용자 상담신청 클릭
→ Tally popup open
→ 사용자가 문의 제출
→ Tally에 응답 저장
```

### 3.3 배포 구조

웹사이트는 Vercel에 배포합니다.

Vercel 플랜, 도메인 연결, 운영 계정은 내부 확인 후 결정합니다.

## 4. 사이트 구조

MVP에는 다음 두 페이지를 포함합니다.

```txt
/
랜딩페이지

/services
서비스 찾기 페이지
```

MVP에서 제외되는 페이지:

```txt
/menu-board
전체 메뉴판 페이지
```

현재 전체 메뉴판 디자인은 최종 전체 메뉴판이 아니며 대대적인 구조 개편이 필요하므로, MVP에서는 구현하지 않습니다.

## 5. Figma 디자인 레퍼런스

Figma 디자인 파일:

```txt
https://www.figma.com/design/8TpF9gtq1rIPsg3ec0BDbu/수출바우처-안내페이지
```

참고 프레임:

```txt
landing page
service finder - default
Service detail drawer component
service menu list
```

적용 기준:

- `landing page`: 랜딩페이지 구현 기준
- `service finder - default`: 서비스 찾기 페이지 기본 상태 구현 기준
- `Service detail drawer component`: 자세히 보기 클릭 시 열리는 상세 Drawer 구현 기준
- `service menu list`: MVP 개발 제외, 참고용으로만 사용

기능과 데이터 로직은 본 PRD를 우선 기준으로 하며, 시각적 레이아웃은 Figma를 참고합니다.

## 6. 데이터 소스

서비스 데이터는 Google Sheets의 Published CSV를 단일 데이터 소스로 사용합니다.

### 6.1 CSV URL

```txt
https://docs.google.com/spreadsheets/d/e/2PACX-1vS-yDALtOnNZOSlAXZkLYTecnIwqIUP5qXIpEZv7OAtbuV9IYWywL0N4t_-UaYEA3ry8OjhA58OM7S8/pub?gid=0&single=true&output=csv
```

### 6.2 운영 원칙

- 팀원은 Google Sheets에서 서비스 정보를 수정합니다.
- 웹사이트는 CSV를 읽어 서비스 데이터를 표시합니다.
- 코드 수정 없이 메뉴 노출 여부, 순서, 상세정보, 하이라이트 여부를 관리할 수 있어야 합니다.
- Supabase나 별도 DB는 MVP에서 사용하지 않습니다.

## 7. Google Sheets 컬럼 구조

웹사이트는 아래 컬럼을 기준으로 데이터를 파싱합니다.

```txt
service_id
service_name
countries
support_types
summary
keyword_tags
application_url
is_visible
sort_order
detail_intro
detail_process
detail_composition
is_highlighted
highlight_order
highlight_title
highlight_subtitle
highlight_summary
highlight_image_url
highlight_cta_label
highlight_period
```

### 7.1 컬럼 정의

| 컬럼명 | 설명 |
|---|---|
| `service_id` | 서비스 고유 ID |
| `service_name` | 서비스명 |
| `countries` | 국가/권역 태그. 쉼표로 복수 입력 가능 |
| `support_types` | 지원유형 태그. 쉼표로 복수 입력 가능 |
| `summary` | 서비스 찾기 카드에 표시할 짧은 설명 |
| `keyword_tags` | 키워드 태그. 쉼표로 복수 입력 가능 |
| `application_url` | 수출바우처 신청/메뉴 페이지 링크 |
| `is_visible` | 서비스 찾기 페이지 노출 여부 |
| `sort_order` | 서비스 찾기 페이지 노출 순서 |
| `detail_intro` | 상세 Drawer의 서비스 소개 |
| `detail_process` | 상세 Drawer의 진행 방식 |
| `detail_composition` | 상세 Drawer의 BASIC 구성 |
| `is_highlighted` | 랜딩페이지 하이라이트 캐러셀 노출 여부 |
| `highlight_order` | 하이라이트 캐러셀 노출 순서 |
| `highlight_title` | 하이라이트 카드 제목 |
| `highlight_subtitle` | 하이라이트 카드 부제/카테고리 |
| `highlight_summary` | 하이라이트 카드 설명 |
| `highlight_image_url` | 하이라이트 카드 이미지 URL |
| `highlight_cta_label` | 하이라이트 카드 CTA 문구 |
| `highlight_period` | 신청기간/모집기간 문구 |

### 7.2 Boolean 처리

아래 값은 true로 처리합니다.

```txt
TRUE
true
Y
y
1
```

아래 값은 false로 처리합니다.

```txt
FALSE
false
N
n
0
empty
```

### 7.3 복수값 처리

아래 컬럼은 쉼표로 구분된 복수값을 허용합니다.

```txt
countries
support_types
keyword_tags
```

예시:

```txt
countries = 미국, 유럽
support_types = 전시회 참가, 바이어/파트너 연결
keyword_tags = 기후테크, VC, 네트워킹
```

웹사이트는 쉼표 기준으로 분리하고 양쪽 공백을 제거해 태그로 처리합니다.

## 8. 상단 네비게이션

모든 주요 페이지에 상단 네비게이션을 표시합니다.

### 8.1 네비게이션 항목

```txt
홈
서비스 찾기
상담신청
```

### 8.2 동작

| 항목 | 동작 |
|---|---|
| 홈 | `/`로 이동 |
| 서비스 찾기 | `/services`로 이동 |
| 상담신청 | Tally popup 열기 |

### 8.3 제외 항목

`전체 메뉴판`은 상단 네비게이션에 포함하지 않습니다.

## 9. 랜딩페이지

### 9.1 경로

```txt
/
```

### 9.2 목적

랜딩페이지는 수출바우처 활용 가능성과 MYSC 서비스의 방향성을 소개하고, 주요 모집/추천 메뉴를 하이라이트하는 역할을 합니다.

### 9.3 주요 섹션

Figma `landing page` 프레임을 기준으로 구현합니다.

포함 섹션:

1. Hero
2. 수출바우처 / MYSC 소개
3. 해외 진출 커리큘럼
4. 하이라이트 서비스 캐러셀
5. MYSC가 수요기업으로 선정되어야 하는 이유
6. FAQ
7. 하단 상담 CTA

## 10. 랜딩 하이라이트 캐러셀

### 10.1 데이터 조건

Google Sheets에서 아래 조건을 만족하는 서비스만 노출합니다.

```txt
is_highlighted = TRUE
```

정렬 기준:

```txt
highlight_order 오름차순
```

`highlight_order`가 비어 있으면 `sort_order`를 fallback으로 사용할 수 있습니다.

### 10.2 카드 표시 정보

하이라이트 카드에는 아래 정보를 표시합니다.

```txt
highlight_image_url
highlight_title
highlight_subtitle
highlight_summary
highlight_cta_label
highlight_period
```

Fallback:

| 값 | fallback |
|---|---|
| `highlight_title` | `service_name` |
| `highlight_summary` | `summary` |
| `highlight_cta_label` | `신청하기` |
| `highlight_image_url` | 브랜드 그라데이션 placeholder |

### 10.3 동작

- 하이라이트 캐러셀은 가로 스크롤 가능해야 합니다.
- 모바일에서는 swipe 가능해야 합니다.
- 자동재생은 필수 아님.
- 카드 CTA 클릭 시 `application_url`을 새 탭으로 엽니다.
- `application_url`이 없으면 CTA를 비활성 상태로 표시합니다.
- `is_highlighted = TRUE`인 서비스가 없으면 섹션을 숨기거나 빈 상태를 자연스럽게 표시합니다.

## 11. 서비스 찾기 페이지

### 11.1 경로

```txt
/services
```

### 11.2 목적

사용자가 국가/권역과 지원유형을 선택해 활용 가능한 수출바우처 서비스를 탐색할 수 있도록 합니다.

### 11.3 주요 구성

Figma `service finder - default` 프레임을 기준으로 구현합니다.

구성:

1. 상단 네비게이션
2. 페이지 Hero/Header
3. 필터 영역
4. 결과 개수
5. 서비스 카드 그리드
6. 하단 상담 CTA

### 11.4 헤드라인 문구

```txt
우리 기업에 맞는 수출바우처 서비스를 찾아보세요.
```

보조 문구:

```txt
관심 국가와 필요한 지원유형을 선택하면 활용 가능한 글로벌 진출 서비스를 확인할 수 있습니다.
```

안내 문구:

```txt
아직 진출 국가가 정해지지 않았다면 ‘전체’로 두고, 필요한 지원유형부터 선택해보세요.
```

## 12. 필터 기능

### 12.1 국가/권역 필터

예상 필터값:

```txt
전체
미국
프랑스
독일
일본
싱가포르
유럽
전체 국가
```

### 12.2 지원유형 필터

예상 필터값:

```txt
시장조사·진출전략
현지 테스트·판촉
전시회 참가
바이어·파트너 연결
후속 영업 관리
```

### 12.3 필터링 로직

- `is_visible = TRUE`인 서비스만 서비스 찾기 페이지에 표시합니다.
- 국가 필터가 `전체`이면 국가 조건을 적용하지 않습니다.
- 지원유형 필터가 선택되지 않았으면 지원유형 조건을 적용하지 않습니다.
- 국가와 지원유형이 모두 선택되면 두 조건을 모두 만족하는 서비스를 표시합니다.
- `countries`, `support_types`는 쉼표 분리된 복수값을 기준으로 매칭합니다.
- 매칭은 공백 제거 후 처리합니다.

### 12.4 결과 개수

필터링된 결과 수를 표시합니다.

```txt
총 N개의 서비스를 확인할 수 있습니다.
```

### 12.5 빈 상태

조건에 맞는 서비스가 없을 경우:

```txt
조건에 맞는 서비스가 없습니다.
선택한 국가나 지원유형을 다시 조정해보세요.
```

### 12.6 전체 메뉴판 보기 버튼

MVP에서는 `전체 메뉴판 보기` 버튼을 숨깁니다.

사유:

- 현재 전체 메뉴판은 최종본이 아닙니다.
- 전체 메뉴판 구조는 추후 별도로 재정리할 예정입니다.
- MVP에서는 서비스 찾기 페이지를 우선 운영합니다.

## 13. 서비스 카드

### 13.1 카드 표시 정보

서비스 찾기 페이지의 카드는 이미지 없이 텍스트 중심으로 구성합니다.

표시 정보:

```txt
service_name
countries
support_types
summary
keyword_tags
자세히 보기
신청 페이지 바로가기
```

### 13.2 카드 동작

카드 전체는 클릭 가능하게 만들지 않습니다.

클릭 가능한 요소는 아래 두 개입니다.

#### 자세히 보기

- 서비스 상세 Drawer를 엽니다.
- 페이지 이동은 하지 않습니다.

#### 신청 페이지 바로가기

- `application_url`을 새 탭으로 엽니다.
- `application_url`이 비어 있으면 `신청 페이지 준비 중` 비활성 상태로 표시합니다.

### 13.3 시각적 위계

- `신청 페이지 바로가기`는 primary CTA입니다.
- `자세히 보기`는 secondary CTA입니다.
- 카드 하단이 과하게 복잡해 보이지 않도록 합니다.

## 14. 서비스 상세 Drawer

### 14.1 목적

서비스 카드에 모든 상세 정보를 담지 않고, 관심 있는 서비스만 자세히 볼 수 있도록 Drawer로 제공합니다.

### 14.2 트리거

`자세히 보기` 버튼 클릭 시 Drawer가 열립니다.

카드 전체 클릭으로 Drawer를 열지 않습니다.

### 14.3 UI 기준

Figma `Service detail drawer component`를 기준으로 구현합니다.

### 14.4 동작

- 서비스 찾기 페이지 위에 dim overlay를 표시합니다.
- Desktop에서는 오른쪽 Drawer로 표시합니다.
- Mobile에서는 full-screen modal 또는 bottom sheet 형태로 전환할 수 있습니다.
- X 버튼으로 닫을 수 있어야 합니다.
- 가능하면 ESC 키 또는 외부 영역 클릭으로 닫을 수 있게 합니다.

### 14.5 표시 정보

Drawer에는 아래 정보를 표시합니다.

```txt
service_name
countries
support_types
summary
keyword_tags
detail_intro
detail_process
detail_composition
신청 페이지 바로가기
상담 문의하기
```

### 14.6 섹션 매핑

| Drawer 섹션 | 데이터 컬럼 |
|---|---|
| 서비스 소개 | `detail_intro` |
| 진행 방식 | `detail_process` |
| BASIC 구성 | `detail_composition` |

### 14.7 Drawer CTA

#### 신청 페이지 바로가기

- `application_url`을 새 탭으로 엽니다.
- URL이 없으면 비활성 상태로 표시합니다.

#### 상담 문의하기

- Tally popup을 엽니다.
- 선택한 서비스 정보를 hidden fields로 전달합니다.

## 15. Tally 문의 연동

### 15.1 목적

상담 문의는 별도 DB에 저장하지 않고 Tally를 통해 접수합니다.

### 15.2 Tally Form ID

```txt
EkDj8X
```

### 15.3 Tally Script

웹사이트 head에 Tally widget script를 1회 로드합니다.

```html
<script async src="https://tally.so/widgets/embed.js"></script>
```

### 15.4 구현 방식

Hidden fields를 전달해야 하므로, 단순 data attribute 방식보다 JavaScript API 사용을 우선합니다.

```js
Tally.openPopup('EkDj8X', options);
```

기본 옵션:

```js
{
  layout: 'modal',
  width: 700,
  emoji: {
    text: '👋',
    animation: 'wave'
  }
}
```

### 15.5 일반 상담 CTA

아래 버튼은 특정 서비스와 연결되지 않은 일반 문의입니다.

| 버튼 위치 | hidden field |
|---|---|
| 상단 네비게이션 상담신청 | `source_page = top_nav` |
| 랜딩페이지 CTA | `source_page = landing_cta` |
| 서비스 찾기 하단 CTA | `source_page = service_finder_bottom_cta` |

예시:

```js
Tally.openPopup('EkDj8X', {
  layout: 'modal',
  width: 700,
  emoji: {
    text: '👋',
    animation: 'wave',
  },
  hiddenFields: {
    source_page: 'top_nav',
  },
});
```

### 15.6 서비스 상세 Drawer 상담 CTA

서비스 상세 Drawer의 `상담 문의하기`는 선택한 서비스 맥락을 함께 전달합니다.

Tally에 생성된 hidden fields:

```txt
source_page
selected_service_id
selected_service_name
selected_countries
selected_support_types
```

예시:

```js
Tally.openPopup('EkDj8X', {
  layout: 'modal',
  width: 700,
  emoji: {
    text: '👋',
    animation: 'wave',
  },
  hiddenFields: {
    source_page: 'service_detail_drawer',
    selected_service_id: service.service_id,
    selected_service_name: service.service_name,
    selected_countries: service.countries.join(', '),
    selected_support_types: service.support_types.join(', '),
  },
});
```

### 15.7 Fallback

Tally script가 로드되지 않을 경우 아래 hash link를 fallback으로 사용할 수 있습니다.

```txt
#tally-open=EkDj8X&tally-emoji-text=👋&tally-emoji-animation=wave
```

## 16. 배포 및 운영 구조

### 16.1 배포

웹사이트는 Vercel에 배포합니다.

Vercel 플랜, 도메인 연결, 운영 계정은 내부 확인 후 결정합니다.

### 16.2 데이터 운영

서비스 데이터는 Google Sheets에서 관리합니다.

운영자는 Google Sheets에서 아래 항목을 수정할 수 있습니다.

```txt
서비스명
국가/권역
지원유형
요약
상세 설명
신청 페이지 URL
서비스 찾기 노출 여부
서비스 찾기 노출 순서
랜딩 하이라이트 노출 여부
랜딩 하이라이트 순서
하이라이트 이미지
하이라이트 신청기간
```

### 16.3 문의 운영

상담 문의는 Tally에서 확인합니다.

서비스 상세 Drawer에서 유입된 문의는 hidden fields를 통해 어떤 서비스에 대한 문의인지 확인할 수 있어야 합니다.

### 16.4 Google Sheets 반영 방식

웹사이트는 Google Sheets Published CSV를 fetch하여 데이터를 표시합니다.

성능과 안정성을 위해 5~10분 단위 캐시를 허용할 수 있습니다.

시트 수정 후 웹사이트 반영까지 약간의 지연이 발생할 수 있습니다.

## 17. 로딩 및 오류 상태

### 17.1 CSV 로딩 중

```txt
서비스 정보를 불러오는 중입니다.
```

### 17.2 CSV 로딩 실패

```txt
서비스 정보를 불러오지 못했습니다.
잠시 후 다시 시도해주세요.
```

### 17.3 노출 서비스 없음

```txt
현재 노출 가능한 서비스가 없습니다.
```

### 17.4 이미지 없음

`highlight_image_url`이 비어 있거나 로드되지 않으면 브랜드 그라데이션 placeholder를 표시합니다.

## 18. 반응형 요구사항

### 18.1 Desktop

- Figma desktop 디자인을 기준으로 구현합니다.
- 본문 콘텐츠는 중앙 정렬합니다.
- 서비스 카드는 3열 grid를 기본으로 합니다.
- 하이라이트 캐러셀은 가로 스크롤 가능해야 합니다.
- 상세 Drawer는 오른쪽에서 열립니다.

### 18.2 Tablet

- 서비스 카드는 2열 grid로 전환할 수 있습니다.
- 필터 chip은 자연스럽게 wrap됩니다.
- Drawer는 화면 폭에 따라 modal로 전환할 수 있습니다.

### 18.3 Mobile

- 서비스 카드는 1열 grid로 표시합니다.
- 필터 chip은 wrap됩니다.
- 하이라이트 캐러셀은 swipe 가능해야 합니다.
- 상세 Drawer는 full-screen modal 또는 bottom sheet 형태로 표시할 수 있습니다.
- 네비게이션은 모바일 화면에서 깨지지 않도록 compact하게 처리합니다.

## 19. 접근성 요구사항

- 모든 버튼은 keyboard accessible해야 합니다.
- Drawer는 닫기 버튼을 제공해야 합니다.
- 가능하면 Drawer open 상태에서 focus trap을 적용합니다.
- 이미지에는 alt text를 제공합니다.
- 비활성 버튼은 시각적/기능적으로 구분되어야 합니다.
- navy/cyan 배경 위 텍스트 대비를 유지합니다.

## 20. 기술 요구사항

### 20.1 권장 기술 스택

```txt
Next.js
React
TypeScript
CSS Modules 또는 Tailwind CSS
```

Claude Code가 구현 시 적절히 조정할 수 있으나, 유지보수가 쉬운 구조를 우선합니다.

### 20.2 데이터 파싱

- Published CSV URL을 fetch합니다.
- CSV를 service object array로 변환합니다.
- boolean 값을 정규화합니다.
- comma-separated field를 배열로 변환합니다.
- optional field가 비어 있어도 화면이 깨지지 않아야 합니다.

### 20.3 외부 의존성

허용 가능:

```txt
CSV parser
가벼운 carousel/scroll utility
```

불필요하게 무거운 라이브러리는 지양합니다.

## 21. MVP 수용 기준

### 21.1 랜딩페이지

- [ ] Figma `landing page` 기준으로 랜딩페이지가 구현된다.
- [ ] 상단 네비게이션에 `홈`, `서비스 찾기`, `상담신청`이 있다.
- [ ] 하이라이트 캐러셀은 `is_highlighted = TRUE`인 서비스만 표시한다.
- [ ] 하이라이트 캐러셀은 가로 스크롤 가능하다.
- [ ] 하이라이트 카드에 이미지, 제목, 설명, 신청기간, CTA가 표시된다.
- [ ] 상담신청 버튼은 Tally popup을 연다.

### 21.2 서비스 찾기 페이지

- [ ] `/services` 경로에 서비스 찾기 페이지가 구현된다.
- [ ] Google Sheets CSV에서 서비스 데이터를 불러온다.
- [ ] `is_visible = TRUE`인 서비스만 표시한다.
- [ ] 국가/권역 필터가 작동한다.
- [ ] 지원유형 필터가 작동한다.
- [ ] 결과 개수가 필터링 결과에 맞게 업데이트된다.
- [ ] 조건에 맞는 서비스가 없을 때 empty state가 표시된다.
- [ ] 전체 메뉴판 보기 버튼은 숨겨져 있다.

### 21.3 서비스 카드

- [ ] 서비스 카드는 이미지 없이 텍스트 중심으로 표시된다.
- [ ] 서비스명, 국가/권역, 지원유형, 요약, 키워드가 표시된다.
- [ ] 카드 전체는 클릭되지 않는다.
- [ ] `자세히 보기` 버튼만 상세 Drawer를 연다.
- [ ] `신청 페이지 바로가기`는 `application_url`을 새 탭으로 연다.
- [ ] `application_url`이 없으면 비활성 상태가 표시된다.

### 21.4 상세 Drawer

- [ ] `자세히 보기` 클릭 시 상세 Drawer가 열린다.
- [ ] Drawer는 서비스명, 태그, 요약, 서비스 소개, 진행 방식, BASIC 구성을 표시한다.
- [ ] Drawer에는 닫기 버튼이 있다.
- [ ] Drawer의 `신청 페이지 바로가기`가 작동한다.
- [ ] Drawer의 `상담 문의하기`가 Tally popup을 연다.
- [ ] Drawer에서 열린 Tally 문의는 서비스 관련 hidden fields를 전달한다.

### 21.5 Tally

- [ ] Tally widget script가 한 번 로드된다.
- [ ] 모든 상담 CTA가 Tally popup을 연다.
- [ ] 일반 CTA는 `source_page`를 전달한다.
- [ ] 서비스 상세 Drawer CTA는 선택 서비스 정보를 hidden fields로 전달한다.

## 22. Claude Code 작업 지침

Claude Code는 구현 전에 본 PRD를 읽고 아래 파일을 생성합니다.

```txt
docs/implementation-checklist.md
```

체크리스트는 markdown checkbox 형식으로 작성합니다.

Claude Code 작업 순서:

1. `docs/prd.md`를 읽습니다.
2. 구현 전 모호하거나 빠진 요구사항을 정리합니다.
3. `docs/implementation-checklist.md`를 작성합니다.
4. 구현 순서를 제안합니다.
5. 승인 후 단계적으로 구현합니다.
6. 완료한 작업은 체크리스트에 반영합니다.
7. 기능/데이터/동작 기준은 PRD를 우선합니다.
8. 시각적 레이아웃은 Figma를 참고합니다.

중요 지침:

```txt
- 전체 메뉴판 페이지는 구현하지 않는다.
- 전체 메뉴판 보기 버튼은 숨긴다.
- Supabase는 사용하지 않는다.
- 별도 DB는 구축하지 않는다.
- 관리자 페이지는 만들지 않는다.
- Google Sheets CSV를 서비스 데이터 소스로 사용한다.
- Tally popup을 상담 문의 수단으로 사용한다.
- 유지보수하기 쉬운 단순한 구조를 우선한다.
```

## 23. Claude Code 첫 실행 프롬프트

```txt
Read docs/prd.md first.

Before implementing, create docs/implementation-checklist.md using markdown checkboxes.

Review the PRD and identify unclear or missing implementation details before coding.
Then propose an implementation plan.

Use the Figma MCP design reference for visual layout:
- landing page
- service finder - default
- Service detail drawer component

Treat docs/prd.md as the source of truth for:
- MVP scope
- data schema
- filtering logic
- Tally behavior
- deployment structure

Important:
- Do not implement the full menu board page.
- Hide the full menu board button in MVP.
- Do not use Supabase for MVP.
- Do not create a separate database.
- Use Google Sheets CSV as the service data source.
- Use Tally popup for all consultation CTAs.
- Do not create an admin page.
- Keep the implementation simple and maintainable.
```
