export function ints(str: string) {
  const match = str.match(/-?\d+/g)

  if (!match) {
    return []
  }

  return Array.from(match.map(Number))
}
