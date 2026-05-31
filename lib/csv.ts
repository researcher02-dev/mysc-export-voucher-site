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

/** Minimal CSV parser: handles quoted fields with commas and newlines */
function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (ch === ',' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += ch
    }
  }
  result.push(current)
  return result
}

function parseCSV(text: string): Service[] {
  const lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n')
  if (lines.length < 2) return []

  const headers = parseCSVLine(lines[0])

  const services: Service[] = []

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    const values = parseCSVLine(line)
    const row: Record<string, string> = {}
    headers.forEach((h, idx) => {
      row[h.trim()] = (values[idx] ?? '').trim()
    })

    const highlightOrder = parseNumber(row.highlight_order)
    const sortOrder = parseNumber(row.sort_order)

    services.push({
      service_id: row.service_id ?? '',
      service_name: row.service_name ?? '',
      countries: parseArray(row.countries ?? ''),
      support_types: parseArray(row.support_types ?? ''),
      summary: row.summary ?? '',
      keyword_tags: parseArray(row.keyword_tags ?? ''),
      application_url: row.application_url ?? '',
      is_visible: parseBool(row.is_visible ?? ''),
      sort_order: sortOrder,
      detail_intro: row.detail_intro ?? '',
      detail_process: row.detail_process ?? '',
      detail_composition: row.detail_composition ?? '',
      is_highlighted: parseBool(row.is_highlighted ?? ''),
      highlight_order: highlightOrder || sortOrder,
      highlight_title: row.highlight_title ?? '',
      highlight_subtitle: row.highlight_subtitle ?? '',
      highlight_summary: row.highlight_summary ?? '',
      highlight_image_url: row.highlight_image_url ?? '',
      highlight_cta_label: row.highlight_cta_label ?? '',
      highlight_period: row.highlight_period ?? '',
    })
  }

  return services
}

let cached: Service[] | null = null
let cacheTime = 0
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

export async function fetchServices(): Promise<Service[]> {
  const now = Date.now()
  if (cached && now - cacheTime < CACHE_TTL) return cached

  try {
    const res = await fetch(CSV_URL, {
      next: { revalidate: 300 },
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const text = await res.text()
    const services = parseCSV(text)
    cached = services
    cacheTime = now
    return services
  } catch (err) {
    console.error('Failed to fetch services CSV:', err)
    if (cached) return cached
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
