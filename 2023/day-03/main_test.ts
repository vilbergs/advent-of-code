import readInput from '/read_input.ts'
import { partOne, partTwo } from './main.ts'
import { assertEquals } from 'https://deno.land/std@0.204.0/assert/mod.ts'

const exampleInput = readInput(3, 'testinput.txt')
const mainInput = readInput(3)

Deno.test(function partOneWorks() {
  assertEquals(partOne(exampleInput), 4361)
  // assertEquals(partOne(mainInput), ?)
})
