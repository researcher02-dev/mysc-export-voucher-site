'use client'

const TALLY_FORM_ID = 'EkDj8X'

const BASE_OPTIONS = {
  layout: 'modal' as const,
  width: 700,
  emoji: { text: '👋', animation: 'wave' },
}

declare global {
  interface Window {
    Tally?: {
      openPopup: (formId: string, options?: Record<string, unknown>) => void
    }
  }
}

export function openTally(hiddenFields: Record<string, string> = {}) {
  if (typeof window === 'undefined') return

  const options = { ...BASE_OPTIONS, hiddenFields }

  if (window.Tally) {
    window.Tally.openPopup(TALLY_FORM_ID, options)
  } else {
    // Fallback hash link
    window.location.hash = `tally-open=${TALLY_FORM_ID}&tally-emoji-text=👋&tally-emoji-animation=wave`
  }
}

export function openTallyGeneral(sourcePage: string) {
  openTally({ source_page: sourcePage })
}

export function openTallyFromDrawer(service: {
  service_id: string
  service_name: string
  countries: string[]
  support_types: string[]
}) {
  openTally({
    source_page: 'service_detail_drawer',
    selected_service_id: service.service_id,
    selected_service_name: service.service_name,
    selected_countries: service.countries.join(', '),
    selected_support_types: service.support_types.join(', '),
  })
}
