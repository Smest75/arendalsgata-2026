export function generateSlug(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/æ/g, 'ae')
    .replace(/ø/g, 'o')
    .replace(/å/g, 'a')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)
  const suffix = Math.random().toString(36).slice(2, 6)
  return `${base}-${suffix}`
}

const DAYS = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag']
const MONTHS_SHORT = ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des']
const MONTHS_LONG = ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember']

function parseDate(dateStr: string): Date {
  // Use noon to avoid timezone-related day shifts
  return new Date(dateStr + 'T12:00:00')
}

export function formatDate(dateStr: string): string {
  const d = parseDate(dateStr)
  return `${DAYS[d.getDay()]} ${d.getDate()}. ${MONTHS_SHORT[d.getMonth()]}`
}

export function formatDateFull(dateStr: string): string {
  const d = parseDate(dateStr)
  return `${DAYS[d.getDay()]} ${d.getDate()}. ${MONTHS_LONG[d.getMonth()]}`
}

export function categoryLabel(cat: string): string {
  const labels: Record<string, string> = {
    fag: 'Fag & foredrag',
    kultur: 'Kultur',
    mat: 'Mat & drikke',
    musikk: 'Musikk',
    litteratur: 'Litteratur',
    tech: 'Tech & KI',
    baerekraft: 'Bærekraft',
    barn: 'Barn & familie',
    sosialt: 'Sosialt',
    annet: 'Annet',
  }
  return labels[cat] ?? cat
}

export const ALL_CATEGORIES = [
  'fag', 'kultur', 'mat', 'musikk', 'litteratur',
  'tech', 'baerekraft', 'barn', 'sosialt', 'annet',
] as const
