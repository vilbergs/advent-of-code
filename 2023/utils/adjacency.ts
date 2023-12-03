export function checkAdjacency<T>(
  arr: T[][],
  row: number,
  col: number,
  assertion: (element: T) => boolean
) {
  // top
  if (arr[row - 1] && arr[row - 1][col] && assertion(arr[row - 1][col])) {
    return [row - 1, col]
  }

  // right
  if (arr[row] && arr[row][col + 1] && assertion(arr[row][col + 1])) {
    return [row, col + 1]
  }

  // bottom
  if (arr[row + 1] && arr[row + 1][col] && assertion(arr[row + 1][col])) {
    return [row + 1, col]
  }

  // left
  if (arr[row] && arr[row][col - 1] && assertion(arr[row][col - 1])) {
    return [row, col - 1]
  }

  return null
}

export function checkAdjacencyWithDiagonal<T>(
  arr: T[][],
  row: number,
  col: number,
  assertion: (element: T) => boolean
) {
  // top-left
  if (
    arr[row - 1] &&
    arr[row - 1][col - 1] &&
    assertion(arr[row - 1][col - 1])
  ) {
    return [row - 1, col - 1]
  }

  // top
  if (arr[row - 1] && arr[row - 1][col] && assertion(arr[row - 1][col])) {
    return [row - 1, col]
  }

  // top-right
  if (
    arr[row - 1] &&
    arr[row - 1][col + 1] &&
    assertion(arr[row - 1][col + 1])
  ) {
    return [row - 1, col + 1]
  }

  // right
  if (arr[row] && arr[row][col + 1] && assertion(arr[row][col + 1])) {
    return [row, col + 1]
  }

  // bottom-right
  if (
    arr[row + 1] &&
    arr[row + 1][col + 1] &&
    assertion(arr[row + 1][col + 1])
  ) {
    return [row + 1, col + 1]
  }

  // bottom
  if (arr[row + 1] && arr[row + 1][col] && assertion(arr[row + 1][col])) {
    return [row + 1, col]
  }

  // bottom-left
  if (
    arr[row + 1] &&
    arr[row + 1][col - 1] &&
    assertion(arr[row + 1][col - 1])
  ) {
    return [row + 1, col - 1]
  }

  // left
  if (arr[row] && arr[row][col - 1] && assertion(arr[row][col - 1])) {
    return [row, col - 1]
  }

  return null
}
