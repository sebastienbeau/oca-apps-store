export function nl2br(text: string | null): string {
  if (!text) {
    return ''
  }
  return text.replace(/\n/g, '<br>')
}

export function formatCurrency(value: number | null): string {
  if (value == null) {
    return ''
  }
  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  })
  return formatter.format(value)
}

export function getLastWord(text: string): string {
  const lastSpaceIndex = text?.lastIndexOf(' ')
  if (lastSpaceIndex === -1 || !lastSpaceIndex) {
    return text
  }
  const lastWord = text.substring(lastSpaceIndex + 1)
  return lastWord
}
export function removeLastWord(text: string): string {
  const lastSpaceIndex = text?.lastIndexOf(' ')
  if (lastSpaceIndex === -1 || !lastSpaceIndex) {
    return ''
  }
  return text.substring(0, lastSpaceIndex)
}
