import { ints } from '/utils/regex.ts'
import { assertEquals } from 'https://deno.land/std@0.204.0/assert/assert_equals.ts'

Deno.test(function testInts() {
  assertEquals(
    ints('1, 2, 3, -1, -12, 4, 0 and 123'),
    [1, 2, 3, -1, -12, 4, 0, 123]
  )
})
