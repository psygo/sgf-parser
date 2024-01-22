import { generate } from "peggy"

/**
 * References:
 * 
 * - [Stack Overflow - SGF Grammar Parser with Peggy](https://stackoverflow.com/a/77856718/4756173)
 */
const grammar = /* peggy */ `
  Parens = 
    '(' content:String  rest:Parens* ')' { return {content, rest} }
    / String

  String = [^()]+ { return text() }
`

const sgf1 =
  "(;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.52.2]KM[6.5]SZ[19]DT[2023-12-25];B[pd];W[dd];B[pq];W[dp])"

const parser = generate(grammar)

const parse = parser.parse(sgf1)

console.log(parse)
