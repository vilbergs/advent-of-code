import { isNumeric } from '/utils/numbers.ts'
import readInput from '/read_input.ts'

const exampleInput = readInput(3, 'testinput.txt')
const mainInput = readInput(3)

function isNextToSymbol(
  numberIndex: number,
  lineIndex: number,
  lines: string[][]
) {
  // if on top-left

  if (
    lines[lineIndex - 1] &&
    lines[lineIndex - 1][numberIndex - 1] &&
    !isNumeric(lines[lineIndex - 1][numberIndex - 1]) &&
    lines[lineIndex - 1][numberIndex - 1] !== '.'
  ) {
    return true
  }

  // if on top
  if (
    lines[lineIndex - 1] &&
    lines[lineIndex - 1][numberIndex] &&
    !isNumeric(lines[lineIndex - 1][numberIndex]) &&
    lines[lineIndex - 1][numberIndex] !== '.'
  ) {
    return true
  }
  // if on top-right

  if (
    lines[lineIndex - 1] &&
    lines[lineIndex - 1][numberIndex + 1] &&
    !isNumeric(lines[lineIndex - 1][numberIndex + 1]) &&
    lines[lineIndex - 1][numberIndex + 1] !== '.'
  ) {
    return true
  }

  // if on right

  if (
    lines[lineIndex] &&
    lines[lineIndex][numberIndex + 1] &&
    !isNumeric(lines[lineIndex][numberIndex + 1]) &&
    lines[lineIndex][numberIndex + 1] !== '.'
  ) {
    return true
  }

  // if on bottom-right

  if (
    lines[lineIndex + 1] &&
    lines[lineIndex + 1][numberIndex + 1] &&
    !isNumeric(lines[lineIndex + 1][numberIndex + 1]) &&
    lines[lineIndex + 1][numberIndex + 1] !== '.'
  ) {
    return true
  }

  // if on bottom

  if (
    lines[lineIndex + 1] &&
    lines[lineIndex + 1][numberIndex] &&
    !isNumeric(lines[lineIndex + 1][numberIndex]) &&
    lines[lineIndex + 1][numberIndex] !== '.'
  ) {
    return true
  }

  // if on bottom-left

  if (
    lines[lineIndex + 1] &&
    lines[lineIndex + 1][numberIndex - 1] &&
    !isNumeric(lines[lineIndex + 1][numberIndex - 1]) &&
    lines[lineIndex + 1][numberIndex - 1] !== '.'
  ) {
    return true
  }

  // if on left

  if (
    lines[lineIndex] &&
    lines[lineIndex][numberIndex - 1] &&
    !isNumeric(lines[lineIndex][numberIndex - 1]) &&
    lines[lineIndex][numberIndex - 1] !== '.'
  ) {
    return true
  }

  return false
}

export function partOne(input = mainInput) {
  let sum = 0

  const lines: string[][] = input.split('\n').map((l) => l.split(''))

  lines.forEach((line, lineIndex) => {
    let numArray: number[] = []
    let indices: {
      [key: string]: number
    } = {
      num: 0,
      firstIndex: 0,
      lastIndex: 0,
      lineIndex: 0,
    }

    for (let index = 0; index < line.length; index++) {
      const char = line[index]

      if (isNumeric(char)) {
        numArray.push(Number(char))

        if (!isNumeric(line[index - 1])) {
          indices.firstIndex = index
        }

        if (isNumeric(line[index + 1])) {
          continue
        }
      }

      if (!isNumeric(line[index + 1])) {
        indices.lastIndex = index
        indices.num = Number(numArray.join(''))

        numArray = []

        if (
          isNextToSymbol(indices.firstIndex, lineIndex, lines) ||
          isNextToSymbol(indices.lastIndex, lineIndex, lines)
        ) {
          sum += indices.num

          indices = {
            num: 0,
            firstIndex: 0,
            lastIndex: 0,
            lineIndex: 0,
          }
        }
      }
    }
  })

  return sum
}

