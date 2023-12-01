import * as path from 'https://deno.land/std@0.188.0/path/mod.ts'

const __dirname = path.dirname(path.fromFileUrl(import.meta.url))
const input = Deno.readTextFileSync(__dirname + '/input.txt')

const seats = input.split('\n')

seats.forEach((seat) => {
  const row = seat.slice(0, 7)
  const column = seat.slice(7)

  const
})

function getSeatId(low, high) {}
