import type { Service } from '@/types/service'

const CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vS-yDALtOnNZOSlAXZkLYTecnIwqIUP5qXIpEZv7OAtbuV9IYWywL0N4t_-UaYEA3ry8OjhA58OM7S8/pub?gid=0&single=true&output=csv'

function parseBool(val: string): boolean {
  return ['true', 'TRUE', 'Y', 'y', '1'].includes(val.trim())
}

function parseArray(val: string): string[] {
  if (!val.trim()) return []
  return val
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

function parseNumber(val: string): number {
  const n = parseInt(val.trim(), 10)
  return isNaN(n) ? 0 : n
}

/**
 * Full RFC-4180 CSV parser.
 * Correctly handles quoted fields that contain commas, newlines, or escaped quotes ("").
 * Splits on \n only when outside of a quoted field.
 */
function parseCSV(text: string): Service[] {
  const src = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n')

  // Parse into rows of fields character-by-character
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let inQ = false

  for (let i = 0; i < src.length; i++) {
    const ch = src[i]
    if (inQ) {
      if (ch === '"') {
        if (src[i + 1] === '"') { field += '"'; i++ }  // escaped quote
        else inQ = false                                // closing quote
      } else {
        field += ch  // newlines inside quotes are preserved
      }
    } else {
      if (ch === '"') {
        inQ = true
      } else if (ch === ',') {
        row.push(field); field = ''
      } else if (ch === '\n') {
        row.push(field); field = ''
        rows.push(row); row = []
      } else {
        field += ch
      }
    }
  }
  // flush last field/row
  row.push(field)
  if (row.some(f => f.trim())) rows.push(row)

  if (rows.length < 2) return []

  const headers = rows[0].map(h => h.trim())
  const services: Service[] = []

  for (let i = 1; i < rows.length; i++) {
    const vals = rows[i]
    const r: Record<string, string> = {}
    headers.forEach((h, idx) => { r[h] = (vals[idx] ?? '').trim() })

    // Skip rows with no service identity
    if (!r.service_id && !r.service_name) continue

    const sortOrder      = parseNumber(r.sort_order)
    const highlightOrder = parseNumber(r.highlight_order)

    services.push({
      service_id:          r.service_id        ?? '',
      service_name:        r.service_name       ?? '',
      countries:           parseArray(r.countries      ?? ''),
      support_types:       parseArray(r.support_types  ?? ''),
      summary:             r.summary            ?? '',
      keyword_tags:        parseArray(r.keyword_tags   ?? ''),
      application_url:     r.application_url    ?? '',
      is_visible:          parseBool(r.is_visible      ?? ''),
      sort_order:          sortOrder,
      detail_intro:        r.detail_intro        ?? '',
      detail_process:      r.detail_process      ?? '',
      detail_composition:  r.detail_composition  ?? '',
      is_highlighted:      parseBool(r.is_highlighted  ?? ''),
      highlight_order:     highlightOrder || sortOrder,
      highlight_title:     r.highlight_title     ?? '',
      highlight_subtitle:  r.highlight_subtitle  ?? '',
      highlight_summary:   r.highlight_summary   ?? '',
      highlight_image_url: r.highlight_image_url ?? '',
      highlight_cta_label: r.highlight_cta_label ?? '',
      highlight_period:    r.highlight_period    ?? '',
      industry_tags:       parseArray(r.industry_tags   ?? ''),
      official_category:   r.official_category   ?? '',
    })
  }

  return services
}

export async function fetchServices(): Promise<Service[]> {
  try {
    const res = await fetch(CSV_URL, {
      next: { revalidate: 300 },
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const text = await res.text()
    return parseCSV(text)
  } catch (err) {
    console.error('Failed to fetch services CSV:', err)
    return []
  }
}

export function getHighlightedServices(services: Service[]): Service[] {
  return services
    .filter((s) => s.is_highlighted)
    .sort((a, b) => a.highlight_order - b.highlight_order)
}

export function getVisibleServices(services: Service[]): Service[] {
  return services
    .filter((s) => s.is_visible)
    .sort((a, b) => a.sort_order - b.sort_order)
}
