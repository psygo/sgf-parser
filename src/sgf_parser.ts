import { SgfTree } from "./sgf_tree"

// An SGF tree is basically a *trie* data structure encoded
// in text.
//
// I bet you could also do the whole parsing with only
// Regexes. (I think I'm gonna create a Stack Overflow
// question for this.)
export function parseSgf(sgf: string) {
  // 1. Cleanup
  sgf = sgf
    .trim()
    .replaceAll("\n", "")
    .replaceAll("\t", "")
    .replaceAll(" ", "")

  // 2. Initialization
  const trees = new SgfTree()
  let currentTree: SgfTree = trees
  let currentString: string = ""

  // 3. Flattened Recursion
  for (const char of sgf) {
    switch (char) {
      case "(":
        // 3.1. Opening a Branch
        currentTree.data = currentString
        const newTree = new SgfTree(currentTree)
        currentTree.children.push(newTree)
        currentTree = newTree
        currentString = ""
        break
      case ")":
        // 3.2. Closing the Current Branch and Going Back to the
        //      Parent.
        // parseMovesAndMetadata(currentString)
        currentTree.data = currentString
        currentTree = currentTree.parent!
        currentString = currentTree.data
        break
      default:
        currentString += char
    }
  }

  return trees.children
}

// TODO: Complete, add all the fields.
export type SgfData = {
  // 1. Metadata
  GM?: "1" // Game Type (GM = "1" is Go)
  FF?: string // File Format
  CA?: string // Character Set
  AP?: string // Application used to produce the file
  // 2. Game Info
  KM?: string // Komi
  SZ?: string // Board Size
  DT?: string // Date
  HA?: string // Number of Handicap Stones
  RU?: string // Rules Set in Use
  GN?: string // Game Name
  EV?: string // Event
  // 3. Players
  PB?: string // Black Player
  BR?: string // Black's Rating
  PW?: string // White Player
  WR?: string // White's Rating
  // 4. Comments
  C?: string // (Move) Comments
  GC?: string // Game Comment
  // 5. Editing the Goban
  PL?: string // Who plays next
  AB?: string // Add Black stones
  AW?: string // Add White stones
  // 6. Moves
  B?: string // What Black plays
  W?: string // What White Plays
}

// TODO: Complete
function parseMovesAndMetadata(sgfData: string) {
  const metadataAndMoves = sgfData
    .split(";")
    .filter((m) => m !== "")

  const regex =
    /(?<key>[A-Z](?:\s*[A-Z])*)\[(?<value>(?:\\\]|[^\]])*)/g
  const matches = [...metadataAndMoves[0].matchAll(regex)]

  console.log(matches[0].groups!["value"])
}

// TODO: Put these into tests.

// Straight Branch
const test1 = `
  (
    ;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.52.2]KM[6.5]SZ[19]DT[2023-12-25]
    ;B[pd]
    ;W[dd]
    ;B[pq]
    ;W[dp]
  )
`
// Two Branches
const test2 = `
  (
    ;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.52.2]KM[6.5]SZ[19]DT[2023-12-25]
    ;B[pd]
    ;W[dd]
      (
        ;B[pq]
        ;W[dp]
      )
      (
        ;B[dp]
        ;W[pp]
      )
  )
`
// Two Branches + Added (Edited) Stones
const test3 = `
  (
    ;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.52.2]KM[6.5]SZ[19]DT[2023-12-25]
    ;B[pd]
    ;W[dd]
      (
        ;B[pq]
        ;W[dp]
      )
      (
        ;B[dp]
        ;W[pp]
        ;PL[B]AE[jk]AB[jj]AW[ji]
        ;B[jq]
      )
  )
`
// Two Branches + Added (Edited) Stones + Comments
const test4 = `
  (
    ;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.52.2]KM[6.5]SZ[19]DT[2023-12-25]
    ;B[pd]C[Comment on move.]
    ;W[dd]
      (
        ;B[pq]
        ;W[dp]
      )
      (
        ;B[dp]
        ;W[pp]
        ;PL[B]AE[jk]AB[jj]AW[ji]C[Comment on editing.]
        ;B[jq]
      )
  )
`

const sgfTree = parseSgf(test4)
const sgfTreeAsJSON = sgfTree.map((c) => c.toJson())
const prettyPrintSgf = JSON.stringify(sgfTreeAsJSON, null, 2)

console.log(prettyPrintSgf);
