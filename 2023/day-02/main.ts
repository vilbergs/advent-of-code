import readInput from '../read_input.ts'

// const input = readInput(2, 'testinput.txt')
const input = readInput(2)

function partOne() {
  const MAX_RED = 12
  const MAX_GREEN = 13
  const MAX_BLUE = 14

  const lines = input.split('\n')

  let sum = 0

  lines.forEach((line) => {
    const [game, sets] = line.split(': ')

    const gameNumber = Number(game.split(' ')[1])
    const splitSets = sets.split('; ')

    const isGameValid = splitSets.every((set) => {
      const colors = set
        .trim()
        .split(', ')
        .reduce(
          (gameTotal, countAndColor) => {
            const [count, color] = countAndColor
              .trim()
              .split(' ')
              .map((str) => str.trim())

            gameTotal[color] = Number(count)

            return gameTotal
          },
          {
            red: 0,
            green: 0,
            blue: 0,
          }
        )

      return (
        colors.red <= MAX_RED &&
        colors.blue <= MAX_BLUE &&
        colors.green <= MAX_GREEN
      )
    })

    if (isGameValid) {
      sum += gameNumber
    }
  })

  return sum
}

function partTwo() {
  const MAX_RED = 12
  const MAX_GREEN = 13
  const MAX_BLUE = 14

  const lines = input.split('\n')

  let sum = 0

  lines.forEach((line) => {
    const [game, sets] = line.split(': ')

    const gameNumber = Number(game.split(' ')[1])
    const splitSets = sets.split('; ')

    const allMinColors = splitSets.reduce(
      (minColors, set) => {
        set
          .trim()
          .split(', ')
          .forEach((countAndColor) => {
            const [count, color] = countAndColor
              .trim()
              .split(' ')
              .map((str) => str.trim())

            const countAsNumber = Number(count)

            if (minColors[color] < countAsNumber) {
              minColors[color] = countAsNumber
            }
          })

        return minColors
      },
      {
        red: 0,
        green: 0,
        blue: 0,
      }
    )

    sum += allMinColors.red * allMinColors.blue * allMinColors.green
  })

  return sum
}

console.log(partOne())
console.log('==========================================')
console.log(partTwo())

function ints(str: string) {
  return str.matchAll(/-?\d+/)
}