export function partTwo(input = mainInput) {
  let sum = 0

  const lines: string[][] = input.split('\n').map((l) => l.split(''))
  const gearRatios: Record<string, number[]> = {}

  lines.forEach((line, lineIndex) => {
    let numArray: number[] = []
    let indices: {
      [key: string]: number
    } = {
      num: 0,
      firstIndex: 0,
      lastIndex: 0,
      lineIndex: 0,
    }

    for (let index = 0; index < line.length; index++) {
      const char = line[index]

      if (!isNaN(Number(char))) {
        numArray.push(Number(char))

        if (isNaN(Number(line[index - 1]))) {
          indices.firstIndex = index
        }

        if (!isNaN(Number(line[index + 1]))) {
          continue
        }
      }

      if (isNaN(Number(line[index + 1]))) {
        indices.lastIndex = index

        if (numArray.length === 0) {
          continue
        }

        indices.num = Number(numArray.join(''))
        numArray = []

        const firstIndexGear = findAdjacentGearIndex(
          indices.firstIndex,
          lineIndex,
          lines
        )
        const lastIndexGear = findAdjacentGearIndex(
          indices.lastIndex,
          lineIndex,
          lines
        )

        const maybeKey = lastIndexGear || firstIndexGear || null

        if (!maybeKey) {
          continue
        }

        const key = JSON.stringify(maybeKey)

        if (!Array.isArray(gearRatios[key])) {
          gearRatios[key] = []
        }

        if (gearRatios[key].length === 1) {
          gearRatios[key] = [gearRatios[key][0], indices.num]
        } else if (gearRatios[key].length === 0) {
          gearRatios[key] = [indices.num]
        }

        if (gearRatios[key].length === 2) {
          sum += gearRatios[key][0] * gearRatios[key][1]
        }

        indices = {
          num: 0,
          firstIndex: 0,
          lastIndex: 0,
          lineIndex: 0,
        }
      }
    }
  })

  return sum
}

console.log(partOne())
console.log('==========================================')
console.log(partTwo())

function findAdjacentGearIndex(
  numberIndex: number,
  lineIndex: number,
  lines: string[][]
): [number, number] | null {
  if (
    lines[lineIndex - 1] &&
    lines[lineIndex - 1][numberIndex - 1] &&
    lines[lineIndex - 1][numberIndex - 1] === '*'
  ) {
    return [lineIndex - 1, numberIndex - 1]
  }

  // if on top
  if (
    lines[lineIndex - 1] &&
    lines[lineIndex - 1][numberIndex] &&
    lines[lineIndex - 1][numberIndex] === '*'
  ) {
    return [lineIndex - 1, numberIndex]
  }
  // if on top-right

  if (
    lines[lineIndex - 1] &&
    lines[lineIndex - 1][numberIndex + 1] &&
    lines[lineIndex - 1][numberIndex + 1] === '*'
  ) {
    return [lineIndex - 1, numberIndex + 1]
  }

  // if on right

  if (
    lines[lineIndex] &&
    lines[lineIndex][numberIndex + 1] &&
    lines[lineIndex][numberIndex + 1] === '*'
  ) {
    return [lineIndex, numberIndex + 1]
  }

  // if on bottom-right

  if (
    lines[lineIndex + 1] &&
    lines[lineIndex + 1][numberIndex + 1] &&
    lines[lineIndex + 1][numberIndex + 1] === '*'
  ) {
    return [lineIndex + 1, numberIndex + 1]
  }

  // if on bottom

  if (
    lines[lineIndex + 1] &&
    lines[lineIndex + 1][numberIndex] &&
    lines[lineIndex + 1][numberIndex] === '*'
  ) {
    return [lineIndex + 1, numberIndex]
  }

  // if on bottom-left

  if (
    lines[lineIndex + 1] &&
    lines[lineIndex + 1][numberIndex - 1] &&
    lines[lineIndex + 1][numberIndex - 1] === '*'
  ) {
    return [lineIndex + 1, numberIndex - 1]
  }

  // if on left

  if (
    lines[lineIndex] &&
    lines[lineIndex][numberIndex - 1] &&
    lines[lineIndex][numberIndex - 1] === '*'
  ) {
    return [lineIndex, numberIndex - 1]
  }

  return null
}
