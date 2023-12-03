import { checkAdjacencyWithDiagonal, checkAdjacency } from '/utils/adjacency.ts'
import { assertEquals } from 'https://deno.land/std@0.204.0/assert/mod.ts'

Deno.test(function testCheckAdjacencyWithDiagonal() {
  const data = [
    ['4', '6', '7', '.', '.', '1', '1', '4', '.', '.'],
    ['.', '.', '.', '*', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '3', '5', '.', '.', '6', '3', '3', '.'],
    ['.', '.', '.', '.', '.', '.', '#', '.', '.', '.'],
    ['6', '1', '7', '*', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '+', '.', '5', '8', '.'],
    ['.', '.', '5', '9', '2', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '7', '5', '5', '.'],
    ['.', '.', '.', '$', '.', '*', '.', '.', '.', '.'],
    ['6', '6', '4', '.', '5', '9', '8', '.', '.', '.'],
  ]

  const assertion = (element: string) => element === '*'

  assertEquals(checkAdjacencyWithDiagonal<string>(data, 0, 0, assertion), null)
  assertEquals(
    checkAdjacencyWithDiagonal<string>(data, 0, 2, assertion),
    [1, 3]
  )
  assertEquals(checkAdjacencyWithDiagonal<string>(data, 0, 5, assertion), null)
  assertEquals(checkAdjacencyWithDiagonal<string>(data, 0, 7, assertion), null)
  assertEquals(
    checkAdjacencyWithDiagonal<string>(data, 2, 3, assertion),
    [1, 3]
  )
  assertEquals(checkAdjacencyWithDiagonal<string>(data, 2, 6, assertion), null)
  assertEquals(checkAdjacencyWithDiagonal<string>(data, 2, 8, assertion), null)
  assertEquals(checkAdjacencyWithDiagonal<string>(data, 4, 0, assertion), null)
  assertEquals(
    checkAdjacencyWithDiagonal<string>(data, 4, 2, assertion),
    [4, 3]
  )
  assertEquals(checkAdjacencyWithDiagonal<string>(data, 5, 7, assertion), null)
  assertEquals(checkAdjacencyWithDiagonal<string>(data, 5, 8, assertion), null)
  assertEquals(checkAdjacencyWithDiagonal<string>(data, 9, 0, assertion), null)
  assertEquals(checkAdjacencyWithDiagonal<string>(data, 9, 2, assertion), null)
  assertEquals(
    checkAdjacencyWithDiagonal<string>(data, 9, 4, assertion),
    [8, 5]
  )
  assertEquals(
    checkAdjacencyWithDiagonal<string>(data, 9, 6, assertion),
    [8, 5]
  )

  // assertEquals(partOne(mainInput), ?)
})

Deno.test(function testCheckAdjacency() {
  const data = [
    ['4', '6', '7', '.', '.', '1', '1', '4', '.', '.'],
    ['.', '.', '.', '*', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '3', '5', '.', '.', '6', '3', '3', '.'],
    ['.', '.', '.', '.', '.', '.', '#', '.', '.', '.'],
    ['6', '1', '7', '*', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '+', '.', '5', '8', '.'],
    ['.', '.', '5', '9', '2', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '7', '5', '5', '.'],
    ['.', '.', '.', '$', '.', '*', '.', '.', '.', '.'],
    ['6', '6', '4', '.', '5', '9', '8', '.', '.', '.'],
  ]

  const assertion = (element: string) => element === '*'

  assertEquals(checkAdjacency<string>(data, 0, 0, assertion), null)
  assertEquals(checkAdjacency<string>(data, 0, 2, assertion), null)
  assertEquals(checkAdjacency<string>(data, 0, 5, assertion), null)
  assertEquals(checkAdjacency<string>(data, 0, 7, assertion), null)
  assertEquals(checkAdjacency<string>(data, 2, 3, assertion), [1, 3])
  assertEquals(checkAdjacency<string>(data, 2, 6, assertion), null)
  assertEquals(checkAdjacency<string>(data, 2, 8, assertion), null)
  assertEquals(checkAdjacency<string>(data, 4, 0, assertion), null)
  assertEquals(checkAdjacency<string>(data, 4, 2, assertion), [4, 3])
  assertEquals(checkAdjacency<string>(data, 5, 7, assertion), null)
  assertEquals(checkAdjacency<string>(data, 5, 8, assertion), null)
  assertEquals(checkAdjacency<string>(data, 9, 0, assertion), null)
  assertEquals(checkAdjacency<string>(data, 9, 2, assertion), null)
  assertEquals(checkAdjacency<string>(data, 9, 4, assertion), null)
  assertEquals(checkAdjacency<string>(data, 9, 6, assertion), null)

  assertEquals(
    checkAdjacency<string>(data, 2, 6, (el) => el === '#'),
    [3, 6]
  )
  // assertEquals(partOne(mainInput), ?)
})
