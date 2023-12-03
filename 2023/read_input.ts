import * as path from 'https://deno.land/std@0.188.0/path/mod.ts'

const __dirname = path.dirname(path.fromFileUrl(import.meta.url))

export default function readInput(day: number, filePath = 'input.txt') {
  return Deno.readTextFileSync(path.join(__dirname, getDay(day), filePath))
}

function getDay(day: number) {
  const dayNr = day.toString().padStart(2, '0')

  return `day-${dayNr}`
}
