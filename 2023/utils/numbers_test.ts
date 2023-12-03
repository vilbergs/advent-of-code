import { isNumeric } from '/utils/numbers.ts'
import { assertEquals } from 'https://deno.land/std@0.204.0/assert/assert_equals.ts'

const nonNumericAsciiCharacters = [
  ' ',
  '!',
  '"',
  '#',
  '$',
  '%',
  '&',
  "'",
  '(',
  ')',
  '*',
  '+',
  ',',
  '-',
  '.',
  '/',
  ':',
  ';',
  '<',
  '=',
  '>',
  '?',
  '@',
  '[',
  '\\',
  ']',
  '^',
  '_',
  '`',
  '{',
  '|',
  '}',
  '~',
  ...Array.from({ length: 16 }, (_, i) => String.fromCharCode(32 + i)).filter(
    (char) => !/\d/.test(char)
  ),
  ...Array.from({ length: 68 }, (_, i) => String.fromCharCode(58 + i)).filter(
    (char) => !/\d/.test(char)
  ),
]

const numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

Deno.test(function testIsNumeric() {
  nonNumericAsciiCharacters.forEach((c) => {
    assertEquals(isNumeric(c), false)
  })

  numericCharacters.forEach((c) => {
    assertEquals(isNumeric(c), true)
  })
})
