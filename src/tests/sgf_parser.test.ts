import { readFileSync } from "fs"

import { expect, test } from "vitest"

import { parseSgf } from "../sgf_parser"

test("1. Straight SGF with 1 branch and 4 nodes", () => {
  const sgfString = readFileSync(
    "./sgf/1_one_branch.sgf",
    "utf-8"
  )

  const sgfTrees = parseSgf(sgfString)

  expect(sgfTrees.toSgf()).to.equal(sgfString)
})

test("2. 2 Branches", () => {
  const sgfString = readFileSync(
    "./sgf/2_two_branches.sgf",
    "utf-8"
  )

  const sgfTrees = parseSgf(sgfString)

  console.log(sgfTrees.toJson())

  expect(sgfTrees.toSgf()).to.equal(sgfString)
})

test("3. 2 Branches + Added (Edited) Stones", () => {
  const sgf = `
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

  const sgfTrees = parseSgf(sgf)
})

test("4. 2 Branches + Added (Edited) Stones + Comments", () => {
  const sgf = `
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

  const sgfTrees = parseSgf(sgf)
})

test("5. Nested Branches in 2 levels", () => {
  const sgf = `
    (
      ;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.52.2]KM[6.5]SZ[19]DT[2024-01-21]
      ;B[dd]
      ;W[pd]
        (
          ;B[dp]
        )
        (
          ;B[dq]
            (
              ;W[pp]
            )
            (
              ;W[co];B[pp]
            )
        )
    )
  `

  const sgfTrees = parseSgf(sgf)
})

test("6. Test 5 + Another Branch after the 2nd move", () => {
  const sgf = `
    (
      ;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.52.2]KM[6.5]SZ[19]DT[2024-01-21]
      ;B[dd]
      ;W[pd]
        (
          ;B[dp]
        )
        (
          ;B[dq]
            (
              ;W[pp]
            )
            (
              ;W[co]
              ;B[pp]
            )
        )
        (
          ;B[jj]
        )
    )
  `

  const sgfTrees = parseSgf(sgf)
})
