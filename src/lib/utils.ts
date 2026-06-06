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

export function formatDate(dateStr: string): string {
  const days = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag']
  const months = ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des']
  const d = new Date(dateStr)
  return `${days[d.getDay()]} ${d.getDate()}. ${months[d.getMonth()]}`
}

export function categoryLabel(cat: string): string {
  const labels: Record<string, string> = {
    'fag': 'Fag',
    'kultur': 'Kultur',
    'mat': 'Mat & drikke',
    'musikk': 'Musikk',
    'litteratur': 'Litteratur',
    'tech': 'Tech / KI',
    'baerekraft': 'Bærekraft',
    'barn': 'Barn & familie',
    'sosialt': 'Sosialt',
    'annet': 'Annet',
  }
  return labels[cat] ?? cat
}
