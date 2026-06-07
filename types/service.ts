export interface Service {
  service_id: string
  service_name: string
  countries: string[]
  support_types: string[]
  summary: string
  keyword_tags: string[]
  application_url: string
  is_visible: boolean
  sort_order: number
  detail_intro: string
  detail_process: string
  detail_composition: string
  is_highlighted: boolean
  highlight_order: number
  highlight_title: string
  highlight_subtitle: string
  highlight_summary: string
  highlight_image_url: string
  highlight_cta_label: string
  highlight_period: string
  industry_tags: string[]
  official_category: string
}
