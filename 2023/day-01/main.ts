import readInput from '../read_input.ts'

const input = readInput(1)

const map: { [key: string]: number } = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
}
const rows = input.split('\n')

const digits = rows.map((row) => {
  const chars = row.split('')

  const digits: number[] = []
  let storedChars: string[] = []

  chars.forEach((d, currentMatch) => {
    if (!isNaN(Number(d))) {
      digits.push(Number(d))
    } else {
      for (let i = currentMatch; i < chars.length; i++) {
        const c = chars[i]

        storedChars.push(c)

        const maybeKey = storedChars.join('')

        if (map[maybeKey]) {
          digits.push(Number(map[maybeKey]))

          break
        }
      }

      storedChars = []
    }
  })

  return Number(
    `${typeof digits[0] === 'number' ? digits[0] : ''}${
      typeof digits[digits.length - 1] === 'number'
        ? digits[digits.length - 1]
        : ''
    }`
  )
})

const sum = digits.reduce((t, n) => t + n, 0)

console.log(sum)
