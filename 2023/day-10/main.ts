import * as path from 'https://deno.land/std@0.188.0/path/mod.ts'

const __dirname = path.dirname(path.fromFileUrl(import.meta.url))
const input = Deno.readTextFileSync(__dirname + '/input.txt')

console.log(input.split('\n'))
